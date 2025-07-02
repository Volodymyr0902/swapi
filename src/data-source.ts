import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import {
  DB_DRIVER,
  ENTITIES_PATH,
  MIGRATIONS_PATH,
  MIGRATIONS_TABLE_NAME,
} from './common/constants';
import * as process from 'node:process';

dotenv.config();

export const AppDataSource = new DataSource({
  type: DB_DRIVER,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [ENTITIES_PATH],
  migrationsTableName: MIGRATIONS_TABLE_NAME,
  migrations: [MIGRATIONS_PATH],
  synchronize: false,
});
