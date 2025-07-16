import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: RelationsCompleterService,
      useFactory: (dataSource: DataSource): RelationsCompleterService<User> =>
        new RelationsCompleterService<User>(dataSource, User),
      inject: [DataSource],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
