console.log("OK")
let path = require("path")
const pg = require('pg')
const copyFrom = require('pg-copy-streams').from
const fs = require('fs');
const readline = require('readline');
const parseline = require("./../helpers/parseline");
const stream = require('stream');
const Transform = stream.Transform || require('readable-stream').Transform;
const string = require('lodash/string');

const pool = new pg.Pool(
    {
        user: 'postgres',
        host: 'postgres',
        database: 'postgres',
        password: 'postgres',
        port: 5432
    }
);

pool.connect(function(err, client, done) {
    if (err) {
        return console.error('connection error', err);
    }
    client.query("select * from rawdata", function (err, result) {
        done();
        if (err) {
            return console.error('error running query', err);
        }
        console.log("RAWDATA DB COUNT", result.rows.length)
    });

    let filePath = path.resolve('rawData/00/ios/us/data/000.txt') // TODO: extract as a parameter argument

    function toTSVstream(filePath) {
        console.time("BENCHMARK toTSVstream");
        const readStream = fs.createReadStream(filePath);
        // Edit timestamp to today's date for hour of directory, ex. 00..01
        let stream = client.query(copyFrom("COPY rawdata(ip, user_agent) FROM STDIN with delimiter '\t'"));

        const transformStream = new Transform({
            transform(data, encoding, callback) {
                const transformedData = parseline(data.toString())
                this.push(transformedData);
                callback();
            }
        })

        readStream.pipe(transformStream).pipe(stream).on('finish', () => {
            console.log(`Finished extracting contents of ${filePath} and saving the output to rawdata DBs.`);
        });


        console.timeEnd("BENCHMARK toTSVstream")
    }
    toTSVstream(filePath)
});