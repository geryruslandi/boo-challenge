'use strict';
const profileRoute = require('./profile')
const authRoute = require('./auth')
const express = require('express');

const appRoute = express.Router();

appRoute.use('/', profileRoute());
appRoute.use('/auth', authRoute())

appRoute.use('*', (req, res) => {
  res.notFound("Page not found")
})

module.exports = { appRoute }
