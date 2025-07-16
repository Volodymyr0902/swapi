import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterReqDto } from './dto/register-req.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginReqDto } from './dto/login-req.dto';
import { ResWithTokensDto } from './dto/res-with-tokens.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';
import { ReqWithSerializedUser } from '../../common/interfaces/req-with-serialized-user.interface';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Logs in user' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiUnauthorizedResponse({ description: HttpStatus['401'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiBody({ type: LoginReqDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Req() request: ReqWithSerializedUser): Promise<ResWithTokensDto> {
    return this.authService.login(request.user);
  }

  @ApiOperation({ summary: 'Registers user' })
  @ApiCreatedResponse({ description: HttpStatus['201'] })
  @ApiBadRequestResponse({ description: HttpStatus['400'] })
  @ApiConflictResponse({ description: HttpStatus['409'] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Body() registerDto: RegisterReqDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @ApiBody({ type: DeleteAccountDto })
  @ApiOperation({ summary: 'Deletes user account' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiUnauthorizedResponse({ description: HttpStatus['401'] })
  @ApiBearerAuth()
  @UseGuards(JwtAccessAuthGuard)
  @UseGuards(LocalAuthGuard)
  @Delete('deleteAccount')
  deleteAccount(
    @Req() request: ReqWithSerializedUser,
  ): Promise<GeneralResponseDto> {
    return this.authService.deleteAccount(request.user);
  }

  @ApiOperation({ summary: 'Returns new pair of tokens' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiUnauthorizedResponse({ description: HttpStatus['401'] })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  refresh(@Req() request: ReqWithSerializedUser): Promise<ResWithTokensDto> {
    return this.authService.refresh(request.user);
  }
}
