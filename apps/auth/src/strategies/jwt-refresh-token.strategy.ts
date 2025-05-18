import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../interfaces/token-payload.interface';


@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    configService: ConfigService, 
    private readonly authService: AuthService
    ) {
    super({
        // jwtFromRequest: ExtractJwt.fromExtractors([
        //     (request: any) => 
        //         request?.cookies?.RefreshToken
        // ]),
        jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
        secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
        passReqToCallback: true,
    });
  }

  async validate(request: Request, { userId }:TokenPayload) {
    const refreshToken = request.body.refreshToken;
    return await this.authService.refreshTokenValidator(userId, refreshToken);
  }
}
