import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterReqDto } from './dto/register-req.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LoginReqDto } from './dto/login-req.dto';
import { TokensPairDto } from './dto/tokens-pair.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';
import { CustomRequest } from '../../common/interfaces/custom-request.interface';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { User } from '../users/entities/user.entity';
import { SkipAccess } from './decorators/public.decorator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtOneTimeGuard } from './guards/jwt-one-time.guard';
import { AUTH_THROTTLE_LIMIT, AUTH_THROTTLE_TTL } from './constants';

@Throttle({ default: { ttl: AUTH_THROTTLE_TTL, limit: AUTH_THROTTLE_LIMIT } })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Logs in user' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiUnauthorizedResponse({ description: HttpStatus['401'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiHeader({ name: 'User-Agent', required: false })
  @ApiBody({ type: LoginReqDto })
  @SkipAccess()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Req() request: CustomRequest,
    @Ip() ip: string,
    @Headers('User-Agent') userAgent: string,
  ): Promise<TokensPairDto> {
    return this.authService.login(request.user, ip, userAgent);
  }

  @ApiOperation({ summary: 'Registers user' })
  @ApiCreatedResponse({ description: HttpStatus['201'] })
  @ApiBadRequestResponse({ description: HttpStatus['400'] })
  @ApiConflictResponse({ description: HttpStatus['409'] })
  @SkipAccess()
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
  @UseGuards(LocalAuthGuard)
  @Delete('deleteAccount')
  deleteAccount(@Req() request: CustomRequest): Promise<GeneralResponseDto> {
    return this.authService.deleteAccount(request.user.id);
  }

  @ApiOperation({ summary: 'Returns new pair of tokens' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiUnauthorizedResponse({ description: HttpStatus['401'] })
  @ApiHeader({ name: 'User-Agent', required: false })
  @ApiBearerAuth()
  @SkipAccess()
  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  refresh(
    @Req() request: CustomRequest,
    @Ip() ip: string,
    @Headers('User-Agent') userAgent: string,
  ): Promise<TokensPairDto> {
    return this.authService.refresh(request.user, ip, userAgent, request.sid);
  }

  @ApiOperation({ summary: 'Logs user out and drops current session' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiUnauthorizedResponse({ description: HttpStatus['401'] })
  @ApiBearerAuth()
  @Get('logout')
  logout(@Req() request: CustomRequest): Promise<GeneralResponseDto> {
    return this.authService.logoutCurrent(request.user.id, request.sid);
  }

  @ApiOperation({ summary: 'Logs user out and drops all sessions' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @ApiUnauthorizedResponse({ description: HttpStatus['401'] })
  @ApiBearerAuth()
  @Get('logoutAll')
  logoutAll(@Req() request: CustomRequest): Promise<GeneralResponseDto> {
    return this.authService.logoutAll(request.user.id);
  }

  @ApiOperation({ summary: 'Logs user out and drops all sessions' })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @SkipAccess()
  @Post('forgotPassword')
  forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<GeneralResponseDto> {
    return this.authService.sendPasswordResetEmail(forgotPasswordDto.email);
  }

  @ApiOperation({ summary: "Changes user's password" })
  @ApiOkResponse({ description: HttpStatus['200'] })
  @ApiNotFoundResponse({ description: HttpStatus['404'] })
  @SkipAccess()
  @UseGuards(JwtOneTimeGuard)
  @Post('resetPassword')
  resetPassword(
    @Req() request: CustomRequest,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      request.user.id,
      resetPasswordDto.newPassword,
    );
  }
}
