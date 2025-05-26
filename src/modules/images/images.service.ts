import {Injectable, StreamableFile} from '@nestjs/common';
import {CreateImageDto} from './dto/create-image.dto';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Image} from "./entities/image.entity";
import * as fs from "node:fs/promises";
import {createReadStream} from 'fs';
import * as path from "node:path";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {lookup} from "mime-types"
import {BINARY_FILE, IMAGES_PATH} from "../../common/constants";
import {ConfigService} from "@nestjs/config";
import {AppEnvVars} from "../../common/types/env-vars.type";
import {DeleteResponseDto} from "../../common/dto/deleteResponse.dto";

@Injectable()
export class ImagesService {
    constructor(@InjectRepository(Image) private readonly imagesRepository: Repository<Image>,
                private readonly configService: ConfigService,) {}

    async create(file: Express.Multer.File, createImageDto: CreateImageDto): Promise<Image> {
        const {entityId, entityName} = createImageDto;
        const fileName: string = file.originalname

        const destPath: string = this.composeImgPath(fileName);
        await fs.writeFile(destPath, file.buffer);

        const newImage: Image = this.imagesRepository.create({fileName, [entityName]: entityId})
        const {id} = newImage;
        const {protocol, host, port} = this.configService.get<AppEnvVars>('app')!;
        const tableName: string = this.imagesRepository.metadata.tableName

        newImage.url = `${protocol}://${host}:${port}/${tableName}/${id}`
        return this.imagesRepository.save(newImage);
    }

    async findAll(paginationDto: PaginationDto): Promise<Image[]> {
        const {page, limit} = paginationDto;
        const skip: number = page * limit - limit;

        return this.imagesRepository.find({skip, take: limit});
    }

    async findOne(id: number): Promise<StreamableFile> {
        const imgData: Image = await this.imagesRepository.findOneByOrFail({id});
        const imgPath: string = this.composeImgPath(imgData.fileName);
        const imgReadStream = createReadStream(imgPath)

        const extName: string = path.extname(imgPath);
        const baseName: string = path.basename(imgPath)
        const type: string = lookup(extName) || BINARY_FILE;
        const disposition = `Content-Disposition: inline; filename="${baseName}"`;

        return new StreamableFile(imgReadStream, {type, disposition});
    }

    async remove(id: number): Promise<DeleteResponseDto> {
        const {fileName} = await this.imagesRepository.findOneByOrFail({id});
        const imgPath: string = this.composeImgPath(fileName);

        await fs.rm(imgPath);
        const {affected} = await this.imagesRepository.delete(id)
        return {success: !!affected};
    }

    private composeImgPath(filename: string): string {
        return `${IMAGES_PATH}/${filename}`
    }
}
