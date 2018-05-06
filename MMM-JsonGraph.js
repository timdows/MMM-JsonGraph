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


	getStyles: function () {
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
			if (payload.url === this.config.url) {
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

	createGraph: function (json) {
		var items = [];
		if (this.config.arrayName) {
			items = this.jsonData[this.config.arrayName];
		}
		else {
			items = this.jsonData;
		}

		// Check if items is of type array
		if (!(items instanceof Array)) {
			return "Json data is not of type array! " +
				"Maybe the config arrayName is not used and should be, or is configured wrong";
		}

		var rects = "";
		var xAxisName = this.config.xAxisName;
		var maxValue = Math.max.apply(Math, items.map(function (o) { return o[xAxisName]; }))
		var indexHeight = 0;

		items.forEach(element => {
			var xAxisValue = element[this.config.xAxisName];
			var width = (xAxisValue / maxValue) * 100;
			var height = 20 * indexHeight;
			rects += `<g class="mmmJsonGraph-bar">
				<rect width="` + width + `%" height="19" y="` + height + `"></rect>
				<text x="` + width + `%" y="` + (height + 8) + `" dy=".35em">` + xAxisValue + ` steps</text>
			</g>`;
			indexHeight++;
		});

		return `
		<figure>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="chart" width="300" height="150" role="img">
				` + rects + `
	  		</svg>
	  	</figure>`;
	}
});