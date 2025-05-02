import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {PeopleService} from './people.service';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {PaginationDto} from "../common/dto/pagination.dto";

@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {
    }

    @Post()
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.peopleService.create(createPersonDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.peopleService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.peopleService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
        return this.peopleService.update(+id, updatePersonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.peopleService.remove(+id);
    }
}
