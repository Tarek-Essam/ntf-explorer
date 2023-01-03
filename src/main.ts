import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from '@env';
import { configureHttpLogger, logger, configureSwagger } from '@src/utils';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AllExceptionsFilter } from '@src/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({ type: VersioningType.URI });

  configureHttpLogger(app);

  configureSwagger(app);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      errorHttpStatusCode: 422,
      stopAtFirstError: false,
      enableDebugMessages: true,
      transformOptions: { enableImplicitConversion: true, exposeDefaultValues: true },
    }),
  );

  await app.listen(appConfig.port);

  logger.info(`server is listening on port ${appConfig.port}`);
}

bootstrap();
