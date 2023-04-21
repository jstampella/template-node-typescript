import { createLogger, format, transports } from 'winston';
import moment from 'moment-timezone';

// Obtiene la zona horaria del servidor
const serverTimezone = moment.tz.guess();

// Función para la configuración de timestamp
const getTimestampConfig = () => {
  return timestamp({
    format: () => moment().tz(serverTimezone).format(),
  });
};

const { combine, timestamp, printf } = format;

// Define el formato de registro para los mensajes de registro
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] - ${message}`;
});

// Crea un objeto de configuración para cada entorno
const developmentConfig = {
  level: 'debug',
  format: combine(getTimestampConfig(), logFormat),
  transports: [new transports.Console()],
};

const stagingConfig = {
  level: 'info',
  format: combine(getTimestampConfig(), logFormat),
  transports: [new transports.File({ filename: 'logs/testing.log' })],
};

const productionConfig = {
  level: 'error',
  format: combine(getTimestampConfig(), logFormat),
  transports: [new transports.File({ filename: 'logs/error.log' }), new transports.File({ filename: 'logs/combined.log' })],
};

// Selecciona la configuración según el entorno actual
let loggerConfig;
if (process.env.NODE_ENV === 'production') {
  loggerConfig = productionConfig;
} else if (process.env.NODE_ENV === 'testing') {
  loggerConfig = stagingConfig;
} else {
  loggerConfig = developmentConfig;
}

// Crea un nuevo logger con la configuración seleccionada
const logger = createLogger(loggerConfig);

export default logger;
