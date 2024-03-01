const { validationResult } = require("express-validator");
const { ProfileModel } = require("../models/profile.model");
const { postCommentValidation, getCommentsValidation, toggleLikeValidation } = require("./comments.validation");
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

const toggleLike = [
  ...toggleLikeValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.validationError(errors);
    }

    const { profileId, commentId } = req.params

    const profileExist = await ProfileModel.exists({
      _id: profileId
    })

    if (!profileExist) {
      return res.error("profile not found", 422)
    }

    const comment = (
      await ProfileModel.aggregate([
        {
          $match: { _id: profileId }
        },
        {
          $project: {
            comments: {
              $filter: {
                input: '$comments',
                as: 'comment',
                cond: {
                  $eq: [`$\$comment._id`, commentId]
                }
              }
            }
          },
        },
      ])
    )[0].comments[0]

    const usersLike = comment.users_like
    let finalUsersLike = usersLike
    let finalUsersLikeCount = comment.likes

    const userLikeIndex = usersLike.findIndex(item => {
      return item.user_id.equals(req.user._id)
    })

    if (userLikeIndex == -1) {
      finalUsersLikeCount++
      finalUsersLike.push({
        user_id: req.user._id
      })
    } else {
      finalUsersLikeCount--
      finalUsersLike.splice(userLikeIndex, 1)
    }

    await ProfileModel.updateOne(
      {
        _id: profileId,
        'comments._id': commentId,
      },
      {
        $set: {
          'comments.$.users_like': finalUsersLike,
          'comments.$.likes': finalUsersLikeCount,
        },
      }
    )

    res.ok()
  }
]

module.exports = { postComment, getComments, toggleLike }
