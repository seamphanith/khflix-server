import { IsEmail, IsString, MinLength } from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class UserDto {

  @ApiProperty({
    description: 'សូមបញ្ចួលអ៊ីម៉ែលរបស់លោកអ្នក!',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'សូមបញ្ចួលពាក្យសំងាត់របស់លោកអ្នក!'
  })
  @MinLength(6, {
    message: 'Your password must min length 6 char!',
  })
  @IsString()
  password: string;
}
