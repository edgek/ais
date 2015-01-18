/*
 * Defines routes for HTTP requests of database design views.
 */

var request = require('request'),
    response = require('./standardResponse.js');

module.exports = function (dbServer, app) {
    app.get('/:db/_design/:design/_view/:view', function (req, res) {
        var callback = response(res);
        request(
            {
                method: 'GET',
                url: dbServer + '/' + req.params.db + '/_design/' +
                    req.params.design + '/_view/' + req.params.view,
                qs: {
                    limit: req.query.limit,
                    group_level: req.query.group_level
                }  
            },
            callback
        );
    });

    app.get('/:db/_design/:design', function (req, res) {
        var callback = response(res);
        request(
            {
                method: 'GET',
                url: dbServer + '/' + req.params.db + '/_design/' +
                    req.params.design  
            },
            callback
        );
    });

    app.put('/:db/_design/:design', function (req, res) {
        var callback = response(res);
        request(
            {
                method: 'PUT',
                url: dbServer + '/' + req.params.db + '/_design/' +
                    req.params.design,
                json: req.body    
            },
            callback
        );
    });

}