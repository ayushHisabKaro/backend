import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
const ENV = process.env;
const env = ENV.ENV || 'DEV';
const prod = env === 'PROD';
const db_config: TypeOrmModuleOptions = {
  type: (prod ? process.env.TYPE : process.env.DEV_TYPE) as 'mysql',
  host: prod ? process.env.HOST : process.env.DEV_HOST,
  port: prod ? +process.env.DB_PORT : +process.env.DB_PORT,
  username: prod ? process.env.USERNAME : process.env.DEV_USERNAME,
  password: prod ? process.env.PASSWORD : process.env.DEV_PASSWORD,
  database: prod ? process.env.DATABASE : process.env.DEV_DATABASE,
  entities: [(prod ? 'dist/' : 'src/') + '**/*.entity{.ts,.js}'],
  // seeds: ['src/seeds/**/*{.ts,.js}'],
  // factories: ['src/seeds/factories/**/*{.ts,.js}'],
  synchronize: ENV.SYNC_DB === 'true',
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

export const connectionSource = new DataSource({
  type: db_config.type,
  host: db_config.host,
  port: db_config.port,
  username: db_config.username,
  password: db_config.password,
  database: db_config.database,
  synchronize: db_config.synchronize,
  logging: db_config.logging,
  // migrationsTableName: 'migrations',
  // name: 'default',
  // entities: ['src/**/**.entity{.ts,.js}'],
  // migrations: ['src/migrations/**/*{.ts,.js}'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
