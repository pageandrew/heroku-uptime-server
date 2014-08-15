var execSync = require('exec-sync');

function parseLine(line) {
	var firstPar = line.indexOf('(') + 3;
	var lastPar = line.indexOf(' ago)');

	var ss = line.substring(firstPar, lastPar);

	var time = ss.substring(0, ss.length - 1);
	var unit = ss[ss.length - 1];

	var jsonObj = {
		time: time,
		unit: unit
	};

	return jsonObj;
};

function parseUptime(psResult) {
	lines = psResult.split('\n');

	var startIndex = -1;
	var reading = false;
	var stats = {};

	for(var i = 0; i < lines.length; i++) {
		var element = lines[i];

		if(reading && element.length > 0) {
			var type = element.substring(0, element.indexOf('.'));

			if(!stats[type]) {
				stats[type] = [];
			}

			stats[type].push(parseLine(element));
		}

		if(element.lastIndexOf('=== ', 0) === 0) {
			reading = true;
		} else if(!element || element.length === 0) {
			reading = false;
		}
	}

	return stats;
};

function getUptime(appName) {
	return parseUptime(execSync('heroku ps --app ' + appName));
};

exports.getUptime = getUptime;