import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    format: 'email',
    description: 'The email address of the user.',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    format: 'username',
    description: 'The username of the user.',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    format: 'password',
    description: 'A strong password for the user.',
    example: 'StrongPassword123!',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

}
