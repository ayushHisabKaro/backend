/// <reference types="node" />
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
declare const ENV: NodeJS.ProcessEnv;
declare const db_config: TypeOrmModuleOptions;
export default db_config;
export { ENV };
