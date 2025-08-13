import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import swaggerConfig from './config/swagger-config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DtoValidationPipe } from './common/pipes/dto-validation.pipe';

async function bootstrap(): Promise<void> {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.useGlobalPipes(new DtoValidationPipe());

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  app.set('trust proxy', 'loopback');

  const port: number = configService.get<number>('APP_PORT') ?? 3000;
  await app.listen(port);
}

bootstrap()
  .then(() => console.log('Server started successfully.'))
  .catch((err) => console.log(err));
