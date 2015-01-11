var request = require('request');

module.exports = function (config, app) {
    app.get('/:db/_design/:design/_view/:view', function (req, res) {
        request(
            {
                method: 'GET',
                url: config.db_server + '/' + req.params.db + '/_design/' +
                    req.params.design + '/_view/' + req.params.view,
                qs: {
                    limit: req.query.limit,
                    group_level: req.query.group_level
                }  
            },
            function (err, dbRes, body) {
                res.status(dbRes.statusCode).send(body);
            }
        );
    });

    app.put('/:db/_design/:design', function (req, res) {
        console.log(req.body);
        request(
            {
                method: 'PUT',
                url: config.db_server + '/' + req.params.db + '/_design/' +
                    req.params.design,
                json: req.body    
            },
            function (err, dbRes, body) {
                res.status(dbRes.statusCode).send(body);
            }
        );
    });

}