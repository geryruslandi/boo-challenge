const { validationResult } = require("express-validator");
const { UserModel } = require("../models/user.model");
const { registerValidation } = require("./auth.validation");

const register = [
  ...registerValidation,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.validationError(errors);
    }

    const userExist = await UserModel.where('name', req.body.name).findOne()

    if (userExist) {
      return res.error("user with same name exist", 422)
    }

    const user = await UserModel.create({
      name: req.body.name,
    })

    res.ok({ user })
  },
]

module.exports = { register }
