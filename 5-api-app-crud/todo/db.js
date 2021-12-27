"use strict";

const mariadb = require('mariadb');

require('dotenv').config();

const pool = 
  mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  });

// Expose the Pool object within this module
module.exports = Object.freeze({
  pool: pool
});

