import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';
import {PaginationDto} from "../common/dto/pagination.dto";

@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  create(@Body() createSpeciesDto: CreateSpecieDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.speciesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpecieDto) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }
}
