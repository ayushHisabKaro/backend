import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as mongoose from "mongoose"
// import { MongooseModule } from '@nestjs/mongoose';
// import {DatabaseModule} from "./database.module"
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/loggor.middleware';
import { UserModule } from './user/user.module';
import { ResumeModule } from './resume/resume.module';
import db_config from './config/ormconfig';
import { FileModule } from './file/file.module';
import { OrganisationModule } from './organisation/organisation.module';
import { HiringModule } from './hiring/hiring.module';
import { NotificationModule } from './notification/notification.module';
import { LookupModule } from './lookup/lookup.module';
import { AppService } from './app.service';
import { StaffModule } from './staff/staff.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerBehindProxyGuard } from './guards/ThrottlerBehindProxyGuard';
import { ThrottlerModule } from '@nestjs/throttler';
import { LogsModule } from './logs/logs.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PdfModule } from './pdf/pdf.module';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';


@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 30,
    }),
    TypeOrmModule.forRoot(db_config),
    ScheduleModule.forRoot(),
    AuthModule,
    // DatabaseModule,
    PdfModule,
    UserModule,
    ResumeModule,
    FileModule,
    OrganisationModule,
    HiringModule,
    NotificationModule,
    LookupModule,
    StaffModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
