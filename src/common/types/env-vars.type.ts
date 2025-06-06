export type AppEnvVars = {
  protocol: string;
  host: string;
  port: number;
};

export type DbEnvVars = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type AWSEnvVars = {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  bucket: string;
};

export type EnvVars = {
  app: AppEnvVars;
  db: DbEnvVars;
  aws: AWSEnvVars;
};
