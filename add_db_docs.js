var request = require('request'),
    doc_array = [];

doc_array.push(require('./des1.js'));

module.exports = function (url, res) {
    for (var i = 0; i < doc_array.length; i++) {
        request(
            {
                method: 'POST',
                url: url,
                json: doc_array[i]
            },
            function (err, dbRes, body) {
                //console.log(body);
                res.status(dbRes.statusCode).send(body);
            } 
        )    
    }
    
}
