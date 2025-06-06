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
  UseGuards,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { GeneralResponseInterceptor } from '../../common/interceptors/general-response.interceptor';
import { RelationsToUrisInterceptor } from '../../common/interceptors/relations-to-uris.interceptor';
import { Planet } from './entities/planet.entity';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';
import { NoContentInterceptor } from '../../common/interceptors/no-content.interceptor';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { ExistingRoles } from '../roles/enums/roles.enum';
import { Roles } from '../roles/decorators/roles.decorator';
import { RolesGuard } from '../roles/guards/roles.guard';

@Controller('planets')
@Roles(ExistingRoles.USER)
@UseInterceptors(GeneralResponseInterceptor, NoContentInterceptor)
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @ApiOperation({ summary: 'Creates planet' })
  @ApiCreatedResponse({ description: HttpStatus['201'] })
  @ApiBadRequestResponse({ description: HttpStatus['400'] })
  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Roles(ExistingRoles.ADMIN)
  @Post()
  create(@Body() createPlanetDto: CreatePlanetDto): Promise<Planet> {
    return this.planetsService.create(createPlanetDto);
  }

  @ApiOperation({ summary: 'Retrieves queried page and number of planets' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNoContentResponse({ description: HttpStatus['204'] })
  @Get()
  @UseInterceptors(RelationsToUrisInterceptor)
  findAll(@Query() paginationDto: PaginationDto): Promise<Planet[]> {
    return this.planetsService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Retrieves unique planet' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @Get(':id')
  @UseInterceptors(RelationsToUrisInterceptor)
  findOne(@Param('id') id: string): Promise<Planet> {
    return this.planetsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates planet' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiBadRequestResponse({ description: HttpStatus['400'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Roles(ExistingRoles.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanetDto: UpdatePlanetDto,
  ): Promise<Planet> {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @ApiOperation({ summary: 'Deletes planet' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard, RolesGuard)
  @Roles(ExistingRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<GeneralResponseDto> {
    return this.planetsService.remove(+id);
  }
}
