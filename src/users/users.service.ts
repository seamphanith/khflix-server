import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email: email },
      include: { profile: true },
    });
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      password: await hash(dto.password),
    };
    return await this.prismaService.user.create({ data: user });
  }

  async update(id: string, dto: AuthDto){
    return await this.prismaService.user.update({
      data: dto,
      where: {id}
    })
  }

  async delete(id: string){
    return await this.prismaService.user.delete({
      where:{
        id
      }
    })
  }
}
