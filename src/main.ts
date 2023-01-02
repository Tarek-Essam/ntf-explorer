import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from '@env';
import { configureHttpLogger, logger, configureSwagger } from '@src/utils';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI });

  configureHttpLogger(app);

  configureSwagger(app);

  await app.listen(appConfig.port);

  logger.info(`server is listening on port ${appConfig.port}`);
}

bootstrap();
