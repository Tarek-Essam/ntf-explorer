import 'dotenv/config';
import { Server } from 'http';
import { appConfig } from '@env';
import { logger } from '@src/utils';
import { appInstancePromise } from './bootstrap';

export const serverPromise: Promise<Server> = appInstancePromise
  .then(async (app) => {
    await app.listen(appConfig.port);
    logger.info(`Listening on ${appConfig.port}`);
    return app.getHttpServer();
  })
  .catch((err) => {
    console.error(`server failed to start`, err);
    process.exit(1);
  });
