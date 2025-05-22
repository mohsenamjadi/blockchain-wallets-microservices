import { Injectable } from '@nestjs/common';
import * as TronWeb from 'tronweb';

@Injectable()
export class BlockchainWalletsService {

    constructor(
        // private readonly transactionRepository: TransactionRepository,
        // private readonly usersRepository: UsersRepository,
        // private readonly configService: ConfigService,
        // private readonly apiKeyService: ApiKeyService
      ) {}
    
      
      
    
      async createTestNetTronWebObject(){ 
        const tronWeb = new TronWeb({
            fullHost: 'https://nile.trongrid.io',
            headers: { "TRON-PRO-API-KEY": '7cd84aa2-d5cd-427f-ab87-0c516503edcc' }
        })
        return tronWeb;
      }
    
      async createMainNetTronWebObject(){ 
        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
            headers: { "TRON-PRO-API-KEY": '7cd84aa2-d5cd-427f-ab87-0c516503edcc' }
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
