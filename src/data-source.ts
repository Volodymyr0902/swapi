import {DataSource, DataSourceOptions} from 'typeorm';
import {Image} from "./images/entities/image.entity";
import {Person} from "./people/entities/person.entity";
import {Specie} from "./species/entities/specie.entity";
import {Film} from "./films/entities/film.entity";
import {Vehicle} from "./vehicles/entities/vehicle.entity";
import {Starship} from "./starships/entities/starship.entity";
import {Planet} from "./planets/entities/planet.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mysql00$',
  database: "swapi",
  entities: [Image, Person, Specie, Film, Vehicle, Starship, Planet],
  migrationsTableName: 'my_custom_migrations',
  migrations: ["./dist/migrations/*.js"],
  synchronize: false,
}

export const AppDataSource = new DataSource(dataSourceOptions)