import { BlockchainWalletsController } from './blockchainwallets.controller';
import { BlockchainWalletsService } from './blockchainwallets.service';
import { Module, Scope } from '@nestjs/common';
import { AUTH_SERVICE, DatabaseModule, LoggerModule, LoggingInterceptor, UserDocument, UserSchema, UsersRepository, WalletDocument, WalletRepository, WalletSchema } from '@app/common';
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
      { name: WalletDocument.name, schema: WalletSchema },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        TRON_PRO_API_KEY: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
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
    UsersRepository,
    WalletRepository,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor
    },
  ],
})
export class BlockchainWalletsModule {}
