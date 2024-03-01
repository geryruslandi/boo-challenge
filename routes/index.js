'use strict';
const profileRoute = require('./profile.route')
const authRoute = require('./auth.route')
const express = require('express');
const commentRoute = require('./comment.route');
const { ValidationError } = require('../exceptions/validation-error.exception')

const appRoute = express.Router();

appRoute.use('/', profileRoute());
appRoute.use('/auth', authRoute())
appRoute.use('/:profileId/comments', commentRoute())

appRoute.use('*', (req, res) => {
  res.notFound("Page not found")
})

// error handler
appRoute.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.error(err.message, err.httpStatus)
  }

  res.error(err.message, 500)
})

module.exports = { appRoute }
