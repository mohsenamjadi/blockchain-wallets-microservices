import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    description: 'The refresh token.',
    example: 'your_refresh_token_here',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
