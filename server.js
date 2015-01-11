var express = require('express'),
	app = express(),	
    bodyParser = require('body-parser'),
    request = require('request'),
    util = require('./util.js'),
    res_db = require('./res_db.js'),
    res_doc = require('./res_doc.js'),
    res_design = require('./res_design.js'),
    config = require('./config.json'),
    des1 = require('./des1.js');

// Set middleware
app.use(express.static(__dirname)); // This needs to come first I guess.
app.use(bodyParser.json({type: "application/json"}));

// Set routes
res_db(config, app);
res_doc(config, app);
res_design(config, app);

app.listen(config.port, function () {
	console.log("Listening");
});

// Update design doc
util.setRev('http://localhost:5984/test3/_design/des1', des1, util.putDoc);



