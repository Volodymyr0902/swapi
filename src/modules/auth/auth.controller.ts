import {Body, Controller, Delete, HttpCode, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {RegisterReqDto} from "./dto/register-req.dto";
import {RegisterResDto} from "./dto/register-res.dto";
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiBody, ApiConflictResponse,
    ApiCreatedResponse, ApiNotFoundResponse,
    ApiOkResponse, ApiOperation,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {LoginReqDto} from "./dto/login-req.dto";
import {RequestWithUser} from "./interfaces/request-with-user.interface";
import {LoginResDto} from "./dto/login-res.dto";
import {DeleteAccountDto} from "./dto/delete-account.dto";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: 'Logs in user'})
    @ApiOkResponse({description: HttpStatus['200']})
    @ApiUnauthorizedResponse({description: HttpStatus['401']})
    @ApiNotFoundResponse({description: HttpStatus['404']})
    @ApiBody({type: LoginReqDto})
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Req() request: RequestWithUser): Promise<LoginResDto> {
        return this.authService.login(request.user);
    }

    @ApiOperation({summary: 'Registers user'})
    @ApiCreatedResponse({description: HttpStatus['201']})
    @ApiBadRequestResponse({description: HttpStatus['400']})
    @ApiConflictResponse({description: HttpStatus['409']})
    @Post('register')
    register(@Body() registerDto: RegisterReqDto): Promise<RegisterResDto> {
        return this.authService.register(registerDto);
    }

    @ApiBody({type: DeleteAccountDto})
    @ApiOperation({summary: 'Deletes user account'})
    @ApiOkResponse({description: HttpStatus['200']})
    @ApiNotFoundResponse({description: HttpStatus['404']})
    @ApiUnauthorizedResponse({description: HttpStatus['401']})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @UseGuards(LocalAuthGuard)
    @Delete('deleteAccount')
    deleteAccount(@Req() request: RequestWithUser): Promise<GeneralResponseDto> {
        return this.authService.deleteAccount(request.user);
    }
}
