// ERROR STATUS ENUMS
const ERROR_STATUS = {
  DataNotFoundError: '01',
  default: '00',
};
class BaseError extends Error {
  constructor(name, httpCode, description, reason) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    if (ERROR_STATUS[name]) {
      this.code = ERROR_STATUS[name];
    } else {
      this.code = ERROR_STATUS.default;
    }
    this.reason = reason;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = BaseError;
