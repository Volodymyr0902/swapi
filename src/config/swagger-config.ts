import {DocumentBuilder} from "@nestjs/swagger";

export default new DocumentBuilder()
    .setTitle('SWAPI')
    .setDescription('Swapi REST API clone')
    .setVersion('1.0')
    .addTag('nest')
    .addBearerAuth()
    .build();

