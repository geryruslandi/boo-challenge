'use strict';

const express = require('express');
const { store, show } = require('../controllers/profile.controller');

module.exports = function () {
  const router = express.Router();

  router.post("/", store)

  router.get('/:id', show);



  return router;
}
