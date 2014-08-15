var express = require('express');
var router = express.Router();

var getUptime = require('../libs/parser').getUptime;

router.get('/production', function(req, res) {
  res.setHeader('Content-Type', 'application-json');
	res.end(JSON.stringify(getUptime('shipio-production'), null, 2));
});

router.get('/staging', function(req, res) {
  res.setHeader('Content-Type', 'application-json');
  res.end(JSON.stringify(getUptime('shipio-staging'), null, 2));
});

module.exports = router;