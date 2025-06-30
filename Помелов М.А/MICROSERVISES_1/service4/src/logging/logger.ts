import * as path from 'path';
import { transports, format, createLogger } from 'winston';

export function getCallerInfo(error: Error): string {  ;
  const stackLines = error.stack?.split('\n') || [];
  // третья строка -  информация о том, где была вызвана ошибка
  const callerLine = stackLines[3];

  if (!callerLine) return "[at file: 'unknown', line: 0 ]";

  const match = callerLine.match(/at (.*):(\d+):\d+\)?$/); // Регулярное выражение для определения местоположения в стеке
  if (match) {
    const filePath = match[1];
    const lineNumber = parseInt(match[2], 10);    
    return `[at file: ${path.basename(filePath)}, line: ${lineNumber} ]`;
  }

  return "[at file: 'unknown', line: 0 ]";
};

const logFormat = format.combine(  
  format.timestamp(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message}`;
  }),
);

export const logger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  format: logFormat,
  transports: [
    new transports.Console({
      level: 'debug', // Устанавливаем уровень для консоли
    }),
    new transports.File({
      filename: 'logging.log',
      level: 'debug', // Устанавливаем уровень для файла
    }),
  ],
});




