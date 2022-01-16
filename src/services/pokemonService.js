const pokemonClient = require('../utils/clients/pokemonClient');
const yodaClient = require('../utils/clients/yodaClient');
const shakespeareClient = require('../utils/clients/shakespeareClient');
const { successResponse } = require('../utils/response');
const { POKEMON_HABITAT } = require('../utils/constants');
const apiError = require('../utils/errorHandling/apiError');
const Logger = require('../logger/logger');
const responseMessages = require('../utils/responseMessages');

const logger = Logger.getLogger('./services/pokemonService.js');
const { DataNotFoundError } = apiError;

const getPokemonDetails = async (pokemonName) => {
  if (!pokemonName) {
    logger.error('Missing pokemon name');
    throw DataNotFoundError('Missing pokemon name');
  }

  const response = await pokemonClient.getPokemonDetailsByName(pokemonName);
  logger.info(`Successfully retrieved pokemon data for ${pokemonName}`);
  return successResponse(response, responseMessages.SUCCESS_GET_POKEMON_DETAILS);
};

const translatePokemonDetails = async (pokemonName) => {
  if (!pokemonName) {
    logger.error('Missing pokemon name');
    throw DataNotFoundError('Missing pokemon name');
  }

  const response = await pokemonClient.getPokemonDetailsByName(pokemonName);
  logger.info(`Successfully retrieved pokemon data for ${pokemonName}`);

  const { isLegendary, description } = response;
  const habitat = response.habitat.name;
  let translatedDescription = '';

  if (POKEMON_HABITAT.CAVE === habitat || isLegendary) {
    logger.info(`Pokemon ${pokemonName} is a legendary pokemon or a cave pokemon`);
    translatedDescription = await yodaClient.getYodaTranslation(description);
    logger.info(`Successfully translated pokemon description for ${pokemonName}`);
  } else {
    logger.info(`Pokemon ${pokemonName} is a normal pokemon`);
    translatedDescription = await shakespeareClient.getShakespeareTranslation(description);
    logger.info(`Successfully translated pokemon description for ${pokemonName}`);
  }

  if (!translatedDescription) {
    logger.info(`Failed to translate pokemon ${pokemonName}`);
    translatedDescription = description;
  }

  const data = {
    id: response.id,
    name: response.name,
    is_legendary: response.is_legendary,
    habitat: response.habitat.name,
    description: translatedDescription,
  };
  logger.info(`Successfully translated pokemon data for ${pokemonName}`);
  return successResponse(data, responseMessages.SUCCESS_GET_POKEMON_DETAILS_TRANSLATED);
};

module.exports = {
  getPokemonDetails, translatePokemonDetails,
};
