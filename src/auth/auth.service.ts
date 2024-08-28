import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const oldUser = await this.userService.findByEmail(dto.email);
    if (oldUser) throw new BadRequestException('This email already used');

    const user = await this.userService.create(dto);
    const tokens = await this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    try {
      await this.jwt.verifyAsync(refreshToken);
    } catch(err) {
      throw new UnauthorizedException(err.message)
    }
    const result = await this.jwt.verifyAsync(refreshToken);
    const user = await this.userService.findById(result.id);
    const tokens = await this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, { expiresIn: '1h' });

    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new BadRequestException('Your account does not exist!');
    const isValidPassword = await verify(user.password, dto.password);
    if(!isValidPassword) throw new BadRequestException('You password is incorrect')
    return user;
  }
}
