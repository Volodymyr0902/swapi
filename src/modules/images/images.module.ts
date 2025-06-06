import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from '../../common/services/storage.service';

@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    TypeOrmModule.forFeature([Image]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, StorageService],
})
export class ImagesModule {}
