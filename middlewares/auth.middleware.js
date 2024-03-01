const { UserModel } = require("../models/user.model")

// As per project requirement on email,
// user only need to put their name into
// authorization header
// usually i would implement JWT for this case
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
