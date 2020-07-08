module.exports = {
    type: process.env.DB_TYPE || 'mongodb',
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 27017,
    database: process.env.DB_DATABASE_NAME || 'vmlab',
    synchronize: true,
    entities: [
        'dist/data/entities/*.entity{.ts,.js}',
    ], 
}
