const { logger } = require('./logger.js');
const path = require("path")
const listFiles = require('./listFiles.js');
const decompressFileToTxt = require('./decompressFiles.js');
const fs = require('fs');
const scriptArg = process.argv[2];
const exec = require('child_process');
const queryDBdedata = require('./scripts/queryDBdedata.js');

// TODO: GENERAL
// TODO: improve batch/multi-threaded insertion to rawdata DB; clean data source
// TODO: lru cache for rawdata/dedata connection
// TODO: separate and improve composition of functions

// TODO: QUERIES
// TODO: query for: How many unique user_ips were seen per geo location in total
// TODO: How many unique user_ips were seen per region in total
// TODO: How many unique user_ips were seen per connection type in total
// TODO: ip frequency for hour 01
// TODO: for hour 01 how many ips were seen per user-agent
// TODO: For hour 01 for each user-agent - how many with VPN

// TODO: BENCHMARKS
// TODO: How much time was spent in file parsing
// TODO: How much time was spent in digital element db query
// TODO: How much time was spent in rds insertion
// TODO: How much time spent in total
// TODO: iterate in multiple process for each hour and remove txt file after
// TODO: improve errors handling
// TODO: unit tests for async functions and processes (mocha)
// TODO: add download script from Google Drive
// TODO: modify timestamp of rawdata insertion

console.log("SCRIPT PROCESS ARGUMENT:", scriptArg);
let rawData = {
    "test": {
        "startPath": 'rawData',
        "data": [path.resolve('rawData/testRaw01.txt')]
    },
    "test2raw": {
        "startPath": 'rawData',
        "data": Array.from(listFiles('rawData','.gz')).flat(4)
    },
    "test2text": {
        "startPath": 'rawData',
        "data": Array.from(listFiles('rawData','000.txt')).flat(4)
    },
}
switch (scriptArg) {
    case 'test':
        console.log(scriptArg, 'smells quite badly.');
        break;
    case 'test2raw':
        console.log(scriptArg, 'is really cool.');
        break;
    default:
        console.log('Sorry, that is not something I know how to do.');
}

let execScripts = {
    // TODO: remove duplicate code
    // TODO: invoke deleteTextScript at end of parsing process
    runDeleteTextsScript: function(scriptPath, callback) {
        logger.info(`Running script ${scriptPath}`);

        let invoked = false;
        let process = exec.fork(scriptPath);

        process.on('error', function (err) {
            if (invoked) return;
            invoked = true;
            callback(err);
        });

        process.on('exit', function (code) {
            if (invoked) return;
            invoked = true;
            let err = code === 0 ? null : new Error('exit code ' + code);
            callback(err);
        });
    },
    runExtractTextsScript: function(scriptPath, callback) {
        logger.info(`Running script ${scriptPath}`);

        let invoked = false;
        let process = exec.fork(scriptPath);

        process.on('error', function (err) {
            if (invoked) return;
            invoked = true;
            callback(err);
        });

        process.on('exit', function (code) {
            if (invoked) return;
            invoked = true;
            let err = code === 0 ? null : new Error('exit code ' + code);
            callback(err);
        });
    },
}

execScripts.runExtractTextsScript('./scripts/extractRawTexts.js', function (err) {
    if (err) throw err;
    console.log('finished running extractRawTexts.js');
});


// execScripts.runDeleteTextsScript('./scripts/deleteRawTexts.js', function (err) {
//     if (err) throw err;
//     console.log('finished running deleteRawTexts.js');
// });

const extractData = async function(filePath) {
    console.log("DATA EXTRACTION T00O rawdata DB");

    let child = await exec.fork('./scripts/extractDataToDB.js')
    child.send(filePath);
    child.on('message', function(message) {
        console.log('PARENT got message :', message);
    });
    child.on('error', function(err) {
        console.log('PARENT got error:', err);
    });
    child.on('exit', function(code) {
        console.log('PARENT got exit code:', code);
    });

    await queryDBdedata();
};

extractData(rawData.test.data[0]).then(v => {
    console.log("OK", v);
    // TODO: add character length insertion constraints
     // TODO: replace with subscription to new_ip_added
    // TODO: insert ips to array, make request to http server, then insert to DB
    // TODO: update DB with response from http server

});

// let filesArrayFlat = Array.from(listFiles('rawData','.gz')).flat(4)
// let textFilesArrayFlat = Array.from(listFiles('rawData','000.txt')).flat(4)

// console.log("RAWDATA gz FILES:", filesArrayFlat)
// console.log("Extracted txt files:", textFilesArrayFlat)

// logger.info(extractRawData(filepath));