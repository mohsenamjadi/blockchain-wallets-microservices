import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser, UserDocument } from '@app/common';
import { UpdateUserDto } from './dto/update-user.dto';


@ApiTags('users')
@Controller('authMicroservice/users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
    
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

  
}
