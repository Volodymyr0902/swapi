import {HttpAdapterHost, NestApplication, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {SwaggerModule} from "@nestjs/swagger";
import {ConfigService} from "@nestjs/config";
import swaggerConfig from "./config/swagger-config";
import {AllExceptionsFilter} from "./common/filters/all-exceptions.filter";

async function bootstrap() {
    const app = await NestFactory.create<NestApplication>(AppModule);
    const configService = app.get<ConfigService>(ConfigService);

    const httpAdapterHost = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost))

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
    }));

    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, documentFactory);

    const port = configService.get<string>("app.port") ?? 3000;
    await app.listen(port);
}

bootstrap()
    .then(() => console.log("Server started successfully."))
    .catch(err => console.log(err));
