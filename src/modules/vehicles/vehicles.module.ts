import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [
    VehiclesService,
    {
      provide: RelationsCompleterService,
      useFactory: (
        dataSource: DataSource,
      ): RelationsCompleterService<Vehicle> =>
        new RelationsCompleterService<Vehicle>(dataSource, Vehicle),
      inject: [DataSource],
    },
  ],
  exports: [TypeOrmModule],
})
export class VehiclesModule {}
