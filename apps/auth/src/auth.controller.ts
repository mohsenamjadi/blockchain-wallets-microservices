import { 
  Body, Controller, Get, HttpCode, 
  HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response, Request } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CurrentUser, UserDto } from '@app/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CreateUserDto } from './users/dto/create-user.dto';
import JwtRefreshGuard from './guards/jwt-refresh.guard';


@ApiTags('auth')
@Controller('authMicroservice/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Sign-In' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'test@example.com' },
        password: { type: 'string', example: 'Strongpassword123!' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sign-In the user and get tokens',
    headers: {
      'Authentication': {
        description: 'JWT access token as cookie',
        schema: { type: 'string' },
      },
      'RefreshToken': {
        description: 'JWT refresh token as cookie',
        schema: { type: 'string' },
      },
    },
  })
  async login (
    @CurrentUser() user: UserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { token, newRefreshToken } = await this.authService.login(user, response);
    response.send({ user, token, newRefreshToken });
  }


  @Post('signup')
  @ApiOperation({ summary: 'Sign-Up' })
  @ApiBody({ type: CreateUserDto }) 
  @ApiResponse({
    status: 201,
    description: 'Sign-Up the user and get tokens',
    headers: {
      'Authentication': {
        description: 'JWT access token as cookie',
        schema: { type: 'string' },
      },
      'RefreshToken': {
        description: 'JWT refresh token as cookie',
        schema: { type: 'string' },
      },
    },
  })
  async signup (
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.signup(user, response);
  }


  @Post('refreshToken')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh JWT tokens using a refresh token' })
  @ApiBody({ type: RefreshTokenDto }) 
  @ApiResponse({
    status: 200,
    description: 'Get new access token and refresh token',
    headers: {
      'Authentication': {
        description: 'JWT access token as cookie',
        schema: { type: 'string' },
      },
      'RefreshToken': {
        description: 'JWT refresh token as cookie',
        schema: { type: 'string' },
      },
    },
  })
  async refreshToken( 
    @Req() req, 
    @Res({ passthrough: true }) response: Response
  ) {
    const { accessToken, newRefreshToken, accessTokenExpires, refreshTokenExpires } = req.user;
 
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires: accessTokenExpires
    });

    response.cookie('RefreshToken', newRefreshToken, {
      httpOnly: true,
      expires: refreshTokenExpires,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(
    @Payload() data: any
  ) {
    return data.user;
  }
  
}
