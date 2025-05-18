import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiKeyService, CurrentUser, UserDocument } from '@app/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { MerchantsService } from './merchants.service';


@ApiTags('users')
@Controller('cpgAuth/users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    private readonly merchantsService: MerchantsService
    
    ) {}

  @Get()
  @ApiOperation({ summary: 'Get the current user' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Returns the current user', type: UserDocument })
  async getUser(@CurrentUser() user: UserDocument): Promise<UserDocument> {
    return user;
  }

  @Get('getAllUsers')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of all books',
    type: [UserDocument], 
  })
  async getAllUsers(@CurrentUser() user: UserDocument) {
    return this.usersService.getAllUsers();
  }



  @Patch('updateProfile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Profile' })
  @ApiBody({ type: UpdateUserDto }) 
  @ApiResponse({
    status: 201,
    description: 'Update the user profile',
  })
  async updateProfile (
    @Body() updatedUser: UpdateUserDto,
    @CurrentUser() user: UserDocument
  ) {
    return await this.usersService.updateProfile(updatedUser, user);
  }


  @Get('generateAPIKEY')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Generate API Key For Merchant' })
  @ApiResponse({
    status: 201,
    description: 'The Generated API Key will be returned',
  })
  async generateAPIKEY (
    @CurrentUser() user: UserDocument
  ) {
    return this.merchantsService.generateStoreApiKey(user);
  }


  // @Post('decrypt')
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: 'decrypt' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'decrypt',
  // })
  // async decrypt (
  //   @Body() body
  // ) {
  //   return this.apiKeyService.decrypt(body.decrypt);
  // }
  
}
