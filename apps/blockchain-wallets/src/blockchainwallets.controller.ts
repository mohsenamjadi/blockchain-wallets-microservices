import { CurrentUser, JwtAuthGuard, UserDocument } from '@app/common';
import { BlockchainWalletsService } from './blockchainwallets.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';


@Controller("blockchainWalletsMicroservice/wallets")
export class BlockchainWalletsController {
  constructor(private readonly BlockchainWalletsService: BlockchainWalletsService) {}


  @UseGuards(JwtAuthGuard)
  @Get("createTestNetWallet")
  async handleTestNetTronWalletCreation(@CurrentUser() user: UserDocument,) {
    const wallet = await this.BlockchainWalletsService.handleTestNetTronWalletCreation(user);
    return {
      message: "Tron Wallet Created Successfully in Testnet",
      wallet: wallet
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("createMainNetWallet")
  async handleMainNetTronWalletCreation(@CurrentUser() user: UserDocument,) {
    const wallet = await this.BlockchainWalletsService.handleMainNetTronWalletCreation(user);
    return {
      message: "Tron Wallet Created Successfully in Mainnet",
      wallet: wallet
    }
  }


}
