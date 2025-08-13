import { ExecutionContext, Module } from '@nestjs/common';
import { PeopleModule } from './modules/people/people.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from './modules/images/images.module';
import { FilmsModule } from './modules/films/films.module';
import { StarshipsModule } from './modules/starships/starships.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { SpeciesModule } from './modules/species/species.module';
import { PlanetsModule } from './modules/planets/planets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Image } from './modules/images/entities/image.entity';
import { Person } from './modules/people/entities/person.entity';
import { Specie } from './modules/species/entities/specie.entity';
import { Film } from './modules/films/entities/film.entity';
import { Vehicle } from './modules/vehicles/entities/vehicle.entity';
import { Starship } from './modules/starships/entities/starship.entity';
import { Planet } from './modules/planets/entities/planet.entity';
import {
  DB_DRIVER,
  MIGRATIONS_PATH,
  MIGRATIONS_TABLE_NAME,
} from './common/constants';
import { DataSourceOptions } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { RolesModule } from './modules/roles/roles.module';
import { Role } from './modules/roles/entities/role.entity';
import {
  ThrottlerGuard,
  ThrottlerLimitDetail,
  ThrottlerModule,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): DataSourceOptions => ({
        type: DB_DRIVER,
        host: configService.getOrThrow<string>('MYSQL_HOST'),
        port: configService.getOrThrow<number>('MYSQL_PORT'),
        username: configService.getOrThrow<string>('MYSQL_USER'),
        password: configService.getOrThrow<string>('MYSQL_PASSWORD'),
        database: configService.getOrThrow<string>('MYSQL_DATABASE'),
        entities: [
          Image,
          Person,
          Specie,
          Film,
          Vehicle,
          Starship,
          Planet,
          User,
          Role,
        ],
        migrationsTableName: MIGRATIONS_TABLE_NAME,
        migrations: [MIGRATIONS_PATH],
        migrationsRun: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: config.getOrThrow<number>('THROTTLE_TTL'),
            limit: config.getOrThrow<number>('THROTTLE_LIMIT'),
          },
        ],
        errorMessage: (
          ctx: ExecutionContext,
          throttlerLimitDetail: ThrottlerLimitDetail,
        ): string =>
          `This user is blocked. Try again after ${throttlerLimitDetail.timeToBlockExpire} seconds`,
        storage: new ThrottlerStorageRedisService(
          config.getOrThrow<string>('REDIS_THROTTLER_URL'),
        ),
      }),
    }),
    PeopleModule,
    ImagesModule,
    FilmsModule,
    StarshipsModule,
    VehiclesModule,
    SpeciesModule,
    PlanetsModule,
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
