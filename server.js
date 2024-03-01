require('dotenv').config();
const express = require('express');
const { responseWrapper } = require('./middlewares/response-wrapper.middleware');
const { appRoute } = require('./routes');

const server = express();

server.use(express.json());
server.use(responseWrapper);
server.set('view engine', 'ejs');
server.use(express.static('public/static'))
server.use(appRoute)

module.exports = { server }
