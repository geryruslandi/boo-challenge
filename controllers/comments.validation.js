const { param, body } = require("express-validator")
const { mbti, enneagram, zodiac, sortValue, sortField } = require("../enums/common.enum")

const postCommentValidation = [
  param('profileId').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("id is incorrect")
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
  body('sort_field')
    .isIn(Object.values(sortField))
    .default(sortField.ALL),
  body('sort_value')
    .isIn(Object.values(sortValue))
    .default(sortValue.RECENT),
]

module.exports = { postCommentValidation, getCommentsValidation }
