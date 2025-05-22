import { Module, Scope } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule, LoggingInterceptor } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtStrategy } from './strategies/jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
      }),
      envFilePath: './apps/auth/.env',
    }), 
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
          // signOptions: {
          //   expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
          // },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LocalStrategy, 
    jwtStrategy,
    JwtRefreshTokenStrategy,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor
    },
  ],
})
export class AuthModule {}
