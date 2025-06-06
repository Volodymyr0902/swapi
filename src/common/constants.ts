import * as process from 'node:process';

export const SWAPI_API_URL = 'https://swapi.dev/api/';

export const CONFIG_FILE_NAME = 'config.yaml';

export const IMAGES_PATH = `${process.cwd()}/src/data`;

export const IMAGE_MIME_REGEX = /^image\/.*$/;

export const BINARY_FILE = 'application/octet-stream';

export const DB_DRIVER = 'mysql';

export const ENTITIES_PATH = './dist/**/*.entity{.ts,.js}';

export const MIGRATIONS_TABLE_NAME = 'my_custom_migrations';

export const MIGRATIONS_PATH = './dist/migrations/*.js';

export const RESOURCE_NAME_POSITION_FROM_END = 2;
