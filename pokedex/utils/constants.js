const retryStatusCodes = [
  408, // Request Timeout
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, // Gateway Timeout
];
const TIMEOUT_ERROR_MESSAGE = 'Request timed out';
const CONTENT_TYPE_HEADER = 'Content-Type';
const CONTENT_TYPE_JSON = 'application/json';

const clientTypes = {
  POKEMON_CLIENT: Symbol('pokemonClient'),
  SHAKESPEARE_CLIENT: Symbol('shakespeareClient'),
  YODA_CLIENT: Symbol('yodaClient'),
};

const clientEnforcer = {
  [clientTypes.POKEMON_CLIENT]: Symbol('pokemonClientEnforcer'),
  [clientTypes.SHAKESPEARE_CLIENT]: Symbol('shakespeareClientEnforcer'),
  [clientTypes.YODA_CLIENT]: Symbol('yodaClientEnforcer'),
};

const pokemonClientConfig = {
  baseURL: process.env.POKE_API_URL,
  timeout: 5000,
  headers: {
    CONTENT_TYPE_HEADER: CONTENT_TYPE_JSON,
  },
  timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE,
  insecureHTTPParser: true,
};

const shakespeareClientConfig = {
  baseURL: process.env.SHAKESPEARE_API_URL,
  timeout: 5000,
  headers: {
    CONTENT_TYPE_HEADER: CONTENT_TYPE_JSON,
  },
  timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE,
  insecureHTTPParser: true,
};

const yodaClientConfig = {
  baseURL: process.env.YODA_API_URL,
  timeout: 5000,
  headers: {
    CONTENT_TYPE_HEADER: CONTENT_TYPE_JSON,
  },
  timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE,
  insecureHTTPParser: true,
};

const POKEMON_HABITAT = {
  CAVE: 'cave',
};

module.exports = {
  retryStatusCodes,
  clientTypes,
  pokemonClientConfig,
  shakespeareClientConfig,
  yodaClientConfig,
  clientEnforcer,
  POKEMON_HABITAT,
};
