var express = require('express'),
	app = express(),	
    bodyParser = require('body-parser'),
    res_db = require('./src/route_database.js'),
    res_doc = require('./src/route_document.js'),
    res_design = require('./src/route_design.js'),
    config = require('./config.json');
/*
app.use(function (req, res, next) {
    console.log('Request Time:', Date.now());
    next();
});
*/

app.use(express.static(__dirname));
app.use(bodyParser.json({type: "application/json"}));

// Set routes
res_db(config.db_server, app);
res_doc(config.db_server, app);
res_design(config.db_server, app);

app.listen(config.port, function () {
	console.log("Listening");
});



