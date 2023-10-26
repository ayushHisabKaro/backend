import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;
const env = ENV.ENV || 'DEV';
const db_config: TypeOrmModuleOptions = {
  type: (env === 'PROD' ? process.env.TYPE : process.env.DEV_TYPE) as 'mysql',
  host: env === 'PROD' ? process.env.HOST : process.env.DEV_HOST,
  port: env === 'PROD' ? +process.env.DB_PORT : +process.env.DB_PORT,
  username: env === 'PROD' ? process.env.USERNAME : process.env.DEV_USERNAME,
  password: env === 'PROD' ? process.env.PASSWORD : process.env.DEV_PASSWORD,
  database: env === 'PROD' ? process.env.DATABASE : process.env.DEV_DATABASE,
  // entities: ['dist/**/*.entity{.ts,.js}'],
  // seeds: ['src/seeds/**/*{.ts,.js}'],
  // factories: ['src/seeds/factories/**/*{.ts,.js}'],
  synchronize: ENV.DB_SYNC === 'true',
  autoLoadEntities: true,
  // synchronize: true,
  // synchronize: env === 'PROD',
  // synchronize: env === 'DEV',
  logging: true,
};
const Reset = '\x1b[0m';
const BgRed = '\x1b[41m';
const BgBlue = '\x1b[44m';

console.log((env === 'PROD' ? BgRed : BgBlue) + env + Reset);
console.log((env === 'PROD' ? BgRed : BgBlue) + db_config.database + Reset);
console.log(
  (env === 'PROD' ? BgRed : BgBlue) + db_config.password + '\n' + Reset,
);
console.log(db_config);
export default db_config;
export { ENV };
