console.log("OK")

connectDB = require("./dbClient")
connectDB()

const fs = require('fs');
const readline = require('readline');
const parseline = require('./parseline');

let parsedTraffic = []
getIpData = require("./getIpData")

function readTraffic(filename) {
    let lines = []

    new Promise(resolve => {
        const rs = fs.createReadStream(filename);
        const rl = readline.createInterface({ input: rs });
        rl.on('line', line => {
            lines.push(parseline(line))
        })

        rl.on('close', () => {
            resolve()
        })
    }).then(() => {
        console.log(`IP ADDRESSES READ: ${lines[2].ip}`)
        getIpData(lines[0].ip) // HTTP request to get the data of the IP address
        // stream COPY FROM parsed to rawdata
        // stream HTTP response + IP to dedata
    });
}

let path = require("path")
let filepath = path.resolve('rawData/testRaw01.txt')
readTraffic(filepath, parsedTraffic)

