import {Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, UseInterceptors} from '@nestjs/common';
import {StarshipsService} from './starships.service';
import {CreateStarshipDto} from './dto/create-starship.dto';
import {UpdateStarshipDto} from './dto/update-starship.dto';
import {PaginationDto} from "../../common/dto/pagination.dto";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from "@nestjs/swagger";
import {GeneralResponseInterceptor} from "../../common/interceptors/general-response.interceptor";
import {RelationsToUrisInterceptor} from "../../common/interceptors/relations-to-uris.interceptor";
import {Starship} from "./entities/starship.entity";
import {DeleteResponseDto} from "../../common/dto/deleteResponse.dto";
import {NoContentInterceptor} from "../../common/interceptors/no-content.interceptor";

@Controller('starships')
@UseInterceptors(GeneralResponseInterceptor, NoContentInterceptor)
export class StarshipsController {
    constructor(private readonly starshipsService: StarshipsService) {}

    @ApiOperation({summary: 'Creates starship'})
    @ApiCreatedResponse({description: HttpStatus["201"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @Post()
    create(@Body() createStarshipDto: CreateStarshipDto): Promise<Starship> {
        return this.starshipsService.create(createStarshipDto);
    }

    @ApiOperation({summary: 'Retrieves queried page and number of starships'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNoContentResponse({description: HttpStatus["204"]})
    @Get()
    @UseInterceptors(RelationsToUrisInterceptor)
    findAll(@Query() paginationDto: PaginationDto): Promise<Starship[]> {
        return this.starshipsService.findAll(paginationDto);
    }

    @ApiOperation({summary: 'Retrieves unique starship'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Get(':id')
    @UseInterceptors(RelationsToUrisInterceptor)
    findOne(@Param('id') id: string): Promise<Starship> {
        return this.starshipsService.findOne(+id);
    }

    @ApiOperation({summary: 'Updates starship'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStarshipDto: UpdateStarshipDto): Promise<Starship> {
        return this.starshipsService.update(+id, updateStarshipDto);
    }

    @ApiOperation({summary: 'Deletes starship'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResponseDto> {
        return this.starshipsService.remove(+id);
    }
}
