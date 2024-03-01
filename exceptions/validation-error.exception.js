class ValidationError extends Error {
  httpStatus;
  constructor(message, httpStatus = 422) {
    super(message);
    this.httpStatus = httpStatus
  }
}

module.exports = { ValidationError }
