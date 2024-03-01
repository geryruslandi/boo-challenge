'use strict';

const express = require('express');
const { postComment, getComments, toggleLike } = require('../controllers/comments.controller');
const { userAuth } = require('../middlewares/auth.middleware');

module.exports = () => {
  const router = express.Router({ mergeParams: true });

  router.post('/:commentId/toggle-like', userAuth, toggleLike)

  router.post('/', userAuth, postComment)

  router.get('/', getComments)

  return router
}
