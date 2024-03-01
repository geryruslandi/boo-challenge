const { validationResult } = require("express-validator");
const { ProfileModel } = require("../models/profile.model");
const { postCommentValidation, getCommentsValidation } = require("./comments.validation");
const { filterField, sortValue } = require("../enums/common.enum");

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.validationError(errors);
    }

    const { sort, filter_field, filter_value } = req.query
    const profileId = req.params.profileId

    const profileExist = await ProfileModel.exists({
      _id: profileId
    })

    if (!profileExist) {
      return res.error("profile not found", 422)
    }

    const additionalAggregates = []

    if (filter_field != filterField.NONE) {
      additionalAggregates.push({
        $project: {
          comments: {
            $filter: {
              input: '$comments',
              as: 'comment',
              cond: {
                $eq: [`$\$comment.${filter_field}`, filter_value]
              }
            }
          }
        },
      })
    }

    if (sort === sortValue.RECENT) {
      additionalAggregates.push({
        $project: {
          comments: {
            $sortArray: {
              input: "$comments",
              sortBy: { created_at: -1 }
            }
          }
        },
      })
    }

    if (sort === sortValue.BEST) {
      additionalAggregates.push({
        $project: {
          comments: {
            $sortArray: {
              input: "$comments",
              sortBy: { likes: -1 }
            }
          }
        },
      })
    }

    const comments = await ProfileModel.aggregate([
      {
        $match: { _id: profileId }
      },
      ...additionalAggregates,
    ])

    res.ok({ sort, filter_field, filter_value, profileId, comments: comments[0].comments })
  }
]

module.exports = { postComment, getComments }
