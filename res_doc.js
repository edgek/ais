var request = require('request');

module.exports = function (config, app) {
    app.get('/:db/:doc', function (req, res) {
        request(
            {
                method: 'GET',
                url: config.db_server + '/' + req.params.db + '/' +
                    req.params.doc   
            },
            function (err, dbRes, body) {
                res.status(dbRes.statusCode).send(body);
            }
        );
    });

    app.post('/:db', function (req, res) {
        //console.log(req.body);
        request(
            {
                method: 'POST',
                url: config.db_server + '/' + req.params.db,
                json: req.body
            },
            function (err, dbRes, body) {
                res.status(dbRes.statusCode).send(body);
            }
        );
    });

}