const { Client } = require('pg');

let client = new Client({
    connectionString: "postgresql://postgres:postgres@192.168.1.11:5432/postgres"
});

const connectDB = async () => {
    try {
        console.log('Connect to Postgres ...');
        client.connect();
        await new Promise((resol, rej) => {
            client.query('Select now() as run_at;', (err, res) => {
                if(err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(`Postgres Run at date-time : ${res.rows[0].run_at}`);
                    resol(res.rows[0].run_at);
                }
            })
        });
        await client.end();
        console.log('Postgres connection Completed ...');
    } catch (err) {
        console.log('Error while Connecting DB !')
    }
}

module.exports = connectDB;
