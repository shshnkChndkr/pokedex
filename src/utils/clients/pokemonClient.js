const axiosClient = require('./axiosClient');
const { clientTypes } = require('../constants');
const Logger = require('../../logger/logger');

const logger = Logger.getLogger('./clients/pokeapiClient.js');
const ENGLISH = 'en';
const pokemonClient = axiosClient[clientTypes.POKEMON_CLIENT];

const getDescription = (flavorTextEntries) => {
  let description = '';
  flavorTextEntries.forEach((element) => {
    if (element.language.name === ENGLISH) {
      description = `${description} ${element.flavor_text}`;
    }
  });
  description = description.replace(/\n/g, ' ');
  description = description.replace(/\f/g, ' ');
  logger.info('Successfully retrieved description for pokemon');
  return description;
};

const getPokemonSpeciesById = async (id) => {
  logger.debug(`Getting pokemon species for id ${id}`);
  const response = await pokemonClient.get(`/pokemon-species/${id}`)
    .catch((error) => {
      logger.error(`Failed to get pokemon species for id ${id}`);
      throw error;
    });
  logger.info(`Successfully retrieved pokemon species for pokemon id ${id}`);
  const description = getDescription(response.data.flavor_text_entries);

  const data = {
    id: response.data.id,
    name: response.data.name,
    is_legendary: response.data.is_legendary,
    habitat: response.data.habitat.name,
    description,
  };
  return data;
};

const getPokemonDetailsByName = async (name) => {
  logger.debug(`Getting pokemon details for name ${name}`);
  const response = await pokemonClient.get(`/pokemon/${name}`)
    .catch((error) => {
      logger.error(`Failed to get pokemon details for name ${name}`);
      throw error;
    });
  logger.info(`Successfully retrieved pokemon details for pokemon name ${name}`);
  const details = getPokemonSpeciesById(response.data.id);
  return details;
};

module.exports = {
  getPokemonDetailsByName,
  getPokemonSpeciesById,
};
