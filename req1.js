var request = require('request');

module.exports = function (config, app) {
    app.get('/api/:name', function (req, res) {
        request(
            {
                method: 'GET',
                url: config.db + '/' + req.params.name 
            },
            function (err, couchRes, body) {
                if (err) {
                    res.json(502, 
                        {
                            error: "bad_gateway", 
                            reason: err.code
                        }
                    );
                    return;
                }
                if (couchRes.statusCode != 200) {
                    //res.json(couchRes.statusCode, JSON.parse(body));
                    res.json(200, {"hello": "bob"});
                    return
                }
                res.json(body);
            }
        );  
    });
};

