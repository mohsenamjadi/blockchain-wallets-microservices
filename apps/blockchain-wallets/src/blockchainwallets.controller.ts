import { BlockchainWalletsService } from './blockchainwallets.service';
import { Body, Controller, Get, Post } from '@nestjs/common';


@Controller("blockchainWalletsMicroservice/wallets")
export class BlockchainWalletsController {
  constructor(private readonly BlockchainWalletsService: BlockchainWalletsService) {}


  @Post("testNetOpenGateway")
  async handleTestNetTronWalletCreation() {
    const wallet = await this.BlockchainWalletsService.handleTestNetTronWalletCreation();
    return {
      message: "Tron Wallet Created Successfully in Testnet",
      wallet: wallet
    }
  }

  @Post("mainNetOpenGateway")
  async handleMainNetTronWalletCreation() {
    const wallet = await this.BlockchainWalletsService.handleMainNetTronWalletCreation();
    return {
      message: "Tron Wallet Created Successfully in Mainnet",
      wallet: wallet
    }
  }


}
