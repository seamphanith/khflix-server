import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class CloudflareR2Service {
    private s3Client: S3Client;
    private bucketName;
    constructor(private configService: ConfigService){
        this.s3Client = new S3Client({
            region: this.configService.get('CLOUDFLARE_R2_REGION'),
            credentials: {
                accessKeyId: this.configService.get('CLOUDFLARE_R2_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('CLOUDFLARE_R2_SECRET_ACCESS_KEY'),
            },
            endpoint: this.configService.get('CLOUDFLARE_R2_ENDPOINT')
        })

        this.bucketName = this.configService.get('CLOUDFLARE_R2_BUCKET_NAME')
    }

    async uploadFile(@UploadedFile() file: Express.Multer.File, key: string): Promise<string>{
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            });

            await this.s3Client.send(command)

            return `https://${this.bucketName}.${this.configService.get('CLOUDFLARE_R2_ENDPOINT')}/${key}`
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async getFile(key: string): Promise<Readable> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: key
            })

            const response = await this.s3Client.send(command)
            return response.Body as Readable

        } catch(err){
            throw new InternalServerErrorException('Error retrieving file from Cloudflare R2')
        }
    }
}
