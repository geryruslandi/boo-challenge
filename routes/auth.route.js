'use strict';

const express = require('express');
const { register } = require('../controllers/auth.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/register', register)

  return router
}
