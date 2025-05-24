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
    NotFoundException,
    UseInterceptors
} from '@nestjs/common';
import {PeopleService} from './people.service';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {PaginationDto} from "../common/dto/pagination.dto";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse, ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger";
import {GeneralResponseInterceptor} from "../common/interceptors/general-response.interceptor";
import {RelationsToIdsInterceptor} from "../common/interceptors/relations-to-ids.interceptor";

@Controller('people')
@UseInterceptors(GeneralResponseInterceptor)
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @ApiOperation({summary: 'Creates person'})
    @ApiCreatedResponse({description: HttpStatus["201"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @Post()
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.peopleService.create(createPersonDto);
    }

    @ApiOperation({summary: 'Retrieves queried page and number of people'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNoContentResponse({description: HttpStatus["204"]})
    @Get()
    @UseInterceptors(RelationsToIdsInterceptor)
    findAll(@Query() paginationDto: PaginationDto) {
        return this.peopleService.findAll(paginationDto);
    }

    @ApiOperation({summary: 'Retrieves unique person'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Get(':id')
    @UseInterceptors(RelationsToIdsInterceptor)
    findOne(@Param('id') id: string) {
        return this.peopleService.findOne(+id);
    }

    @ApiOperation({summary: 'Updates person'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
        return this.peopleService.update(+id, updatePersonDto);
    }

    @ApiOperation({summary: 'Deletes person'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.peopleService.remove(+id);
    }
}
