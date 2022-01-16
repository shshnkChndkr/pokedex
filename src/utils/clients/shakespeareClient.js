const { StatusCodes } = require('http-status-codes');
const axiosClient = require('./axiosClient');
const { clientTypes } = require('../constants');
const Logger = require('../../logger/logger');

const shakespeareClient = axiosClient[clientTypes.SHAKESPEARE_CLIENT];
const logger = Logger.getLogger('./clients/shakespeareClient.js');

// eslint-disable-next-line consistent-return
const getShakespeareTranslation = async (text) => {
  logger.debug(`Getting shakespeare translation for text ${text}`);
  try {
    const response = await shakespeareClient.post('/shakespeare.json', {
      text,
    });
    logger.info(`Successfully retrieved shakespeare translation for text ${text}`);
    return response.data.contents.translated;
  } catch (err) {
    if (err.response.status === StatusCodes.TOO_MANY_REQUESTS) {
      logger.error('Shakespeare API rate limit exceeded. Please try again later.');
    } else {
      logger.error(`Failed to retrieve yoda translation for text ${text}`);
      throw err;
    }
  }
};

module.exports = {
  getShakespeareTranslation,
};
