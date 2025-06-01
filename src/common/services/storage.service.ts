import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand, DeleteObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { AWSEnvVars } from '../types/env-vars.type';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const { region, credentials }: AWSEnvVars = this.configService.getOrThrow<AWSEnvVars>('aws');

    this.s3Client = new S3Client({ region, credentials });
  }

  async upload(file: Express.Multer.File, key: string): Promise<void> {
    const params: PutObjectCommandInput = {
      Bucket: this.configService.get<string>('aws.bucket'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const putCommand: PutObjectCommand = new PutObjectCommand(params);
    await this.s3Client.send(putCommand);
  }

  download(key: string): Promise<GetObjectCommandOutput> {
    const params: GetObjectCommandInput = {
      Bucket: this.configService.get<string>('aws.bucket'),
      Key: key,
    };

    const getCommand: GetObjectCommand = new GetObjectCommand(params);
    return this.s3Client.send(getCommand);
  }

  async drop(key: string): Promise<void> {
    const params: DeleteObjectCommandInput = {
      Bucket: this.configService.get<string>('aws.bucket'),
      Key: key,
    };

    const deleteCommand: DeleteObjectCommand = new DeleteObjectCommand(params);
    await this.s3Client.send(deleteCommand);
  }
}
