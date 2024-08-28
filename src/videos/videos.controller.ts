import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express'
import { VideosService } from './videos.service';
import { Video } from '@prisma/client';
import { CreateVideoDto } from './dto/create-video.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CloudflareR2Service } from 'src/cloudflare-r2/cloudflare-r2.service';

@ApiTags('3. Videos - វីដេអូ')
@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly cloudFlareR2Service: CloudflareR2Service  
  ) {}


  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(@UploadedFile() file: Express.Multer.File){
    const key = `videos/${file.originalname}`
    const url = await this.cloudFlareR2Service.uploadFile(file,key)

    return { url}
  }

  @Get()
  async getAllVideos() {
    return await this.videosService.getAllVideos();
  }

  @Get(':id')
  async getVideoById(@Param('id') id: string): Promise<Video | null> {
    return await this.videosService.getVideoById(id);
  }


  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: CreateVideoDto): Promise<Video> {
    return await this.videosService.create(dto);
  }
}
