import {Controller, Post, Body, Delete, UseGuards, HttpStatus, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInReqDto } from './dto/sign-in-req.dto';
import {SignInResDto} from "./dto/sign-in-res.dto";
import {RegisterDto} from "./dto/register.dto";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";
import {DeleteAccountDto} from "./dto/delete-account.dto";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse, ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Sign in user'})
  @ApiOkResponse({description: HttpStatus['200']})
  @ApiUnauthorizedResponse({description: HttpStatus['401']})
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInReqDto): Promise<SignInResDto> {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({summary: 'Register new user'})
  @ApiCreatedResponse({description: HttpStatus['201']})
  @ApiBadRequestResponse({description: HttpStatus['400']})
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<GeneralResponseDto> {
    return this.authService.register(registerDto);
  }

  @ApiOperation({summary: 'Delete user account'})
  @ApiOkResponse({description: HttpStatus['200']})
  @ApiUnauthorizedResponse({description: HttpStatus['401']})
  @ApiBearerAuth()
  @Delete('deleteAccount')
  @UseGuards(JwtAuthGuard)
  deleteAccount(@Body() deleteAccountDto: DeleteAccountDto): Promise<GeneralResponseDto> {
    return this.authService.deleteAccount(deleteAccountDto)
  }
}
