const { body } = require("express-validator")

const registerValidation = [
  body('name').isString().notEmpty()
]

module.exports = { registerValidation }
