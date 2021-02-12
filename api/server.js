const express = require('express');
const server = express();

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.use('*', (req, res) => {
  res.status(404).json({ message: '404 Not Found*:' });
});

module.exports = server;
