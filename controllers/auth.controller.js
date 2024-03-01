const { validationResult } = require("express-validator");
const { UserModel } = require("../models/user.model");
const { registerValidation } = require("./auth.validation");
const { createUser } = require("../services/auth.service");
const { asyncHandler } = require("../middlewares/async-handler.middleware");

const register = [
  ...registerValidation,
  asyncHandler(
    async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.validationError(errors);
      }

      const user = await createUser(req.body.name)

      res.ok({ user })
    },
  ),
]

module.exports = { register }
