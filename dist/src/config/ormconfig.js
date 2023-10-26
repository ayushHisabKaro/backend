"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv = require("dotenv");
dotenv.config();
const ENV = process.env;
exports.ENV = ENV;
const env = ENV.ENV || 'DEV';
const db_config = {
    type: (env === 'PROD' ? process.env.TYPE : process.env.DEV_TYPE),
    host: env === 'PROD' ? process.env.HOST : process.env.DEV_HOST,
    port: env === 'PROD' ? +process.env.DB_PORT : +process.env.DB_PORT,
    username: env === 'PROD' ? process.env.USERNAME : process.env.DEV_USERNAME,
    password: env === 'PROD' ? process.env.PASSWORD : process.env.DEV_PASSWORD,
    database: env === 'PROD' ? process.env.DATABASE : process.env.DEV_DATABASE,
    synchronize: ENV.DB_SYNC === 'true',
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
exports.default = db_config;
//# sourceMappingURL=ormconfig.js.map