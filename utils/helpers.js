const { options } = require('./constants');

function isHelpFirstArgument() {
    return process.argv[2] === options.help.SHORT || process.argv[2] === options.help.LONG;
}

function printExamples() {
    console.log(`

    List of actions:

        io <filename>                      - reads file and puts it into stdout
        transform                          - reads stdin and puts it into stdout transforming to uppercase
        transform-file <filename>          - reads csv file, parses it into json and puts into stdout
        transform-save-file <filename>     - reads csv file, parses it into json and saves into file
        bundle-css <path>                  - contact all css files from path folder and adding one more css from epam

    Examples:

        $ node ./streams.js --action=io --file=users.csv
        $ node ./streams.js --action=transform-file --file=users.csv
        $ node ./streams.js --action=transform
        $ node ./streams.js -a io -f users.csv
        $ node ./streams.js --help
        $ node ./streams.js -h

    `);
}


module.exports = {
    isHelpFirstArgument,
    printExamples
};
