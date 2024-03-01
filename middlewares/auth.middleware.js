const { UserModel } = require("../models/user.model")

const userAuth = async (req, res, next) => {
  const username = req.headers.authorization

  if (!username) {
    return res.unauthorized()
  }

  const user = await UserModel.where('name', username).findOne()

  if (!user) {
    return res.unauthorized("logged in user not found")
  }

  req.user = user

  next()
}

module.exports = { userAuth }
