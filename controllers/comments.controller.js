const { validationResult } = require("express-validator");
const { ProfileModel } = require("../models/profile.model");
const { postCommentValidation, getCommentsValidation, toggleLikeValidation } = require("./comments.validation");
const { filterField } = require("../enums/common.enum");
const { CommentSearchService } = require("../services/comment-search.service");
const { asyncHandler } = require("../middlewares/async-handler.middleware");
const { postComment: postCommentService, toggleLike: toggleLikeService } = require('../services/comment.service')

const postComment = [
  ...postCommentValidation,
  asyncHandler(
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.validationError(errors);
      }

      const profile = await postCommentService(req.params.profileId, req.body, req.user)

      res.ok(profile)
    }
  ),
]

const getComments = [
  ...getCommentsValidation,
  asyncHandler(
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.validationError(errors);
      }

      const { sort, filter_field, filter_value } = req.query
      const profileId = req.params.profileId

      const searchService = new CommentSearchService(profileId)
      searchService.withSort(sort)

      if (filter_field != filterField.NONE) {
        searchService.withFilter(filter_field, filter_value)
      }

      const comments = await searchService.search()

      res.ok({ comments })
    }
  ),
]

const toggleLike = [
  ...toggleLikeValidation,
  asyncHandler(
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.validationError(errors);
      }

      const { profileId, commentId } = req.params

      await toggleLikeService(profileId, commentId, req.user)

      res.ok()
    }
  ),
]

module.exports = { postComment, getComments, toggleLike }
