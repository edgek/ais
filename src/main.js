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
});