const { ProfileModel } = require("../models/profile.model")
const { ValidationError } = require('../exceptions/validation-error.exception')

const postComment = async (profileId, commentDTO, creator) => {
  const profile = await ProfileModel.where({ _id: profileId }).findOne()

  if (!profile) {
    throw new ValidationError("Profile not found")
  }

  profile.comments.push({
    creator_id: creator._id,
    title: commentDTO.title,
    mbti: commentDTO.mbti,
    enneagram: commentDTO.enneagram,
    zodiac: commentDTO.zodiac,
    comment: commentDTO.comment,
  })

  await profile.save()

  return profile
}

const toggleLike = async (profileId, commentId, user) => {
  const profileExist = await ProfileModel.exists({
    _id: profileId
  })

  if (!profileExist) {
    throw new ValidationError("Profile not found")
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

  if (!comment) {
    throw new ValidationError("comment not found")
  }

  const usersLike = comment.users_like
  let finalUsersLike = usersLike
  let finalUsersLikeCount = comment.likes

  const userLikeIndex = usersLike.findIndex(item => {
    return item.user_id.equals(user._id)
  })

  if (userLikeIndex == -1) {
    finalUsersLikeCount++
    finalUsersLike.push({
      user_id: user._id
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
}

module.exports = { postComment, toggleLike }
