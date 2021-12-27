"use strict";

const mariadb = require('mariadb');

require('dotenv').config();

const pool =  mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  });

/*
 * With promise chaining
 */
const main = () => {
  pool.getConnection()
    .then(conn => {
      conn.query("select * from tasks")
        .then(result => {
          console.log(result);
          conn.release();
          process.exit(0);
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });
};

main();
