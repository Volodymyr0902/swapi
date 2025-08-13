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

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: T, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx: HttpArgumentsHost = host.switchToHttp();

    const statusCode: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof TypeORMError || exception instanceof NoSuchKey
          ? HttpStatus.NOT_FOUND
          : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: string | object =
      exception instanceof BadRequestException
        ? exception.getResponse()
        : exception instanceof EntityNotFoundError
          ? `Entity of type ${this.getEntityName(exception.entityClass)} with such ${this.formatCriteria(exception.criteria)} doesn't exist`
          : exception instanceof HttpException ||
              exception instanceof NoSuchKey ||
              exception instanceof TypeORMError
            ? exception.message
            : HttpStatus['500'];

    const resBody: ExceptionResponse = {
      statusCode,
      info: message,
    };

    httpAdapter.reply(ctx.getResponse(), resBody, statusCode);
    console.error(exception);
  }

  getEntityName(entityClass: any): string {
    if (!entityClass) {
      return 'Unknown';
    }

    if (typeof entityClass === 'function') {
      return entityClass.name;
    }

    if (typeof entityClass === 'string') {
      return entityClass;
    }

    if (entityClass.name) {
      return entityClass.name;
    }

    return 'Unknown';
  }

  formatCriteria(criteria: any): string {
    return criteria.where != null
      ? Object.keys(criteria.where).join(', ')
      : Object.keys(criteria).join(', ');
  }
}
