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

  @ApiProperty({
    type: String,
    format: 'phoneNumber',
    description: 'The phoneNumber of the user.',
    example: '+12083417963',
  })
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    format: 'name',
    description: 'firstName of the user.',
    example: 'Mohsen',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    format: 'password',
    description: 'lastName of the user.',
    example: 'Amjadi',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The picture of the user.',
    example: 'https://lh3.googleusercontent.com/a/ACg8ocKMf6AztCnsvBoHkdQkH74Lf3Sm2_aIP6g7qksra2fsI1k=s96-c',
  })
  @IsString()
  @IsOptional()
  picture: string;

  @ApiProperty({
    type: String,
    format: 'string',
    description: 'The companyName of the user.',
    example: 'test',
  })
  @IsString()
  @IsOptional()
  companyName: string;

  @ApiProperty({
      type: String,
      format: 'string',
      description: 'The Description of the company.',
      example: 'test',
  })
  @IsString()
  @IsOptional()
  companyDescription: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'The age of the user.',
    example: 25,
  })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiPropertyOptional({
    type: String,
    description: 'The country of the user.',
    example: 'United States',
  })
  @IsString()
  @IsOptional()
  country: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The city of the user.',
    example: 'New York',
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    type: String,
    description: 'The postalCode of the user.',
    example: '2446',
  })
  @IsString()
  @IsOptional()
  postalCode: string;
}
