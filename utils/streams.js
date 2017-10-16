const program = require('commander');
const through2 = require('through2');
const fs = require('fs');
const path = require('path');
const request = require('request');

const { isHelpFirstArgument, printExamples } = require('./helpers');
const { options, actions } = require('./constants');

const { convertCSVToJSON } = require('../helpers');

const DATA_PATH = './data';

// helpers

function printWarningAndUsage(msg) {
    console.log(`
${msg}
    `);
    program.outputHelp();
}

function getFilePath(fileName) {
    return path.join(DATA_PATH, fileName);
}

// action functions

function inputOutput(fileName) {
    const filePath = getFilePath(fileName);

    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            console.log(`no access to ${filePath} - incorrect path or not readable!`);
            return;
        }
        fs.createReadStream(filePath).pipe(process.stdout);
    });
}

function transformStdinStdoutUpperCase() {
    process.stdin
        .pipe(through2((chunk, enc, callback) => {
            callback(null, chunk.toString().toUpperCase());
        }))
        .pipe(process.stdout);
}

function transformFileJSONToCSVToStdout(fileName) {
    const filePath = getFilePath(fileName);

    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            console.log(`no access to ${filePath} - incorrect path or not readable!`);
            return;
        }

        fs.createReadStream(filePath)
            .pipe(through2((chunk, enc, callback) => {
                callback(null, convertCSVToJSON(chunk.toString()) + '\n');
            }))
            .pipe(process.stdout);
    });
}

function transformFileJSONToCSVToFile(fileName) {
    const filePath = getFilePath(fileName);

    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            console.log(`no access to ${filePath} - incorrect path or not readable!`);
            return;
        }
        const outputPath = filePath.substr(0, filePath.lastIndexOf('.')) + '.json';

        fs.createReadStream(filePath)
            .pipe(through2((chunk, enc, callback) => {
                callback(null, convertCSVToJSON(chunk.toString()) + '\n');
            }))
            .pipe(fs.createWriteStream(outputPath));
    });
}

function pipeNextFile(fileNames, idx, filesCount, writeStream, folderPath) {

    if (idx < filesCount) {
        const filePath = path.join(folderPath, fileNames[idx]);
        const readStream = fs.createReadStream(filePath);

        readStream.once('end', () => {
            console.log('will do ' + idx);
            pipeNextFile(fileNames, idx + 1, filesCount, writeStream, folderPath);
        });

        readStream.pipe(writeStream, { end: false });
    } else {
        request
            .get('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css')
            .on('error', (err) => {
                console.log(err)
            })
            .pipe(writeStream)
    }
}

function bundleCSS(folderPath) {
    fs.stat(folderPath, (err, stats) => {
        if (err) {
            console.log('Folder doesn\'t exist');
            return;
        }
        if (!stats.isDirectory()) {
            console.log('This isn\'t a directory!');
            return;
        } else {
            const fileNames = fs.readdirSync(folderPath)
                                .filter((fileName) => { return path.extname(fileName) === '.css' && fileName !== 'bundle.css'; });

            const filesCount = fileNames.length;
            const writeStream = fs.createWriteStream(path.join(folderPath, 'bundle.css'));

            pipeNextFile(fileNames, 0, filesCount, writeStream, folderPath);
        }
    });
}

// main func

function utilProgram() {

    program
        .usage('is used to do an action with a file. Please specify a filepath and an action to perform')
        .option(`${options.action.SHORT}, ${options.action.LONG} <action>`, 'action to perform')
        .option(`${options.path.SHORT}, ${options.path.LONG} <path>`, 'path of css folder. Only for bundle-css action')
        .option(`${options.file.SHORT}, ${options.file.LONG} <filename>`, 'filename with extension')

    program.on(options.help.LONG, () => {
        printExamples();
    });

    program.parse(process.argv);

    if (isHelpFirstArgument()) {
        program.help();
    } else if (program.action) {

        switch(program.action) {
            case actions.IO:
                inputOutput(program.file);
                break;
            case actions.TRANSFORM:
                transformStdinStdoutUpperCase();
                break;
            case actions.TRANSFORM_FILE:
                transformFileJSONToCSVToStdout(program.file);
                break;
            case actions.TRANSFORM_AND_SAVE_FILE:
                transformFileJSONToCSVToFile(program.file);
                break;
            case actions.BUNDLE_CSS:
                if (program.path) {
                    bundleCSS(program.path);
                } else {
                    printWarningAndUsage(`  Path was not provided for ${program.action} action!`);
                }
                break;
            default:
                printWarningAndUsage(`  Unknown action = ${program.action}`);
                break;
        }
    } else {
        printWarningAndUsage('  Wrong input:');
    }
}

// execute it if it's not a child module
if (!module.parent) {
    utilProgram();
}

module.exports = {
    utilProgram
};
