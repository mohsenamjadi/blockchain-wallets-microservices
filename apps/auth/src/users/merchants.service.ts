import { Injectable } from '@nestjs/common';
import { ApiKeyService, UserDocument, UserUpdateFields, UsersRepository } from '@app/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MerchantsService {
    constructor(
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
        private readonly apiKeyService: ApiKeyService
    ) {}

    async generateStoreApiKey(user: UserDocument) {
        try {
            if(user.apiKey){
                return { message : "You Already Generated API Key" , statusCode: 409 };
            } else {
                const secretKey = this.configService.get<string>('API_KEY_SECRET_KEY');
                const generatedApiKey = this.apiKeyService.generateApiKey(user, secretKey);
                console.log("generatedApiKey", generatedApiKey);
    
                const updatedFields: UserUpdateFields = {
                    apiKey: generatedApiKey              
                };
            
                const updatedUser = await this.usersService.updateUserFields(user._id.toHexString(), updatedFields);
                console.log("updatedUser", updatedUser);
    
                return updatedUser;
            }
        } catch (error) {
            console.log("error in generateStoreApiKey", error);
        } 
    }

    
}
