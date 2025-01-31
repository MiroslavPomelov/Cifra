
import * as path from 'path';
import { transports, format, createLogger } from 'winston';

const getCallerInfo = (): { file: string, line: number } => {
    const error = new Error();
    const stackLines = error.stack?.split('\n') || [];
    // третья строка -  информация о том, где была вызвана ошибка
    const callerLine = stackLines[3];
  
    if (!callerLine) {
        return { file: 'unknown', line: 0 }
    }
    
    const match = callerLine.match(/at (.*):(\d+):\d+\)?$/); // Регулярное выражение для определения местоположения в стеке
     if(match) {
        const filePath = match[1];
        const lineNumber = parseInt(match[2], 10);
  
        return {
            file: path.basename(filePath), // Получение имени файла
            line: lineNumber,
        }
    }
  
    return { file: 'unknown', line: 0 };
}

const logFormat = format.combine(    
    format.timestamp(),
    format.printf(({ level, message, timestamp, metadata }) => {        
      return `${timestamp} [${level.toUpperCase()}] ${metadata} - ${message}`;
     }),
    );

export const logger = createLogger({
    levels: {
        error: 0, warn: 1, info: 2,
        http: 3, verbose: 4, debug: 5,
        silly: 6
        },
    format:logFormat,
    transports: [
    new transports.Console({
    level: 'debug' // Устанавливаем уровень для консоли
    }),
    new transports.File({
    filename: 'logging.log',
    level: 'debug' // Устанавливаем уровень для файла
    })
    ]
});

export const log = (level: string, message: string, meta?: Record<string, any>) => { const callerInfo = getCallerInfo(); logger.log(level, message, {...meta ,...callerInfo }) }; 

export const error = (message: string, meta?: Record<string, any>) => {
    log('error', message, meta);
};

export const info = (message: string, meta?: Record<string, any>) => {
    log('info', message, meta);
}

export const warn = (message: string, meta?: Record<string, any>) => {
    log('warn', message, meta);
}


export const debug = (message: string, meta?: Record<string, any>) => {
    log('debug', message, meta);
}



    
    
