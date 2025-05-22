import { UserDocument, UsersRepository, WalletRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TronWeb from 'tronweb';
import { WalletDocument } from '@app/common';
@Injectable()
export class BlockchainWalletsService {

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly walletRepository: WalletRepository,
        private readonly configService: ConfigService,
      ) {}
    
      async handleTestNetTronWalletCreation(user: UserDocument,){
        const wallet = await this.generateTestNetWallet();
        console.log("wallet", wallet);

        const storedWallet = await this.walletRepository.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            user: user._id,
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
            base58: wallet.address.base58,
            hex: wallet.address.hex,
        });

        console.log("storedWallet", storedWallet);
        
        return wallet;
      }

      async handleMainNetTronWalletCreation(user: UserDocument,){
        const wallet = await this.generateMainNetWallet();

        const storedWallet = await this.walletRepository.create({
            createdAt: new Date(),
            updatedAt: new Date(),
            user: user._id,
            privateKey: wallet.privateKey,
            publicKey: wallet.publicKey,
            base58: wallet.address.base58,
            hex: wallet.address.hex,
        });

        console.log("storedWallet", storedWallet);

        return wallet;
      }
      
    
      async createTestNetTronWebObject(){ 
        const tronWeb = new TronWeb({
            fullHost: 'https://nile.trongrid.io',
            headers: { "TRON-PRO-API-KEY": this.configService.get('TRON_PRO_API_KEY') }
        })
        return tronWeb;
      }
    
      async createMainNetTronWebObject(){ 
        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
            headers: { "TRON-PRO-API-KEY": this.configService.get('TRON_PRO_API_KEY') }
        })
        return tronWeb;
      }
    
      
      async generateTestNetWallet(){
        const tronWeb = await this.createTestNetTronWebObject();
        const wallet = tronWeb.createAccount();
        return wallet;
      }
    
      async generateMainNetWallet(){
        const tronWeb = await this.createMainNetTronWebObject();
        const wallet = tronWeb.createAccount();
        return wallet;
      }
    
}
