import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    HttpStatus,
    UseInterceptors,
    UseGuards
} from '@nestjs/common';
import {SpeciesService} from './species.service';
import {CreateSpecieDto} from './dto/create-specie.dto';
import {UpdateSpecieDto} from './dto/update-specie.dto';
import {PaginationDto} from "../../common/dto/pagination.dto";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiCreatedResponse,
    ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from "@nestjs/swagger";
import {GeneralResponseInterceptor} from "../../common/interceptors/general-response.interceptor";
import {RelationsToUrisInterceptor} from "../../common/interceptors/relations-to-uris.interceptor";
import {Specie} from "./entities/specie.entity";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";
import {NoContentInterceptor} from "../../common/interceptors/no-content.interceptor";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('species')
@UseInterceptors(GeneralResponseInterceptor, NoContentInterceptor)
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {
    }

    @ApiOperation({summary: 'Creates species'})
    @ApiCreatedResponse({description: HttpStatus["201"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createSpeciesDto: CreateSpecieDto): Promise<Specie> {
        return this.speciesService.create(createSpeciesDto);
    }

    @ApiOperation({summary: 'Retrieves queried page and number of species'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNoContentResponse({description: HttpStatus["204"]})
    @Get()
    @UseInterceptors(RelationsToUrisInterceptor)
    findAll(@Query() paginationDto: PaginationDto): Promise<Specie[]> {
        return this.speciesService.findAll(paginationDto);
    }

    @ApiOperation({summary: 'Retrieves unique species'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Get(':id')
    @UseInterceptors(RelationsToUrisInterceptor)
    findOne(@Param('id') id: string): Promise<Specie> {
        return this.speciesService.findOne(+id);
    }

    @ApiOperation({summary: 'Updates species'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpecieDto): Promise<Specie> {
        return this.speciesService.update(+id, updateSpeciesDto);
    }

    @ApiOperation({summary: 'Deletes species'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<GeneralResponseDto> {
        return this.speciesService.remove(+id);
    }
}
