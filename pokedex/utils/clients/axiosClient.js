/* eslint-disable arrow-body-style */
const axios = require('axios');
const axiosRetry = require('axios-retry');
const Logger = require('../../logger/logger');
const {
  retryStatusCodes,
  clientTypes,
  clientEnforcer,
  pokemonClientConfig,
  shakespeareClientConfig,
  yodaClientConfig,
} = require('../constants');

const logger = Logger.getLogger('./clients/axiosClient.js');

class ApiService {
  constructor(enforcer) {
    switch (enforcer) {
      case clientEnforcer[clientTypes.POKEMON_CLIENT]:
        logger.info('Initializing pokemon client');
        this.session = axios.create(pokemonClientConfig);
        logger.debug('Pokemon client initialized');
        break;
      case clientEnforcer[clientTypes.SHAKESPEARE_CLIENT]:
        logger.info('Initializing shakespeare client');
        this.session = axios.create(shakespeareClientConfig);
        logger.debug('Shakespeare client initialized');
        break;
      case clientEnforcer[clientTypes.YODA_CLIENT]:
        logger.info('Initializing yoda client');
        this.session = axios.create(yodaClientConfig);
        logger.debug('Yoda client initialized');
        break;
      default:
        logger.error('Invalid client enforcer');
        throw new Error('Invalid client enforcer');
    }

    axiosRetry(this.session, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      shouldResetTimeout: true,
      retryCondition: (error) => {
        return retryStatusCodes.includes(error.response.status);
      },
    });
  }

  static get instance() {
    if (!this[clientTypes.POKEMON_CLIENT]) {
      this[clientTypes.POKEMON_CLIENT] = new ApiService(clientEnforcer[clientTypes.POKEMON_CLIENT]);
    }

    if (!this[clientTypes.YODA_CLIENT]) {
      this[clientTypes.YODA_CLIENT] = new ApiService(clientEnforcer[clientTypes.YODA_CLIENT]);
    }

    if (!this[clientTypes.SHAKESPEARE_CLIENT]) {
      // eslint-disable-next-line max-len
      this[clientTypes.SHAKESPEARE_CLIENT] = new ApiService(clientEnforcer[clientTypes.SHAKESPEARE_CLIENT]);
    }

    return this;
  }

  get = (...params) => this.session.get(...params);

  post = (...params) => this.session.post(...params);

  put = (...params) => this.session.put(...params);

  patch = (...params) => this.session.patch(...params);

  remove = (...params) => this.session.delete(...params);
}

module.exports = ApiService.instance;
