import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { appConfig } from '@env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(appConfig.port);
}
bootstrap();
