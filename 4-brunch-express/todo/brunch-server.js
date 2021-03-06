'use strict';

const express = require('express');
const http = require('http');
const path = require('path');

module.exports = function startServer(PORT, PATH, callback) {
  const app = express();
  const server = http.createServer(app);

  // brunch compiled static files
  app.use(express.static(path.join(__dirname, PATH)));

  app.get('/hello', (req, res) => {
    res.send('Hello World!')
  });

  server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
    callback();
  });
};
