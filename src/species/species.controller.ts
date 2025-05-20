import {Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, UseInterceptors} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import {PaginationDto} from "../common/dto/pagination.dto";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation
} from "@nestjs/swagger";
import {GeneralResponseInterceptor} from "../common/interceptors/general-response.interceptor";
import {RelationsToIdsInterceptor} from "../common/interceptors/relations-to-ids.interceptor";

@Controller('species')
@UseInterceptors(GeneralResponseInterceptor)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @ApiOperation({summary: 'Creates species'})
  @ApiCreatedResponse({description: HttpStatus["201"]})
  @ApiBadRequestResponse({description: HttpStatus["400"]})
  @Post()
  create(@Body() createSpeciesDto: CreateSpecieDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @ApiOperation({summary: 'Retrieves queried page and number of species'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNoContentResponse({description: HttpStatus["204"]})
  @Get()
  @UseInterceptors(RelationsToIdsInterceptor)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.speciesService.findAll(paginationDto);
  }

  @ApiOperation({summary: 'Retrieves unique species'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(+id);
  }

  @ApiOperation({summary: 'Updates species'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiBadRequestResponse({description: HttpStatus["400"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpecieDto) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @ApiOperation({summary: 'Deletes species'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }
}
