import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './config/app.config';
import { ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      dismissDefaultMessages: false,
      validationError: {
        target: true,
        value: true,
      },
      whitelist: true,
    }),
  );
  const applicationConfig = app.get<ConfigType<typeof appConfig>>(
    appConfig.KEY,
  );
  const logger = new Logger('bootstrap');

  const config = new DocumentBuilder()
    .setTitle('Proximity Service')
    .setDescription(
      'Simple proximity service based on either geohash or quadtree',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(applicationConfig.port ?? 3000);

  logger.debug(`Application listening on port ${applicationConfig.port}`);
}
bootstrap();
