import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { TokenPayload } from "../interfaces/token-payload.interface";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => 
                    request?.cookies?.Authentication || 
                    request?.headers.authentication ||
                    request?.Authentication, 
            ]),
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate({ userId }:TokenPayload ) {
        return this.usersService.getUser({ _id: userId });
    }
}
