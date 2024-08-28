import { IsEmail, IsString, MinLength } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'
import { UserDto } from './user.dto';

export class UpdateUserDto extends UserDto {

  @ApiProperty({
    description: 'សូមបញ្ចួលអ៊ីម៉ែលរបស់លោកអ្នក!',
    required: true,
    example: 'phaniths@gmail.com'
  })
  @IsString()
  @IsEmail()
  email: string;
}
