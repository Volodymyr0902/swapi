import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile, Query, ParseFilePipe, HttpStatus, StreamableFile,
} from '@nestjs/common';
import {ImagesService} from './images.service';
import {CreateImageDto} from './dto/create-image.dto';
import {FileInterceptor} from "@nestjs/platform-express";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {ImageTypeValidator} from "./validators/image-type.validator";
import {IMAGE_MIME_REGEX} from "../../common/constants";
import {
    ApiBadRequestResponse,
    ApiConsumes,
    ApiCreatedResponse,
    ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from "@nestjs/swagger";
import {GeneralResponseInterceptor} from "../../common/interceptors/general-response.interceptor";
import {Image} from "./entities/image.entity";
import {DeleteResponseDto} from "../../common/dto/deleteResponse.dto";

@Controller('images')
@UseInterceptors(GeneralResponseInterceptor)
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @ApiOperation({summary: 'Creates an image related to another item'})
    @ApiCreatedResponse({description: HttpStatus["201"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    create(@Body() createImageDto: CreateImageDto, @UploadedFile(new ParseFilePipe({
        validators: [new ImageTypeValidator({regex: IMAGE_MIME_REGEX})]
    })) file: Express.Multer.File): Promise<Image> {
        return this.imagesService.create(file, createImageDto);
    }

    @ApiOperation({summary: 'Retrieves queried page and number of images metadata'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNoContentResponse({description: HttpStatus["204"]})
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<Image[]> {
        return this.imagesService.findAll(paginationDto);
    }

    @ApiOperation({summary: 'Retrieves unique image as a file'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Get(':id')
    findOne(@Param('id') id: string): Promise<StreamableFile> {
        return this.imagesService.findOne(+id);
    }

    @ApiOperation({summary: 'Deletes image and its metadata'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResponseDto> {
        return this.imagesService.remove(+id);
    }
}
