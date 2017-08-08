var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.enable('trust proxy');

app.get('/', function(req, res, next) {
	var regex = new RegExp(/\(([^)]+)\)/);
	return res.status(200).send({
		ipaddress: req.ip,
    language: req.headers['accept-language'] ? req.headers['accept-language'].split(',')[0] : 'Cannot read languages',
		software: regex.exec(req.headers['user-agent']) ? (regex.exec(req.headers['user-agent']))[1] : req.headers['user-agent']
	});
});

var port = 3000;
app.listen(port, function() {
	console.log('Listening on port ' + port);
});
