import { DataSource } from 'typeorm';
import config from './config/config-reader';
import {
  DB_DRIVER,
  ENTITIES_PATH,
  MIGRATIONS_PATH,
  MIGRATIONS_TABLE_NAME,
} from './common/constants';
import type { EnvVars } from './common/types/env-vars.type';

const dbConfig: EnvVars = config();

export const AppDataSource = new DataSource({
  type: DB_DRIVER,
  ...dbConfig.db,
  entities: [ENTITIES_PATH],
  migrationsTableName: MIGRATIONS_TABLE_NAME,
  migrations: [MIGRATIONS_PATH],
  synchronize: false,
});
