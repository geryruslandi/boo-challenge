const { mbti, enneagram } = require("../enums/common.enum");
const { param, body } = require("express-validator");

const showValidation = [
  param('id').custom((value) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error("id is incorrect")
    }
    return true
  }),
]

const storeValidation = [
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('mbti')
    .isString()
    .isIn(Object.values(mbti))
    .notEmpty(),
  body('enneagram')
    .isString()
    .isIn(Object.values(enneagram))
    .notEmpty(),
  body('variant').isString().notEmpty(),
  body('tritype').isNumeric().notEmpty(),
  body('socionics').isString().notEmpty(),
  body('sloan').isString().notEmpty(),
  body('psyche').isString().notEmpty(),
  body('image').isURL().notEmpty(),
  body('temperaments').isString().notEmpty(),
]

module.exports = { showValidation, storeValidation }
