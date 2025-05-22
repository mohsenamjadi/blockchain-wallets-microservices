import { UserDocument, UsersRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TronWeb from 'tronweb';

@Injectable()
export class BlockchainWalletsService {

    constructor(
        // private readonly transactionRepository: TransactionRepository,
        private readonly usersRepository: UsersRepository,
        private readonly configService: ConfigService,
        // private readonly apiKeyService: ApiKeyService
      ) {}
    
      async handleTestNetTronWalletCreation(user: UserDocument,){
        const wallet = await this.generateTestNetWallet();
        return wallet;
      }

      async handleMainNetTronWalletCreation(user: UserDocument,){
        const wallet = await this.generateMainNetWallet();
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
