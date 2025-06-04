import {Controller, Get, Post, Body, Delete, Query, ParseEnumPipe, HttpStatus, UseGuards, Param} from '@nestjs/common';
import {RolesService} from './roles.service';
import {CreateRoleDto} from './dto/create-role.dto';
import {PaginationDto} from "../../common/dto/pagination.dto";
import {ExistingRoles} from "./enums/roles.enum";
import {Role} from "./entities/role.entity";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiConflictResponse,
    ApiCreatedResponse,
    ApiNoContentResponse, ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation, ApiParam
} from "@nestjs/swagger";
import {JwtAccessAuthGuard} from "../auth/guards/jwt-access-auth.guard";
import {Roles} from "./decorators/roles.decorator";
import {RolesGuard} from "./guards/roles.guard";

@Controller('roles')
@ApiBearerAuth()
@UseGuards(JwtAccessAuthGuard, RolesGuard)
@Roles(ExistingRoles.ADMIN)
export class RolesController {
    constructor(private readonly rolesService: RolesService) {
    }

    @ApiOperation({summary: 'Retrieves queried page and number of roles'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNoContentResponse({description: HttpStatus["204"]})
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<Role[]> {
        return this.rolesService.findAll(paginationDto);
    }

    @ApiOperation({summary: 'Retrieves unique role'})
    @ApiOkResponse({description: HttpStatus["200"]})
    @ApiNotFoundResponse({description: HttpStatus["404"]})
    @ApiParam(
        {
            name: 'name',
            type: String,
            enum: ExistingRoles,
            example: ExistingRoles.ADMIN
        })
    @Get(':name')
    findOne(@Param('name', new ParseEnumPipe(ExistingRoles)) name: string): Promise<Role> {
        return this.rolesService.findOne(name);
    }
}
