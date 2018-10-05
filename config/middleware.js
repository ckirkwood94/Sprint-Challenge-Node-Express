const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

module.exports = (server) => {
  server.use(helmet());
  server.use(express.json());
  server.use(logger('tiny'));
  server.use(cors());
};
