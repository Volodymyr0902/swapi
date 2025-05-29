import {Injectable, StreamableFile} from '@nestjs/common';
import {CreateImageDto} from './dto/create-image.dto';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Image} from "./entities/image.entity";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {BINARY_FILE} from "../../common/constants";
import {ConfigService} from "@nestjs/config";
import {AppEnvVars} from "../../common/types/env-vars.type";
import {DeleteResponseDto} from "../../common/dto/deleteResponse.dto";
import {StorageService} from "../../common/services/storage.service";
import {Readable} from "stream";

@Injectable()
export class ImagesService {
    constructor(@InjectRepository(Image) private readonly imagesRepository: Repository<Image>,
                private readonly configService: ConfigService,
                private readonly storageService: StorageService,) {}

    async create(file: Express.Multer.File, createImageDto: CreateImageDto): Promise<Image> {
        const {entityId, entityName} = createImageDto;
        const fileName: string = file.originalname

        const newImage: Image = this.imagesRepository.create({fileName, [entityName]: entityId})
        const savedImage: Image = await this.imagesRepository.save(newImage);

        const {id} = savedImage;
        const {protocol, host, port} = this.configService.get<AppEnvVars>('app')!;
        const tableName: string = this.imagesRepository.metadata.tableName
        savedImage.url = `${protocol}://${host}:${port}/${tableName}/${id}`

        const imgWithUrl: Image = await this.imagesRepository.save(savedImage);
        await this.storageService.upload(file, id.toString());
        return imgWithUrl;
    }

    async findAll(paginationDto: PaginationDto): Promise<Image[]> {
        const {page, limit} = paginationDto;
        const skip: number = page * limit - limit;

        return this.imagesRepository.find({skip, take: limit});
    }

    async findOne(id: number): Promise<StreamableFile> {
        await this.imagesRepository.findOneByOrFail({id});
        const {Body, ContentType} = await this.storageService.download(id.toString());

        return new StreamableFile(Body as Readable, {
            type: ContentType ?? BINARY_FILE,
        });
    }

    async remove(id: number): Promise<DeleteResponseDto> {
        await this.imagesRepository.findOneByOrFail({id});

        await this.storageService.drop(id.toString())
        const {affected} = await this.imagesRepository.delete(id)

        return {success: !!affected};
    }
}
