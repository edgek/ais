var request = require('request');

module.exports = function (config, app) {
    app.put('/:name', function (req, res) {
        request(
            {
                method: 'PUT',
                url: config.db_server + '/' + req.params.name
            },
            function (err, couchRes, body) {
                res.status(couchRes.statusCode).send(body);
            }
        );    
    });

    app.get('/:name', function (req, res) {
        request(
            {
                method: 'GET',
                url: config.db_server + '/' + req.params.name
            },
            function (err, couchRes, body) {
                res.status(couchRes.statusCode).send(body);
            }
        );    
    });

    app.delete('/:name', function (req, res) {
        request(
            {
                method: 'DELETE',
                url: config.db_server + '/' + req.params.name
            },
            function (err, couchRes, body) {
                res.status(couchRes.statusCode).send(body);
            }
        );    
    });

};