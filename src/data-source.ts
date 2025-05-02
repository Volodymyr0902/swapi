import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mysql00$',
  database: "swapi",
  entities: ["./src/*/entities/*.entity.ts"],
  migrationsTableName: 'my_custom_migrations',
  migrations: ["./src/migrations/*.ts"],
  synchronize: false,
})