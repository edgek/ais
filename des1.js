module.exports = {
    views: {
        sum: {
            map: function (doc) {
                if (doc.type && doc.amount) {
                    emit(doc.type, doc.amount);
                }
            }.toString(),
            reduce: function (keys, values, rereduce) {
                return sum(values);
            }.toString()
        },
        list: {
            map: function (doc) {
                if (doc.type && doc.amount) {
                    emit(doc._id, [doc.amount, doc.from.name]);
                } 
            }.toString()
        },
        groupit: {
            map: function (doc) {
                if (doc.cat && doc.amount) {
                    emit([doc.cat, doc.subcat], doc.amount);
                }
            }.toString(),
            reduce: function (keys, values, rereduce) {
                return sum(values);
            }.toString()
        }
    }
}
