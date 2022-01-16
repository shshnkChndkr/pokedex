const winston = require('winston');
const appRoot = require('app-root-path');
require('events').EventEmitter.defaultMaxListeners = 40;

const loggers = {};
const SPLAT = Symbol.for('splat');
// padding in log messages
const padding = '                                                 ';

const formatter = (name) => winston.format.combine(
  winston.format.timestamp(),
  winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label', 'stack'] }),
  winston.format.colorize(),
  winston.format.errors({ stack: true }),
  winston.format.padLevels(),
  winston.format.printf((info) => {
    const {
      timestamp, level, message, stack,
    } = info;
    const str = (`[filename: ${name}]${padding}`).substring(0, padding.length);
    let out = '';
    if (info[SPLAT]) {
      out = info[SPLAT].map((e) => {
        if (e && e.error) {
          if (e.error.stack) {
            return e.error.stack;
          }
          return e.error.message;
        }
        return e;
      });
    }
    return `${timestamp} ${level} ${str} ${message} ${out} ${stack || ''}`;
  }),
);

let transport;
const getTransport = () => {
  if (!transport) {
    transport = [
      new winston.transports.Console({
        handleExceptions: true,
        timestamp: true,
        json: false,
        colorize: true,
      }),
      new winston.transports.File({
        timestamp: true,
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      }),
    ];
  }
  return transport;
};

function createLogger(logLevel, name) {
  const logger = winston.createLogger({
    level: logLevel,
    format: formatter(name),
    transports:
      getTransport(),
    exitOnError: false,
  });

  logger.stream = {
    write(message) {
      logger.info(message);
    },
  };
  return logger;
}

const levelMapping = (level) => {
  let logLevel = 'info';
  if (typeof level === 'string') {
    switch (level.toUpperCase()) {
      case 'CRITICAL':
        logLevel = 'fatal';
        break;
      case 'ERROR':
        logLevel = 'error';
        break;
      case 'WARNING':
        logLevel = 'warn';
        break;
      case 'DEBUG':
        logLevel = 'debug';
        break;
      case 'INFO':
        logLevel = 'info';
        break;
      default:
        logLevel = 'debug';
        break;
    }
  }
  return logLevel;
};

const getLoggingLevel = () => {
  switch (process.env.ENVIRONMENT) {
    case 'development': return 'debug';
    case 'production': return 'info';
    case 'test': { return 'error'; }
    default: return 'ERROR';
  }
};

module.exports.getLogger = (name = '') => {
  const logLevel = getLoggingLevel();
  let logger;
  if (loggers[name]) {
    logger = loggers[name];
    logger.level = logLevel;
  } else {
    logger = createLogger(logLevel, name);
    loggers[name] = logger;
  }

  return logger;
};

function firstTime() {
  if (!loggers._) {
    const logLevel = levelMapping(process.env.LOGGING_LEVEL);
    loggers._ = winston.createLogger({
      level: logLevel,
      format: formatter('_'),
      transports: getTransport(),
      exitOnError: false,
    });
  }
}
firstTime();
