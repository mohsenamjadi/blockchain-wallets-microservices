import { Module } from '@nestjs/common';
import { BlockchainWalletsController } from './blockchainwallets.controller';
import { BlockchainWalletsService } from './blockchainwallets.service';

@Module({
  imports: [],
  controllers: [BlockchainWalletsController],
  providers: [BlockchainWalletsService],
})
export class BlockchainWalletsModule {}
