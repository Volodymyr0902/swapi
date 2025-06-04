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
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
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
import {Vehicle} from "./entities/vehicle.entity";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";
import {NoContentInterceptor} from "../../common/interceptors/no-content.interceptor";
import {JwtAccessAuthGuard} from "../auth/guards/jwt-access-auth.guard";
import {ExistingRoles} from "../roles/enums/roles.enum";
import {Roles} from "../roles/decorators/roles.decorator";
import {RolesGuard} from "../roles/guards/roles.guard";

@Controller('vehicles')
@Roles(ExistingRoles.USER)
@UseInterceptors(GeneralResponseInterceptor, NoContentInterceptor)
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @ApiOperation({summary: 'Creates vehicle'})
  @ApiCreatedResponse({description: HttpStatus["201"]})
  @ApiBadRequestResponse({description: HttpStatus["400"]})
  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Roles(ExistingRoles.ADMIN)
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto);
  }

  @ApiOperation({summary: 'Retrieves queried page and number of vehicles'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNoContentResponse({description: HttpStatus["204"]})
  @Get()
  @UseInterceptors(RelationsToUrisInterceptor)
  findAll(@Query() paginationDto: PaginationDto): Promise<Vehicle[]> {
    return this.vehiclesService.findAll(paginationDto);
  }

  @ApiOperation({summary: 'Retrieves unique vehicle'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @Get(':id')
  @UseInterceptors(RelationsToUrisInterceptor)
  findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(+id);
  }

  @ApiOperation({summary: 'Updates vehicle'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiBadRequestResponse({description: HttpStatus["400"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Roles(ExistingRoles.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.vehiclesService.update(+id, updateVehicleDto);
  }

  @ApiOperation({summary: 'Deletes vehicle'})
  @ApiOkResponse({description: HttpStatus["200"]})
  @ApiNotFoundResponse({description: HttpStatus["404"]})
  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Roles(ExistingRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<GeneralResponseDto> {
    return this.vehiclesService.remove(+id);
  }
}
