const { validationResult } = require("express-validator");
const { ProfileModel } = require("../models/profile.model");
const { postCommentValidation, getCommentsValidation } = require("./comments.validation");

const postComment = [
  ...postCommentValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.validationError(errors);
    }

    const profile = await ProfileModel.where({ _id: req.params.profileId }).findOne()

    if (!profile) {
      return res.error("profile not found", 422)
    }

    profile.comments.push({
      creator_id: req.user._id,
      title: req.body.title,
      mbti: req.body.mbti,
      enneagram: req.body.enneagram,
      zodiac: req.body.zodiac,
      comment: req.body.comment,
    })

    await profile.save()

    res.ok(profile)
  }
]

const getComments = [
  ...getCommentsValidation,
  async (req, res) => {
    const { sort_field, sort_value } = req.body
  }
]

module.exports = { postComment, getComments }
