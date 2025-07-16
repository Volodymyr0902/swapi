import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Starship])],
  controllers: [StarshipsController],
  providers: [
    StarshipsService,
    {
      provide: RelationsCompleterService,
      useFactory: (
        dataSource: DataSource,
      ): RelationsCompleterService<Starship> =>
        new RelationsCompleterService<Starship>(dataSource, Starship),
      inject: [DataSource],
    },
  ],
  exports: [TypeOrmModule],
})
export class StarshipsModule {}
