const { StatusCodes } = require('http-status-codes');
const BaseError = require('./baseError');

class APIError extends BaseError {
  constructor(
    name,
    httpCode = StatusCodes.INTERNAL_SERVER_ERROR,
    description = 'internal server error',
    reason = 'unknown',
  ) {
    super(name, httpCode, description, reason);
  }
}

const APIErrorFactory = {
  create: (name, httpCode, description, reason) => new APIError(
    name,
    httpCode,
    description,
    reason,
  ),
};

const apiError = APIErrorFactory.create;

exports.DataNotFoundError = (data) => apiError(
  'DataNotFoundError',
  StatusCodes.NOT_FOUND,
  `${data ? `${data}` : ''} not found`,
  data,
);
