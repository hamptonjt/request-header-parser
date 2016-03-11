'use strict';

var express = require('express');
var app = express();

app.get('/api/whoami', function(req, res) {
	var whoami = { }
	
	whoami.ipaddress = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress ||  req.socket.remoteAddress || req.connection.socket.remoteAddress;

	var languages = req.get('Accept-Language')
	
	whoami.languages = languages.split(',')[0]
	
	var os = /\(([^)]+)\)/.exec(req.get('User-Agent'))
	
	whoami.software = os[1]
	
	console.log(JSON.stringify(whoami))
	
	res.writeHeader(200, {'Accept': 'application/json'})
	res.end(JSON.stringify(whoami))
})

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});