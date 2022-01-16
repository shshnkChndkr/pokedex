const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const Logger = require('./logger/logger');

const pokemonRouter = require('./routes/pokemonRoute');

const logger = Logger.getLogger('./app.js');

const {
  RATE_LIMIT_THRESHOLD_ENTRY_ROUTE = 50, // 50 requests per minute,
  RATE_LIMIT_PERIOD_MS_ENTRY_ROUTE = 1 * 60 * 1000, // 1 minutes
} = process.env;

const limiter = rateLimit({
  windowMs: RATE_LIMIT_PERIOD_MS_ENTRY_ROUTE,
  max: RATE_LIMIT_THRESHOLD_ENTRY_ROUTE,
  message: 'Too many requests, please try again later.',
});

morgan.token('body', (req) => JSON.stringify(req.body));
const app = express();

app.use(morgan('combined', { stream: logger.stream }));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(helmet());

app.use('/pokemon', limiter, pokemonRouter);

logger.info('App started');

module.exports = app;
