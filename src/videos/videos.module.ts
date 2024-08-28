import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PrismaService } from 'src/prisma.service';
import { CloudflareR2Service } from 'src/cloudflare-r2/cloudflare-r2.service';

@Module({
  controllers: [VideosController],
  providers: [VideosService, PrismaService, CloudflareR2Service],
})
export class VideosModule {}
