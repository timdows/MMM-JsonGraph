'use strict';

Module.register("MMM-JsonGraph", {

	jsonData: null,

	// Default module config.
	defaults: {
		url: "",
		arrayName: null,
		xAxisName: "",
		yAxisName: "",
		updateInterval: 15000
	},

	start: function () {
		this.getJson();
		this.scheduleUpdate();
	},


	getStyles: function(){
		return ["MMM-JsonGraph.css"];
	},

	scheduleUpdate: function () {
		var self = this;
		setInterval(function () {
			self.getJson();
		}, this.config.updateInterval);
	},

	// Request node_helper to get json from url
	getJson: function () {
		this.sendSocketNotification("MMM-JsonGraph_GET_JSON", this.config.url);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "MMM-JsonGraph_JSON_RESULT") {
			// Only continue if the notification came from the request we made
			// This way we can load the module more than once
			if (payload.url === this.config.url)
			{
				this.jsonData = payload.data;
				this.updateDom(500);
			}
		}
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");
		wrapper.className = "xsmall";

		if (!this.jsonData) {
			wrapper.innerHTML = "Awaiting json data...";
			return wrapper;
		}
		
		wrapper.innerHTML = this.createGraph(this.jsonData);		
		return wrapper;
	},

	createGraph: function(json) {
		var a = `<figure>
		<figcaption>A graph that shows the number of fruit collected</figcaption>
	  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="chart" width="420" height="150" aria-labelledby="title" role="img">
		<title id="title">A bart chart showing information</title>
		<g class="bar">
		  <rect width="40" height="19"></rect>
		  <text x="45" y="9.5" dy=".35em">4 apples</text>
		</g>
		<g class="bar">
		  <rect width="80" height="19" y="20"></rect>
		  <text x="85" y="28" dy=".35em">8 bananas</text>
		</g>
		<g class="bar">
		  <rect width="150" height="19" y="40"></rect>
		  <text x="150" y="48" dy=".35em">15 kiwis</text>
		</g>
		<g class="bar">
		  <rect width="160" height="19" y="60"></rect>
		  <text x="161" y="68" dy=".35em">16 oranges</text>
		</g>
		<g class="bar">
		  <rect width="230" height="19" y="80"></rect>
		  <text x="235" y="88" dy=".35em">23 lemons</text>
		</g>
	  </svg>
	  </figure>`;
	  return a;
	}
});