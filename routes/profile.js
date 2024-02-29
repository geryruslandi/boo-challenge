'use strict';

const express = require('express');
const { store, show } = require('../controllers/profile.controller');
const { postComment, getComments } = require('../controllers/comments.controller');
const router = express.Router();

module.exports = function() {

  router.post("/", store)

  router.get('/:id', show);

  router.post('/:profileId/comments', postComment)

  router.get('/:profileId/comments', getComments)

  return router;
}
