var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-JsonGraph helper started...');
	},

	getJson: function (url) {
		var self = this;

		self.sendSocketNotification("MMM-JsonGraph_JSON_RESULT", {url: url, data: testJson});

		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(body);
				// Send the json data back with the url to distinguish it on the receiving part
				self.sendSocketNotification("MMM-JsonGraph_JSON_RESULT", {url: url, data: json});
			}
		});
	},

	socketNotificationReceived: function (notification, url) {
		if (notification === "MMM-JsonGraph_GET_JSON") {
			this.getJson(url);
		}
	}
});