const express = require('express');

const configureMiddleware = require('./config/middleware.js');
const actionRoutes = require('./routes/actionRoutes');
const projectRoutes = require('./routes/projectRoutes');

const port = 9000;

const server = express();

// MIDDLEWARE
configureMiddleware(server);

// ROUTES
server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);

server.listen(port, () => {
  console.log(`\n=== API running on port ${port} ===\n`);
});
