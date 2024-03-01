'use strict';

const express = require('express');
const { store, show } = require('../controllers/profile.controller');
const { postComment, getComments } = require('../controllers/comments.controller');
const { userAuth } = require('../middlewares/auth.middleware');

module.exports = function() {
  const router = express.Router();

  router.post("/", store)

  router.get('/:id', show);

  router.post('/:profileId/comments', userAuth, postComment)

  router.get('/:profileId/comments', getComments)

  return router;
}
