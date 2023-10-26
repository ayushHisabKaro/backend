import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './service/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { swaggerCss } from './config/swagger';
import { ErrorsInterceptor } from './common/errors.interceptor';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { pagination } from 'typeorm-pagination';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';
import { ResumeModule } from './resume/resume.module';
import { OrganisationModule } from './organisation/organisation.module';
import { TransformInterceptor } from './common/transform.interceptor';
import { HiringModule } from './hiring/hiring.module';
import { NotificationModule } from './notification/notification.module';
import { LookupModule } from './lookup/lookup.module';
import { VersioningType } from '@nestjs/common';
import { LogsModule } from './logs/logs.module';
import { StaffModule } from './staff/staff.module';
import { ENV } from './config/ormconfig';

const employeeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTY2ODE4MDEyMSwiZXhwIjoxNjY5MDQ0MTIxfQ.B1Lrujyj5C04x2VphlG88ugXcgVVm_qKGHvCzPAKqqs';
const jashBusinessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1MDc0Mjg4LCJleHAiOjE2NzU5MzgyODh9.X0IdX5jQRbynFpybML5zjYTGwdEcky8YYo4RiC1-1BI';
const jashBusinessTokenLIVE =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTY3NDk3ODgzMCwiZXhwIjoxNjc1ODQyODMwfQ.3-Ik7TN4wG0aD7g0K3ybppcUlwZX0PgPc4uwvMZStW8';
const DenishBusinessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5NTI5ODQxLCJleHAiOjE2NzAzOTM4NDF9.g-N7LjtIBuJvsJ6Gm50nknIxczV3WHrvZ3jKVHE-0Ig';

async function bootstrap() {
  const port = +process.env.PORT || 4000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: [
        'https://hisabkaro.com/',
        'https://www.hisabkaro.com/',
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        'http://web.hisabkaro.com/',
        'http://127.0.0.1:5500',
      ],
    },
  });
  app.enableCors();
  // app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setViewEngine('ejs');
  app.use(pagination);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  console.log(path.join(__dirname + '/../static'));
  // app.enableCors();

  app.use(express.static(path.join(__dirname + '/../static')));

  const config = new DocumentBuilder()
    .setTitle('Ecommerce')
    .setDescription(
      `jashBusinessToken 9099746341 => ${jashBusinessToken} <br> EMPLOYEE 9797979797  => ${employeeToken} <br> DenishBusinessToken => ${DenishBusinessToken} <br> LiveJashBusinessToken => ${jashBusinessTokenLIVE}`,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AppModule,
      FileModule,
      UserModule,
      ResumeModule,
      OrganisationModule,
      StaffModule,
      HiringModule,
      NotificationModule,
      LookupModule,
      LogsModule,
    ],
  });

  // console.log('document', JSON.stringify(document));
  let swaggerEndpoint = 'swag420';
  if (ENV.ENV === 'PROD') {
    swaggerEndpoint = 'swag4269docs';
  }

  SwaggerModule.setup(swaggerEndpoint, app, document, {
    customCss: swaggerCss,
  });

  await app.listen(port).then(() => {
    console.log('🚀🚀App started on port ' + port);
    console.log(
      `${
        port === 4000
          ? `http://localhost:${port}/swag420`
          : 'https://hzk.dropsupply.in/swag420'
      }`,
    );
    console.log(
      'TIMEZONE = ',
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
  });
}
bootstrap();
