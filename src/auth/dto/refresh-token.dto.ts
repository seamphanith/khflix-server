import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {

  @ApiProperty({
    example: 'f2k231hk12.231kn23hj1$1323',
  })
  @IsString({
    message: 'You must provide refresh token to authorize',
  })
  refreshToken: string;
}
