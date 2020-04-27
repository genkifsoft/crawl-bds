require('dotenv').config()
const express = require('express');
var mysql      = require('mysql');
const app = express();

const port = 3000;
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'crawbds'
});

global.db = connection;
db.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
});

// configure middleware
app.set('port', process.env.port || port); // set express to use this port

// include router
const realEstateRouter = require('./routers/real-estate-router');
app.use('/', realEstateRouter);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});