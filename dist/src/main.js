"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_pipe_1 = require("./service/validation.pipe");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("./config/swagger");
const errors_interceptor_1 = require("./common/errors.interceptor");
const file_module_1 = require("./file/file.module");
const user_module_1 = require("./user/user.module");
const typeorm_pagination_1 = require("typeorm-pagination");
const express = require("express");
const path = require("path");
const resume_module_1 = require("./resume/resume.module");
const organisation_module_1 = require("./organisation/organisation.module");
const transform_interceptor_1 = require("./common/transform.interceptor");
const hiring_module_1 = require("./hiring/hiring.module");
const notification_module_1 = require("./notification/notification.module");
const lookup_module_1 = require("./lookup/lookup.module");
const common_1 = require("@nestjs/common");
const logs_module_1 = require("./logs/logs.module");
const staff_module_1 = require("./staff/staff.module");
const ormconfig_1 = require("./config/ormconfig");
const employeeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTY2ODE4MDEyMSwiZXhwIjoxNjY5MDQ0MTIxfQ.B1Lrujyj5C04x2VphlG88ugXcgVVm_qKGHvCzPAKqqs';
const jashBusinessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjc1MDc0Mjg4LCJleHAiOjE2NzU5MzgyODh9.X0IdX5jQRbynFpybML5zjYTGwdEcky8YYo4RiC1-1BI';
const jashBusinessTokenLIVE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTY3NDk3ODgzMCwiZXhwIjoxNjc1ODQyODMwfQ.3-Ik7TN4wG0aD7g0K3ybppcUlwZX0PgPc4uwvMZStW8';
const DenishBusinessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5NTI5ODQxLCJleHAiOjE2NzAzOTM4NDF9.g-N7LjtIBuJvsJ6Gm50nknIxczV3WHrvZ3jKVHE-0Ig';
async function bootstrap() {
    const port = +process.env.PORT || 4000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
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
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.useGlobalInterceptors(new errors_interceptor_1.ErrorsInterceptor());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.setViewEngine('ejs');
    app.use(typeorm_pagination_1.pagination);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    console.log(path.join(__dirname + '/../static'));
    app.use(express.static(path.join(__dirname + '/../static')));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ecommerce')
        .setDescription(`jashBusinessToken 9099746341 => ${jashBusinessToken} <br> EMPLOYEE 9797979797  => ${employeeToken} <br> DenishBusinessToken => ${DenishBusinessToken} <br> LiveJashBusinessToken => ${jashBusinessTokenLIVE}`)
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        include: [
            app_module_1.AppModule,
            file_module_1.FileModule,
            user_module_1.UserModule,
            resume_module_1.ResumeModule,
            organisation_module_1.OrganisationModule,
            staff_module_1.StaffModule,
            hiring_module_1.HiringModule,
            notification_module_1.NotificationModule,
            lookup_module_1.LookupModule,
            logs_module_1.LogsModule,
        ],
    });
    let swaggerEndpoint = 'swag420';
    if (ormconfig_1.ENV.ENV === 'PROD') {
        swaggerEndpoint = 'swag4269docs';
    }
    swagger_1.SwaggerModule.setup(swaggerEndpoint, app, document, {
        customCss: swagger_2.swaggerCss,
    });
    await app.listen(port).then(() => {
        console.log('🚀🚀App started on port ' + port);
        console.log(`${port === 4000
            ? `http://localhost:${port}/swag420`
            : 'https://hzk.dropsupply.in/swag420'}`);
        console.log('TIMEZONE = ', Intl.DateTimeFormat().resolvedOptions().timeZone);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map