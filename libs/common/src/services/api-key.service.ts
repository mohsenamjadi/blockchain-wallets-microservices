import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from '@app/common';

@Injectable()
export class ApiKeyService {
    constructor(private readonly configService: ConfigService) {}

    private readonly algorithm = 'aes-256-cbc';

    encrypt(text: string, secretK: string): string {
        const iv = crypto.randomBytes(16);
        const secretKeyString = secretK;
        const secretKey = Buffer.from(secretKeyString, 'hex'); 
        // const secretKey = Buffer.from(this.configService.get<string>('API_KEY_SECRET_KEY'), 'hex');
        console.log("secretKey", secretKey);
        const cipher = crypto.createCipheriv(this.algorithm, secretKey, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;
    }


    decrypt(text: string, secretK: string): string {
        try {
            const [ivString, encryptedData] = text.split(':');
            if (!ivString || !encryptedData) {
                throw new Error('Invalid input format. Expected IV:encryptedData.');
            }
            const iv = Buffer.from(ivString, 'hex');
            const secretKeyString = secretK;
            if (!secretKeyString) {
                throw new Error('API key secret key is not defined.');
            }
            const secretKey = Buffer.from(secretKeyString, 'hex');       
            const decipher = crypto.createDecipheriv(this.algorithm, secretKey, iv);
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch (error) {
            console.error('Error decrypting text:', error);
            // Handle the error or rethrow it if necessary
            throw error;
        }
    }
    
    generateApiKey(user: UserDocument, secretK: string) {   
        return this.encrypt(user.email, secretK);
    }

    generateSecretKey(user: UserDocument) {   
        const key = crypto.randomBytes(32);
        console.log("key", key);
    }
    
}
