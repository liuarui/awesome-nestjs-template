// common config
export const config = {
    SERVER_PORT: 3000,
    DB_CONFIG: {
        dialect: 'mysql',
        host: 'host',
        port: 3306,
        username: 'uname',
        password: 'psw',
        database: 'dbname',
        autoLoadModels: true,
        synchronize: true,
    },
}
