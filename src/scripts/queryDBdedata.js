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

function queryDBdedata(){
  const client = new pg.Client({
            user: 'postgres',
            host: 'postgres',
            database: 'postgres',
            password: 'postgres',
            port: 5432
  })
  client.connect()
  const query = client.query(
    'SELECT * FROM dedata',
    (err, res) => {
      if (err) {
        console.log(err)
      } else {
          return res.rows
      }
    }
  )
}

module.exports = queryDBdedata;