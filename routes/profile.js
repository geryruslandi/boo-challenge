'use strict';

const express = require('express');
const { store, show } = require('../controllers/profile.controller');
const router = express.Router();

module.exports = function() {

  router.post("/", store)

  router.get('/:id', show);

  return router;
}
