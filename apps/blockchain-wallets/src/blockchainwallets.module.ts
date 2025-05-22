import { BlockchainWalletsController } from './blockchainwallets.controller';
import { BlockchainWalletsService } from './blockchainwallets.service';
import { Module, Scope } from '@nestjs/common';
import { AUTH_SERVICE, DatabaseModule, LoggerModule, LoggingInterceptor, UserDocument, UserSchema, UsersRepository } from '@app/common';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        KAFKA_HOST: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        TRON_PRO_API_KEY: Joi.string().required(),
      }),
      envFilePath: './apps/blockchain-wallets/.env',
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]), 
  ],
  controllers: [BlockchainWalletsController],
  providers: [
    BlockchainWalletsService,
    UsersRepository
  ],
})
export class BlockchainWalletsModule {}
