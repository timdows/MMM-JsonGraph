var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-JsonGraph helper started...');
	},

	getJson: function (url) {
		var self = this;

		var testJson = {
			"fitbitWeekOverviewItems": [
				{
					"date": "2018-05-06T00:00:00",
					"steps": 12693,
					"kiloMeters": 9.75
				},
				{
					"date": "2018-05-05T00:00:00",
					"steps": 5636,
					"kiloMeters": 4.33
				},
				{
					"date": "2018-05-04T00:00:00",
					"steps": 8989,
					"kiloMeters": 6.9
				},
				{
					"date": "2018-05-03T00:00:00",
					"steps": 10541,
					"kiloMeters": 8.1
				},
				{
					"date": "2018-05-02T00:00:00",
					"steps": 6584,
					"kiloMeters": 5.06
				},
				{
					"date": "2018-05-01T00:00:00",
					"steps": 6595,
					"kiloMeters": 5.06
				},
				{
					"date": "2018-04-30T00:00:00",
					"steps": 6918,
					"kiloMeters": 5.31
				}
			]
		};

		self.sendSocketNotification("MMM-JsonGraph_JSON_RESULT", {url: url, data: testJson});

		// request({ url: url, method: 'GET' }, function (error, response, body) {
		// 	if (!error && response.statusCode == 200) {
		// 		var json = JSON.parse(body);
		// 		// Send the json data back with the url to distinguish it on the receiving part
		// 		self.sendSocketNotification("MMM-JsonGraph_JSON_RESULT", {url: url, data: json});
		// 	}
		// });
	},

	socketNotificationReceived: function (notification, url) {
		if (notification === "MMM-JsonGraph_GET_JSON") {
			this.getJson(url);
		}
	}
});