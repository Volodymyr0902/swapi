import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import {PaginationDto} from "../common/dto/pagination.dto";

@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.planetsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planetsService.remove(+id);
  }
}
