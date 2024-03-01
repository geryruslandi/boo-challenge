'use strict';
const profileRoute = require('./profile.route')
const authRoute = require('./auth.route')
const express = require('express');
const commentRoute = require('./comment.route');

const appRoute = express.Router();

appRoute.use('/', profileRoute());
appRoute.use('/auth', authRoute())
appRoute.use('/:profileId/comments', commentRoute())

appRoute.use('*', (req, res) => {
  res.notFound("Page not found")
})

module.exports = { appRoute }
