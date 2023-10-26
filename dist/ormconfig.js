"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
const ENV = process.env;
const env = ENV.ENV || 'DEV';
const prod = env === 'PROD';
const db_config = {
    type: (prod ? process.env.TYPE : process.env.DEV_TYPE),
    host: prod ? process.env.HOST : process.env.DEV_HOST,
    port: prod ? +process.env.DB_PORT : +process.env.DB_PORT,
    username: prod ? process.env.USERNAME : process.env.DEV_USERNAME,
    password: prod ? process.env.PASSWORD : process.env.DEV_PASSWORD,
    database: prod ? process.env.DATABASE : process.env.DEV_DATABASE,
    entities: [(prod ? 'dist/' : 'src/') + '**/*.entity{.ts,.js}'],
    synchronize: ENV.SYNC_DB === 'true',
    autoLoadEntities: true,
    logging: true,
};
const Reset = '\x1b[0m';
const BgRed = '\x1b[41m';
const BgBlue = '\x1b[44m';
console.log((env === 'PROD' ? BgRed : BgBlue) + env + Reset);
console.log((env === 'PROD' ? BgRed : BgBlue) + db_config.database + Reset);
console.log((env === 'PROD' ? BgRed : BgBlue) + db_config.password + '\n' + Reset);
console.log(db_config);
exports.connectionSource = new typeorm_1.DataSource({
    type: db_config.type,
    host: db_config.host,
    port: db_config.port,
    username: db_config.username,
    password: db_config.password,
    database: db_config.database,
    synchronize: db_config.synchronize,
    logging: db_config.logging,
});
//# sourceMappingURL=ormconfig.js.map