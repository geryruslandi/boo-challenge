const responseWrapper = function (req, res, next) {
  res.ok = (data, message = "success",) => {
    return res.status(200).json({
      message,
      data
    })
  }

  res.notFound = (message = "resource not found") => {
    return res.status(404).json({
      message
    })
  }

  next()
}

module.exports = { responseWrapper }
