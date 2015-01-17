var request = require('request');

module.exports = function (url, json) {
    request.get(url, function (err, dbRes, body) {
        var bodyParse;
        
        if (dbRes.statusCode == 200) {
            bodyParse = JSON.parse(body);
            json._rev = bodyParse._rev;
            json._id = bodyParse._id;
        }
        request(
            {
                method: 'PUT',
                url: url,
                json: json    
            },
            function (err, dbRes, body) {
                console.log(body);
            }
        );    
    });
}
