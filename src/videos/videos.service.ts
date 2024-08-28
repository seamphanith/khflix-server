import { Injectable } from '@nestjs/common';
import { Series, Video } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideosService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllVideos(): Promise<Video[]> {
    return await this.prismaService.video.findMany({
      include: {
        series: true,
      },
    });
  }

  async getVideoById(id: string): Promise<Video | null> {
    return await this.prismaService.video.findUnique({
      where: {
        id,
      },
      include: {
        series: true,
      },
    });
  }

  async create(dto: CreateVideoDto): Promise<Video> {
    return await this.prismaService.video.create({
      data: dto,
    });
  }

  async getSeriesWithEpisodes(SeriesId: string): Promise<Series | null> {
    return await this.prismaService.series.findUnique({
      where: { id: SeriesId },
      include: {
        episodes: true,
      },
    });
  }
}
