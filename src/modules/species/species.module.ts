import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specie } from './entities/specie.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Specie])],
  controllers: [SpeciesController],
  providers: [
    SpeciesService,
    {
      provide: RelationsCompleterService,
      useFactory: (dataSource: DataSource): RelationsCompleterService<Specie> =>
        new RelationsCompleterService<Specie>(dataSource, Specie),
      inject: [DataSource],
    },
  ],
  exports: [TypeOrmModule],
})
export class SpeciesModule {}
