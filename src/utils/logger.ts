import morgan from 'morgan';
import { INestApplication } from '@nestjs/common';
import winston, { format } from 'winston';
import { appConfig } from '@src/env';

const { combine, timestamp, prettyPrint, colorize } = format;

export function configureHttpLogger(app: INestApplication) {
  app.use(
    morgan(
      ':date[iso] :remote-addr - :remote-user ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"',
    ),
  );
}

export const logger = winston.createLogger({
  format: combine(prettyPrint(), timestamp(), colorize({ all: true })),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (!appConfig.isProduction) {
  logger.add(new winston.transports.Console());
}
