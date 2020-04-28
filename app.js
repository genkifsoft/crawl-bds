const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const app = express()
require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');

var ZaloSocial = require('zalo-sdk').ZaloSocial;

var zsConfig = {
    appId: process.env.ZALO_APP_ID,
    redirectUri: process.env.REDIRECT_URL,
    secretkey: process.env.ZALO_SECRET_KEY
};

var ZSClient = new ZaloSocial(zsConfig);
var options = {
	key: fs.readFileSync('server/client-key.pem'),
	cert: fs.readFileSync('server/client-cert.pem')
};

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	port     : process.env.PORT_HTTPS,
	database : 'crawbds'
});

global.axios = axios;
global.client = client;
global.db = connection;
global.ZSClient = ZSClient;

db.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
});

// include router
const router = require('./routers/real-estate-router');
app.use('/', router);


// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(process.env.PORT_HTTPS, () => {
	console.log(`Server running on port http://localhost:${process.env.PORT_HTTPS}`);
});