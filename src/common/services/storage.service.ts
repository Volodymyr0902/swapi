import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const region: string = this.configService.getOrThrow<string>('AWS_REGION')
    const accessKeyId: string = this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID')
    const secretAccessKey: string = this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY')

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
  }

  async upload(file: Express.Multer.File, key: string): Promise<void> {
    const params: PutObjectCommandInput = {
      Bucket: this.configService.get<string>('AWS_BUCKET'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const putCommand: PutObjectCommand = new PutObjectCommand(params);
    await this.s3Client.send(putCommand);
  }

  download(key: string): Promise<GetObjectCommandOutput> {
    const params: GetObjectCommandInput = {
      Bucket: this.configService.get<string>('AWS_BUCKET'),
      Key: key,
    };

    const getCommand: GetObjectCommand = new GetObjectCommand(params);
    return this.s3Client.send(getCommand);
  }

  async drop(key: string): Promise<void> {
    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET'),
      Key: key,
    };

    const deleteCommand: DeleteObjectCommand = new DeleteObjectCommand(params);
    await this.s3Client.send(deleteCommand);
  }
}
