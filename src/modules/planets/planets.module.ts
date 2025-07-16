import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  controllers: [PlanetsController],
  providers: [
    PlanetsService,
    {
      provide: RelationsCompleterService,
      useFactory: (dataSource: DataSource): RelationsCompleterService<Planet> =>
        new RelationsCompleterService<Planet>(dataSource, Planet),
      inject: [DataSource],
    },
  ],
  exports: [TypeOrmModule],
})
export class PlanetsModule {}
