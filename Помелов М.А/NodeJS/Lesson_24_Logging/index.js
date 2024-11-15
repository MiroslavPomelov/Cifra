const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} [${level}]: ${message}`
});

const logger = createLogger({
    format: combine(timestamp(), logFormat),
    // transports: new transports.Console()
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logs.log'})
    ]
});

logger.info('Additional info');
logger.warn('This is a notice!');
logger.error('This is error');
