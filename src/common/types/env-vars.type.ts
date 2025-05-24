export type AppEnvVars = {
    protocol: string
    host: string
    port: number
};

export type DbEnvVars = {
    host: string
    port: number
    username: string
    password: string
    database: string
}

export type EnvVars = {
    app: AppEnvVars,
    db: DbEnvVars
}