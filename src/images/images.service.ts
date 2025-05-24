import {Injectable, StreamableFile} from '@nestjs/common';
import {CreateImageDto} from './dto/create-image.dto';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Image} from "./entities/image.entity";
import * as fs from "node:fs/promises";
import {createReadStream} from 'fs';
import * as path from "node:path";
import {PaginationDto} from "../common/dto/pagination.dto";
import {lookup} from "mime-types"
import {BINARY_FILE, IMAGES_PATH} from "../common/constants";
import {ConfigService} from "@nestjs/config";
import {AppEnvVars} from "../common/types/env-vars.type";

@Injectable()
export class ImagesService {
    constructor(@InjectRepository(Image) private readonly imagesRepository: Repository<Image>,
                private readonly configService: ConfigService) {}

    async create(file: Express.Multer.File, createImageDto: CreateImageDto) {
        const {entityId, entityName} = createImageDto;
        const fileName = file.originalname

        const destPath = this.composePath(fileName);
        await fs.writeFile(destPath, file.buffer);

        const newImage = this.imagesRepository.create({fileName, [entityName]: entityId})
        const savedImage = await this.imagesRepository.save(newImage);

        const {id} = savedImage;
        const {protocol, host, port} = this.configService.get<AppEnvVars>('app')!;
        const tableName = this.imagesRepository.metadata.tableName
        savedImage.url = `${protocol}://${host}:${port}/${tableName}/${id}`

        return this.imagesRepository.save(savedImage);
    }

    async findAll(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        const skip = page * limit - limit;

        return this.imagesRepository.find({skip, take: limit});
    }

    async findOne(id: number) {
        const imgData = await this.imagesRepository.findOneByOrFail({id});
        const imgPath = this.composePath(imgData.fileName);
        const imgReadStream = createReadStream(imgPath)

        const extName = path.extname(imgPath);
        const baseName = path.basename(imgPath)
        const type = lookup(extName) || BINARY_FILE;
        const disposition = `Content-Disposition: inline; filename="${baseName}"`;

        return new StreamableFile(imgReadStream, {type, disposition});
    }

    async remove(id: number) {
        const {fileName} = await this.imagesRepository.findOneByOrFail({id});
        const imgPath = this.composePath(fileName);

        await fs.rm(imgPath);
        return this.imagesRepository.delete(id)
    }

    composePath(filename: string) {
        return `${IMAGES_PATH}/${filename}`
    }
}
