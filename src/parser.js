/*
 * Parses commands and options similar to Unix shell.
 * The input must be split into an array of strings prior to parsing.
 */

function getParser () {
    var SWITCHES = [
        ['-a', '--amount [NUMBER]', "Amount"],
        ['-c', '--category MESSAGE', "Category"],
        ['-n', '--name MESSAGE', "Name"],
        ['-t', '--transaction', "Type"]
    ];
    var parser = new optparse.OptionParser(SWITCHES);
    var parsedInput = {};

    parser.runParser = function (arrv) {
        parsedInput = {};
        parser.parse(arrv);
        return parsedInput;
    }

    parser.on(0, function(opt, arg) {
        parsedInput.command = opt;
    });

    parser.on('amount', function(opt, arg) {
        parsedInput.amount = arg;
    });

    parser.on('category', function(opt, arg) {
        parsedInput.category = arg;
    });

    parser.on('name', function(opt, arg) {
        parsedInput.name = arg;
    });

    parser.on('transaction', function(opt) {
        parsedInput.type = opt;
    });

    return parser;
}
