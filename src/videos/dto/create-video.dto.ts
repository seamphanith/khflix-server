import { IsNotEmpty, IsString } from 'class-validator';
import { VideoEntity } from './video.entity';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto extends PartialType(VideoEntity) {
  @ApiProperty({
    example:'ចំណងជើងវីឌឺអូ',
    description: 'សំរាប់ដាក់ចំណងជើងវីដែអូ',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description:'ការពិពណ៌នាអំពីវិដែអូ'
  })
  description: string;

  @ApiProperty({
    description:'តំណភ្ជាប់ទៅកាន់ File​ វីដែអូ',
    example: 'https://storage.khflix.com/video.mp4'
  })
  url: string;

  @ApiProperty({
    description:'តំណភ្ជាប់ទៅកាន់ File​ វីដែអូជប្រភេទ .m3u8',
    example: 'https://storage.khflix.com/video.m3u8'
  })
  m3u8Url: string;

  @ApiProperty({
    description:'តំណភ្ជាប់ទៅកាន់ File​ រូបភាពរបស់វិដែអូ',
    example: 'https://storage.khflix.com/thumbnail.jpeg'
  })
  thumbnail: string;

  @ApiProperty({
    description:'ជាលេខសំគាល់របស់ប្រភេទវិដែអូ ឧទាហរណ៏ រឿងភាគ រឿងខ្លី...',
    example: 'ck24kl23j4l324h32l'
  })
  categoryId: string;

  @ApiProperty({
    description:'ជាលេខសំគាល់របស់ប្រភេទរឿងភាគ',
    example: 'ck24kl23j4l324h32l'
  })
  seriesId: string;
}
