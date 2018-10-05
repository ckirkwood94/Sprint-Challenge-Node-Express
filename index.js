const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureMiddleware = require('./config/middleware.js');

const port = 9000;

const server = express();

// middleware
configureMiddleware(server);

server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`);
});
