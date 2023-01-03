import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from '@src/env';

export function configureSwagger(app: INestApplication) {
  if (!appConfig.isDev) return;
  const config = new DocumentBuilder()
    .setTitle('NFT Explorer')
    .setDescription('APIs to help explore the nft tokens owners & account balances')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
