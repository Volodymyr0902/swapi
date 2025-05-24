import {DataSource} from 'typeorm';
import {Image} from "./images/entities/image.entity";
import {Person} from "./people/entities/person.entity";
import {Specie} from "./species/entities/specie.entity";
import {Film} from "./films/entities/film.entity";
import {Vehicle} from "./vehicles/entities/vehicle.entity";
import {Starship} from "./starships/entities/starship.entity";
import {Planet} from "./planets/entities/planet.entity";
import config from "./config/config-reader"
import {DB_DRIVER, ENTITIES_PATH, MIGRATIONS_PATH, MIGRATIONS_TABLE_NAME} from "./common/constants";


const dbConfig = config()

export const AppDataSource = new DataSource({
    type: DB_DRIVER,
    ...dbConfig.db,
    entities: [ENTITIES_PATH],
    migrationsTableName: MIGRATIONS_TABLE_NAME,
    migrations: [MIGRATIONS_PATH],
    synchronize: false,
})