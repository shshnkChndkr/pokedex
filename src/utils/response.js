/**
 * @module response
 */
// RESPONSE STATUS ENUMS
const RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * Get standardized response object. Inspired by Jsend.
 * @param {String} status - Resulting status of the request, either 'success' or 'error'.
 * @param {Object} data - Data to be returned, if any.
 * @param {String} message - Message to be returned Should be present in error cases.
 * @param {String} code Error code, if any.
 * @returns {Object} The response object.
 * @inner
 */
function response(status, data, message, code) {
  return {
    status,
    data,
    message,
    code,
  };
}

/**
 * Get the success response object.
 * @param {Object} data - Data to be returned, if any.
 * @param {String} message - Message to be returned
 * @returns {Object} The success response object.
 * @static
 */
function successResponse(data, message) {
  return response(RESPONSE_STATUS.SUCCESS, data, message);
}

/**
 * Get the error response object.
 * @param {Object} data - Data to be returned, if any.
 * @param {String} message - Message explaining the particular error.
 * @param {String} code - Error code, if any.
 * @returns {Object} The error response object.
 * @static
 */
function errorResponse(data, message, code) {
  return response(RESPONSE_STATUS.ERROR, data, message, code);
}

module.exports = {
  successResponse, errorResponse,
};
