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