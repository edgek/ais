$(document).ready(function () {
    var parser = getParser(),
        db = 'test3';

    console.log("Ready");

    $("#full-input-submit").on("click", function () {
        var input = getInput(),
            parsedInput = parser.runParser(input),
            command = parsedInput.command;

        if (command == 'dr') {
            if (isValidDrCommand(parsedInput)) {
                post(db, JSON.stringify(parsedInput), log);    
            }
            else {
                throw "Invalid dr command";
            }
                
        } 
        else if (command == 'sum') {
            if (isValidSumCommand(parsedInput)) {
                get(db + '/_design/des1/_view/sum', log);
            }
        }
        
        //console.log(parsedInput);
    });

    function getInput() {
        var val = $("#full-input").val();
        return val.split(" ");
    }

    function isValidDrCommand(obj) {
        return true;
    }

    function isValidSumCommand(obj) {
        return true;
    }

    function log(data) {
        console.log(data);
    }

    function get(url) {
        var args = arguments;
        
        $.ajax({
            url: url,
            type: 'GET',
            success: function (data) {
                for (var i = 1; i < args.length; i++) {
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

    function post(url, data) {
        var args = arguments;

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data) {
                for (var i = 2; i < args.length; i++) {
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


/*
    function getSum(data) {
        var obj = jQuery.parseJSON(data);
        $("body").append("<p>The sum is " + obj.rows[0].value + "</p>");
    }

*/    

/*
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
*/

/*
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
*/

/*
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
*/
    

/*
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
*/
});