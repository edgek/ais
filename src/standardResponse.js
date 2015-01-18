/*
 * A callback function to handle typical response from CouchDB.
 */

module.exports = function (res) {
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