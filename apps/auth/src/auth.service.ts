import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UsersService } from './users/users.service';
import { CreateRefreshTokenData } from './dto/create-refresh-token.event';
import { UserDto, UserUpdateFields } from '@app/common';
import { CreateUserData } from './users/dto/create-user.event';
import { CreateUserDto } from './users/dto/create-user.dto';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';
import { ClientProxy } from '@nestjs/microservices';



@Injectable()
export class AuthService {
  
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: UserDto, response: Response) {
    
    const { token, newRefreshToken, 
      accessTokenExpires, refreshTokenExpires } = await this.generateTokens(user._id);
    
    const createRefreshTokenData = 
      new CreateRefreshTokenData(new mongoose.Types.ObjectId(user._id), newRefreshToken, refreshTokenExpires );
      
    await this.usersService.deleteOldRefreshTokensForUser(new mongoose.Types.ObjectId(user._id));

    await this.usersService.storeRefreshTokenForUser(createRefreshTokenData);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: accessTokenExpires
    });

    response.cookie('RefreshToken', newRefreshToken, {
      httpOnly: true,
      expires: refreshTokenExpires,
    });

    return { token, newRefreshToken };

  }

  async signup(user: CreateUserDto, response: Response) {

    const date = new Date();
    
    console.log("createUserDto", user);

    const roles = ["merchant"];

    const createUserData = new CreateUserData( 
          date, 
          date, 
          user.email, 
          user.username, 
          user.password, 
          roles,  
      );

    console.log("user createUserData", createUserData);

    const userCreated = await this.usersService.create(createUserData);  

    console.log("userCreated", userCreated);

    const { token, newRefreshToken, 
      accessTokenExpires, refreshTokenExpires } = await this.generateTokens(userCreated._id.toHexString());

    const createRefreshTokenData = 
      new CreateRefreshTokenData(userCreated._id, newRefreshToken, refreshTokenExpires );

    await this.usersService.storeRefreshTokenForUser(createRefreshTokenData);


    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: accessTokenExpires
    });

    response.cookie('RefreshToken', newRefreshToken, {
      httpOnly: true,
      expires: refreshTokenExpires,
    });

    return { token, newRefreshToken, userCreated };

  }
  
  async refreshTokenValidator(userId: string, refreshToken: string) {

    try{

      const refreshTokenData = await this.usersService.getRefreshTokenData(refreshToken);

      if( !refreshTokenData || refreshTokenData.refreshTokenExpiresAt <= new Date() ) {
        throw new UnauthorizedException("Refresh Token is invalid");
      }
      
      const { token, newRefreshToken, 
        accessTokenExpires, refreshTokenExpires } = await this.generateTokens(userId);
      
      const createRefreshTokenData = 
        new CreateRefreshTokenData(refreshTokenData.user, newRefreshToken, refreshTokenExpires );
       
      await this.usersService.deleteOldRefreshTokensForUser(refreshTokenData.user);
      
      await this.usersService.storeRefreshTokenForUser(createRefreshTokenData);

    
      return { accessToken: token, newRefreshToken, accessTokenExpires, refreshTokenExpires };
      
    } catch (error) {
      console.log("refreshTokenValidator Function", error );
      throw new InternalServerErrorException(`Unable to generate new tokens, error: ${error}`);
    }
  }


  async generateTokens(userId: string): 
    Promise<{ token: string; newRefreshToken: string; accessTokenExpires: Date; refreshTokenExpires: Date; }> {
    
    const tokenPayload: TokenPayload = {
      userId,
    };

    const accessTokenExpires = new Date();
    accessTokenExpires.setSeconds(accessTokenExpires.getSeconds() + this.configService.get('JWT_EXPIRATION'));

    const refreshTokenExpires = new Date();
    refreshTokenExpires.setSeconds(
      refreshTokenExpires.getSeconds() + this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION')
    );

    const token = await this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: `${this.configService.get('JWT_EXPIRATION')}s`,
      
    });
    
    const newRefreshToken = await this.jwtService.signAsync(tokenPayload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION')}s`,
    });

    return { token, newRefreshToken, accessTokenExpires, refreshTokenExpires };
  }

  private calculateExpirationDate(): Date {
    const now = new Date();
    const expirationTimeInHours = 1;
    const expirationDate = new Date(now.getTime() + expirationTimeInHours * 60 * 60 * 1000);

    return expirationDate;
  }

  private generateRandomString(length: number): string {
    return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }
    

}
