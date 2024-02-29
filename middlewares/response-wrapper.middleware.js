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

  res.error = (message, status) => {
    return res.status(status).json({
      message
    })
  }

  res.validationError = (errors) => {
    const firstError = errors.array()[0]
    return res.status(422).json({
      message: `${firstError.path} has ${firstError.msg}`
    })
  }

  next()
}

module.exports = { responseWrapper }
