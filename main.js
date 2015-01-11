$(document).ready(function () {
    console.log("Ready");

    $("#submit").on('click', function () {
        var json = getFormJSON(),
            method = $("#http-method").val(),
            db = $("#db-name").val();
        
        console.log(json);
        
        post({url: db, data: json},
            log,
            get.bind(null, {url: db + '/_design/des1/_view/sum'}, log, getSum),
            get.bind(null, {url: db + '/_design/des1/_view/list?limit=5'}, log),
            get.bind(null, {url: db + '/_design/des1/_view/groupit?group_level=2'}, log)
        );
    });

    function log(data) {
        console.log(data);
    }

    function getSum(data) {
        var obj = jQuery.parseJSON(data);
        $("body").append("<p>The sum is " + obj.rows[0].value + "</p>");
    }

    function get(obj) {
        var args = arguments;

        $.ajax({
            url: obj.url,
            type: 'GET',
            success: function (data) {
                for (var i = 0; i < args.length; i++) {
                    if (typeof args[i] == 'function') {
                        args[i](data);
                    }
                }
            },
            error: function () {
                console.log('An error occured');
            }
        });

    }

    function getFormJSON() {
        var obj, json, rev;

        obj = {
            _id: $("#trans-id").val() || String(Date.now()),
            type: $("#trans-type").val(),
            from: {
                type: $("#from-type").val(),
                name: $("#from-name").val()
            },
            to: {
                type: $("#to-type").val(),
                name: $("#to-name").val()
            },
            amount: Number($("#trans-amount").val()),
            cat: $("#trans-cat").val(), 
            subcat: $("#trans-subcat").val() || null,
            comments: $("#trans-comments").val()
        };

        rev = $("#trans-id").val();
        if (rev) {
            obj._rev = rev;
        }

        json = JSON.stringify(obj);
        return json;
    }

    function post(obj) {
        var args = arguments;

        $.ajax({
            url: obj.url,
            type: 'POST',
            data: obj.data,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data) {
                for (var i = 0; i < args.length; i++) {
                    if (typeof args[i] == 'function') {
                        args[i](data);
                    }
                }
            },
            error: function () {
                console.log('An error occured');
            }
        });   
    }

});