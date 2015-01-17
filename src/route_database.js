var request = require('request'),
    design_doc = require('./design_core.js'),
    response = require('./standardResponse.js');

module.exports = function (dbServer, app) {
    app.put('/:name', function (req, res) {
        var url = dbServer + '/' + req.params.name;

        request.put(url)
            .on('response', function (dbRes) {
                if (dbRes.statusCode == 201) {
                    
                    // Post default design document to database
                    request({method: 'POST', url: url, json: design_doc})
                        .on('response', function (dbRes) {
                            res.status(dbRes.statusCode).send(dbRes);            
                        });
                }
                else {
                    res.status(dbRes.statusCode).send(dbRes);
                }
            
            }); // end on DB response    
    });

    app.get('/:name', function (req, res) {
        var callback = response(res);
        request(
            {
                method: 'GET',
                url: dbServer + '/' + req.params.name
            },
            callback
        );    
    });

    app.delete('/:name', function (req, res) {
        var callback = response(res);
        request(
            {
                method: 'DELETE',
                url: dbServer + '/' + req.params.name
            },
            callback
        );    
    });

};