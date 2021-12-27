'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');

module.exports = function startServer(PORT, PATH, callback) {
  const app = express();
  const server = http.createServer(app);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use("/api", api);

  // brunch compiled static files
  app.use(express.static(path.join(__dirname, PATH)));

  server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
    callback();
  });
};
