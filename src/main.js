$(document).ready(function () {
    var parser = getParser(),
        config = {
            db: 'test3',
            views: {
                sum: '/_design/des1/_view/sum',
                ls: '/_design/des1/_view/list?limit=5'
            },
            elements: {
                data: '#grid'
            }
        };

    $("#full-input-submit").on("click", function () {
        var input = getInput(),
            // Parse command and options entered on input similar to Unix shell
            parsedInput = parser.runParser(input);

        // Execute command
        switch (parsedInput.command) {
            case 'dr':
                if (isValidDrCommand(parsedInput)) {
                    post(config.db, JSON.stringify(parsedInput), log);    
                }
                else {
                    throw "Invalid dr command";
                }
                break;
            case 'sum':
                if (isValidSumCommand(parsedInput)) {
                    get(config.db + config.views.sum, view);
                }
                break; 
            case 'ls':
                if (isValidLsCommand(parsedInput)) {
                    get(config.db + config.views.ls, view);
                }
                break;
        }
    });

    // Display data on page after making requests to database 
    function view(json) {
        var targetElement = $(config.elements.data);
        targetElement.html(makeTable(json));
    }

    // Convert JSON response to HTML table
    function makeTable(json) {
        var obj = JSON.parse(json),
            table = $("<table>"),
            row, value, i;

        for (i = 0; i < obj.rows.length; i++) {
            row = $("<tr>");
            row.append("<td>" + obj.rows[i].key + "</td>");
            value = obj.rows[i].value;
            if (value instanceof Array) {
                value.forEach(function (element) {
                    row.append("<td>" + element + "</td>");        
                });
            }
            else {
                row.append("<td>" + value + "</td>");  
            }
            table.append(row);    
        }

        return table;
    }

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

    function isValidLsCommand(obj) {
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