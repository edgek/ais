var request = require('request'),
    response = require('./util.js').response;

module.exports = function (dbServer, app) {
    app.get('/:db/:doc', function (req, res) {
        var callback = response(res);
        request(
            {
                method: 'GET',
                url: dbServer + '/' + req.params.db + '/' +
                    req.params.doc   
            },
            callback
        );
    });

    app.post('/:db', function (req, res) {
        var callback = response(res);
        console.log(req.body);
        request(
            {
                method: 'POST',
                url: dbServer + '/' + req.params.db,
                json: req.body
            },
            callback
        );
    });

}