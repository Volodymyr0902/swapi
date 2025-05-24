import {Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, UseInterceptors} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import {PaginationDto} from "../common/dto/pagination.dto";
import {
  ApiBadRequestResponse, ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation
} from "@nestjs/swagger";
import {GeneralResponseInterceptor} from "../common/interceptors/general-response.interceptor";
import {RelationsToIdsInterceptor} from "../common/interceptors/relations-to-ids.interceptor";

@Controller('vehicles')
@UseInterceptors(GeneralResponseInterceptor)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOperation({summary: 'Creates vehicle'})
  @ApiCreatedResponse({description: HttpStatus["201"]})
  @ApiBadRequestResponse({description: HttpStatus["400"]})
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @ApiOperation({summary: 'Retrieves queried page and number of vehicles'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNoContentResponse({description: HttpStatus["204"]})
  @Get()
  @UseInterceptors(RelationsToIdsInterceptor)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.vehiclesService.findAll(paginationDto);
  }

  @ApiOperation({summary: 'Retrieves unique vehicle'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Get(':id')
  @UseInterceptors(RelationsToIdsInterceptor)
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(+id);
  }

  @ApiOperation({summary: 'Updates vehicle'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiBadRequestResponse({description: HttpStatus["400"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @ApiOperation({summary: 'Deletes vehicle'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(+id);
  }
}
