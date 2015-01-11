var express = require('express'),
	app = express(),	
    bodyParser = require('body-parser'),
    res_db = require('./res_db.js'),
    res_doc = require('./res_doc.js'),
    res_design = require('./res_design.js'),
    config = require('./config.json');

// Set middleware
app.use(express.static(__dirname)); // This needs to come first I guess.
app.use(bodyParser.json({type: "application/json"}));

// Set routes
res_db(config.db_server, app);
res_doc(config.db_server, app);
res_design(config.db_server, app);

app.listen(config.port, function () {
	console.log("Listening");
});



