var request = require('request');

module.exports.setRev = function (url, json, f) {
    request.get(url, function (err, dbRes, body) {
        if (dbRes.statusCode == 200) {
            json._rev = JSON.parse(body)._rev;
        }
        if (f) {
            f(url, json);
        }
    });
}

module.exports.putDoc = function (url, json) {
    request({
        method: 'PUT',
        url: url,
        json: json    
    },
    function (err, dbRes, body) {
        console.log(body);
    });
}

module.exports.response = function (res) {
    return function (err, dbRes, body) {
        if (err) {
            res.status(502).send(
                '{"error":"bad_gateway","reason":' + '"' + 
                    err.code + '"} \n'
            );
            return;
        }
        res.status(dbRes.statusCode).send(body);
    }
}