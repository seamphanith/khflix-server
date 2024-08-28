import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {ApiOkResponse, ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger'
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags("1. Auth - សិទ្ធិ")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'សំរាប់ធ្វើការចុះឈ្មោះប្រើប្រាស់'
  })
  @ApiOkResponse({
    description: 'ការចុះឈ្មោះរបស់លោកអ្នកទទួលបានជោគជ័យ'
  })
  @UsePipes(new ValidationPipe())
  @Post('register')
  @HttpCode(200)
  async register(@Body() dto: AuthDto) {
    return await this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'សំរាប់ធ្វើការចូលប្រើប្រាស់'
  })
  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({
    summary: 'សំរាប់ធ្វើការស្នើរសុំពាក្យសំងាត់ថ្មី'
  })
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  @Post('login/access-token')
  @HttpCode(HttpStatus.CREATED)
  async getNewToken(@Body() dto: RefreshTokenDto) {
    return await this.authService.getNewTokens(dto.refreshToken);
  }
}
