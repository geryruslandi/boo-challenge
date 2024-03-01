const { ValidationError } = require("../exceptions/validation-error.exception")
const { UserModel } = require("../models/user.model")

const createUser = async (userName) => {
  const userExist = await UserModel.where('name', userName).findOne()

  if (userExist) {
    throw new ValidationError("user with same name exist")
  }

  return UserModel.create({
    name: userName,
  })
}

module.exports = {
  createUser
}
