const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const app = express()
require('dotenv').config()

var options = {
	key: fs.readFileSync('server/client-key.pem'),
	cert: fs.readFileSync('server/client-cert.pem')
};

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'crawbds'
});

db.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
});

global.client = client;
global.db = connection;

app.get('/', function (req, res) {
	res.send('hello world')
})

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(process.env.PORT_HTTPS, () => {
	console.log(`Server running on port http://localhost:${process.env.PORT_HTTPS}`);
});