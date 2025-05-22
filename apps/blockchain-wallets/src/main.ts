import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BlockchainWalletsModule } from './blockchainwallets.module';

async function bootstrap() {
  const app = await NestFactory.create(BlockchainWalletsModule);
  const configService = app.get(ConfigService);
  const KAFKA_HOST = configService.get<string>('KAFKA_HOST');
  app.connectMicroservice({
    transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [KAFKA_HOST],
        },
        consumer: {
          groupId: 'blockchainwallets-consumer',
        },
      },
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Blockchain Wallets Microservice')
    .setDescription('Payment & Wallets APIs')
    .setVersion('1.0')
    .addTag('wallets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('walletsSwagger', app, document);

  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
