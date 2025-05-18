import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ApiKeyService, DatabaseModule, LoggerModule, UserDocument, UserSchema, UsersRepository } from '@app/common';
import { RefreshTokenRepository } from './refreshtoken.repository';
import { RefreshTokenDocument, RefreshTokenSchema } from './models/refreshtoken.schema';
import { MerchantsService } from './merchants.service';


@Module({
  imports: [ 
    DatabaseModule,
    DatabaseModule.forFeature([
      {name: UserDocument.name, schema: UserSchema },
      {name: RefreshTokenDocument.name, schema: RefreshTokenSchema },
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, RefreshTokenRepository, MerchantsService, ApiKeyService],
  exports: [UsersService]
})
export class UsersModule {}
