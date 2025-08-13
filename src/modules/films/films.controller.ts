import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
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
import { Film } from './entities/film.entity';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';
import { NoContentInterceptor } from '../../common/interceptors/no-content.interceptor';
import { Roles } from '../roles/decorators/roles.decorator';
import { ExistingRoles } from '../roles/enums/roles.enum';

@ApiBearerAuth()
@Controller('films')
@Roles(ExistingRoles.USER)
@UseInterceptors(GeneralResponseInterceptor, NoContentInterceptor)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiOperation({ summary: 'Creates film' })
  @ApiCreatedResponse({ description: HttpStatus['201'] })
  @ApiBadRequestResponse({ description: HttpStatus['400'] })
  @Post()
  @Roles(ExistingRoles.ADMIN)
  create(@Body() createFilmDto: CreateFilmDto): Promise<Film> {
    return this.filmsService.create(createFilmDto);
  }

  @ApiOperation({ summary: 'Retrieves queried page and number of films' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNoContentResponse({ description: HttpStatus['204'] })
  @Get()
  @UseInterceptors(RelationsToUrisInterceptor)
  findAll(@Query() paginationDto: PaginationDto): Promise<Film[]> {
    return this.filmsService.findAll(paginationDto);
  }

  @ApiOperation({ summary: 'Retrieves unique film' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @Get(':id')
  @UseInterceptors(RelationsToUrisInterceptor)
  findOne(@Param('id', ParseIntPipe) id: string): Promise<Film> {
    return this.filmsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updates film' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiBadRequestResponse({ description: HttpStatus['400'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @Patch(':id')
  @Roles(ExistingRoles.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateFilmDto: UpdateFilmDto,
  ): Promise<Film> {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @ApiOperation({ summary: 'Deletes film' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @Delete(':id')
  @Roles(ExistingRoles.ADMIN)
  remove(@Param('id', ParseIntPipe) id: string): Promise<GeneralResponseDto> {
    return this.filmsService.remove(+id);
  }
}
