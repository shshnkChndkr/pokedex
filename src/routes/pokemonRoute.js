const express = require('express');
const pokemonService = require('../services/pokemonService');
const { errorResponse } = require('../utils/response');
const Logger = require('../logger/logger');

const router = express.Router();
const logger = Logger.getLogger('./routes/pokemon.js');

router.get('/welcome/', (req, res) => {
  res.send('WELCOME TO POKEMON API');
});

router.get('/:name', (req, res) => {
  logger.info(`Getting pokemon details for name ${req}`);
  const { name } = req.params;
  logger.info(`Getting pokemon details for name ${name}`);
  pokemonService
    .getPokemonDetails(name)
    .then((data) => {
      logger.info(`Successfully retrieved pokemon data for ${name}`);
      res.json(data);
    })
    .catch((err) => {
      const { status } = err.response;
      const { message } = err;
      logger.info(`Failed to get pokemon details for name ${name}`);
      res.status(status).json(errorResponse(name, message, status));
    });
  return res;
});

router.get('/translate/:name', (req, res) => {
  const { name } = req.params;
  logger.info(`Getting pokemon translation for name ${name}`);
  pokemonService
    .translatePokemonDetails(name)
    .then((data) => {
      logger.info(`Successfully translated pokemon data for ${name}`);
      res.json(data);
    })
    .catch((err) => {
      const { status } = err.response;
      const { message } = err;
      logger.info(`Failed to translate pokemon details for name ${name}`);
      res.status(status).json(errorResponse(name, message, status));
    });
});

module.exports = router;
