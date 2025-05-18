import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile, Query, ParseFilePipe, FileTypeValidator,
} from '@nestjs/common';
import {ImagesService} from './images.service';
import {CreateImageDto} from './dto/create-image.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {PaginationDto} from "../common/dto/pagination.dto";
import {ImageTypeValidator} from "./validators/image-type.validator";
import {IMAGE_MIME_REGEX} from "../common/constants";

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @UseInterceptors(FileInterceptor('file'))
    @Post()
    create(@Body() createImageDto: CreateImageDto, @UploadedFile(new ParseFilePipe({
        validators: [new ImageTypeValidator({regex: IMAGE_MIME_REGEX})]
    })) file: Express.Multer.File) {
        return this.imagesService.create(file, createImageDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.imagesService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.imagesService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.imagesService.remove(+id);
    }
}
