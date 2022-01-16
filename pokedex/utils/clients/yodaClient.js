const { StatusCodes } = require('http-status-codes');
const axiosClient = require('./axiosClient');
const { clientTypes } = require('../constants');
const Logger = require('../../logger/logger');

const yodaClient = axiosClient[clientTypes.YODA_CLIENT];
const logger = Logger.getLogger('./clients/yodaClient.js');

// eslint-disable-next-line consistent-return
const getYodaTranslation = async (text) => {
  logger.debug(`Getting yoda translation for text ${text}`);
  try {
    const response = await yodaClient.post('/yoda.json', {
      text,
    });
    logger.info(`Successfully retrieved yoda translation for text ${text}`);
    return response.data.contents.translated;
  } catch (err) {
    if (err.response.status === StatusCodes.TOO_MANY_REQUESTS) {
      logger.error('Yoda API rate limit exceeded. Please try again later.');
    } else {
      logger.error(`Failed to retrieve yoda translation for text ${text}`);
      throw err;
    }
  }
};

module.exports = {
  getYodaTranslation,
};
