const winston = require('winston');
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: 'combined.log' })
    ]
});

// Define a stream property on the logger for morgan to use
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

module.exports = logger;
