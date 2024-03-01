const { param, body, query } = require("express-validator")
const { mbti, enneagram, zodiac, sortValue, filterField } = require("../enums/common.enum")
const { default: mongoose } = require("mongoose")

const postCommentValidation = [
  param('profileId').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("invalid profile id")
    }
    return true
  }),
  body('title').isString().notEmpty(),
  body('mbti').isString().isIn(Object.values(mbti)).notEmpty(),
  body('enneagram').isString().isIn(Object.values(enneagram)).notEmpty(),
  body('zodiac').isString().isIn(Object.values(zodiac)).notEmpty(),
  body('comment').isString().notEmpty(),
]

const getCommentsValidation = [
  query('filter_field')
    .default(filterField.NONE)
    .isIn(Object.values(filterField)),
  query('filter_value')
    .custom((value, { req }) => {
      switch (req.query.filter_field) {
        case filterField.ENNEAGRAM:
          if (Object.values(enneagram).includes(value)) {
            return true
          }
          throw Error("invalid enneagram value")
        case filterField.MBTI:
          if (Object.values(mbti).includes(value)) {
            return true
          }
          throw Error("invalid mbti value")
        case filterField.ZODIAC:
          if (Object.values(zodiac).includes(value)) {
            return true
          }
          throw Error("invalid mbti value")
        default:
          return true
      }
    }),
  query('sort')
    .default(sortValue.RECENT)
    .isIn(Object.values(sortValue)),
  param('profileId').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("invalid profile id")
    }
    return true
  }).customSanitizer(value => new mongoose.Types.ObjectId(value)),
]

const toggleLikeValidation = [
  param('profileId').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("invalid profile id")
    }
    return true
  }).customSanitizer(value => new mongoose.Types.ObjectId(value)),
  param('commentId').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("invalid comment id")
    }
    return true
  }).customSanitizer(value => new mongoose.Types.ObjectId(value)),
]

module.exports = { postCommentValidation, getCommentsValidation, toggleLikeValidation }
