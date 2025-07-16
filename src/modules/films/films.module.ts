import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { Film } from './entities/film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: RelationsCompleterService,
      useFactory: (dataSource: DataSource): RelationsCompleterService<Film> =>
        new RelationsCompleterService<Film>(dataSource, Film),
      inject: [DataSource],
    },
  ],
  exports: [TypeOrmModule],
})
export class FilmsModule {}
