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
    UseInterceptors
} from '@nestjs/common';
import {PeopleService} from './people.service';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {PaginationDto} from "../../common/dto/pagination.dto";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse, ApiOperation,
} from "@nestjs/swagger";
import {GeneralResponseInterceptor} from "../../common/interceptors/general-response.interceptor";
import {RelationsToUrisInterceptor} from "../../common/interceptors/relations-to-uris.interceptor";
import {Person} from "./entities/person.entity";
import {DeleteResponseDto} from "../../common/dto/deleteResponse.dto";

@Controller('people')
@UseInterceptors(GeneralResponseInterceptor)
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @ApiOperation({summary: 'Creates person'})
    @ApiCreatedResponse({description: HttpStatus["201"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @Post()
    create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
        return this.peopleService.create(createPersonDto);
    }

    @ApiOperation({summary: 'Retrieves queried page and number of people'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNoContentResponse({description: HttpStatus["204"]})
    @Get()
    @UseInterceptors(RelationsToUrisInterceptor)
    findAll(@Query() paginationDto: PaginationDto): Promise<Person[]> {
        return this.peopleService.findAll(paginationDto);
    }

    @ApiOperation({summary: 'Retrieves unique person'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Get(':id')
    @UseInterceptors(RelationsToUrisInterceptor)
    findOne(@Param('id') id: string): Promise<Person> {
        return this.peopleService.findOne(+id);
    }

    @ApiOperation({summary: 'Updates person'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiBadRequestResponse({description: HttpStatus["400"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto): Promise<Person> {
        return this.peopleService.update(+id, updatePersonDto);
    }

    @ApiOperation({summary: 'Deletes person'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @Delete(':id')
    remove(@Param('id') id: string): Promise<DeleteResponseDto> {
        return this.peopleService.remove(+id);
    }
}
