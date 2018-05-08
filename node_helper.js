var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-JsonGraph helper started...');
	},

	getJson: function (url) {
		var self = this;
		console.log("MMM-JsonGraph getJson url:" + url);

		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(body);
				// Send the json data back with the url to distinguish it on the receiving part
				self.sendSocketNotification("MMM-JsonGraph_JSON_RESULT", {url: url, data: json});
				console.log("MMM-JsonGraph request was succesfull");
			}
			else {
				console.log("MMM-JsonGraph request had error", error, response);
			}
		});
	},

	socketNotificationReceived: function (notification, url) {
		if (notification === "MMM-JsonGraph_GET_JSON") {
			console.log("MMM-JsonGraph_GET_JSON received for url:" + url);
			this.getJson(url);
		}
	}
});