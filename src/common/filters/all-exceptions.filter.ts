import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { ExceptionResponse } from '../interfaces/exception-response.interface';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { NoSuchKey } from '@aws-sdk/client-s3';
import {ValidationError} from "class-validator";

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: T, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx: HttpArgumentsHost = host.switchToHttp();

    const statusCode: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof EntityNotFoundError || exception instanceof NoSuchKey
          ? HttpStatus.NOT_FOUND
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: string =
      exception instanceof ValidationError
        ? JSON.stringify(exception.constraints)
        : exception instanceof HttpException ||
            exception instanceof TypeORMError ||
            exception instanceof NoSuchKey
          ? exception.message
          : HttpStatus['500'];

    const resBody: ExceptionResponse = {
      statusCode,
      message,
    };

    httpAdapter.reply(ctx.getResponse(), resBody, statusCode);
    console.error(exception);
  }
}
