import {Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, UseInterceptors} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
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

@Controller('films')
@UseInterceptors(GeneralResponseInterceptor)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiOperation({summary: 'Creates film'})
  @ApiCreatedResponse({description: HttpStatus["201"]})
  @ApiBadRequestResponse({description: HttpStatus["400"]})
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @ApiOperation({summary: 'Retrieves queried page and number of films'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNoContentResponse({description: HttpStatus["204"]})
  @Get()
  @UseInterceptors(RelationsToIdsInterceptor)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.filmsService.findAll(paginationDto);
  }

  @ApiOperation({summary: 'Retrieves unique film'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Get(':id')
  @UseInterceptors(RelationsToIdsInterceptor)
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @ApiOperation({summary: 'Updates film'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiBadRequestResponse({description: HttpStatus["400"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @ApiOperation({summary: 'Deletes film'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
