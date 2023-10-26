"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auth_module_1 = require("./auth/auth.module");
const loggor_middleware_1 = require("./common/loggor.middleware");
const user_module_1 = require("./user/user.module");
const resume_module_1 = require("./resume/resume.module");
const ormconfig_1 = require("./config/ormconfig");
const file_module_1 = require("./file/file.module");
const organisation_module_1 = require("./organisation/organisation.module");
const hiring_module_1 = require("./hiring/hiring.module");
const notification_module_1 = require("./notification/notification.module");
const lookup_module_1 = require("./lookup/lookup.module");
const app_service_1 = require("./app.service");
const staff_module_1 = require("./staff/staff.module");
const core_1 = require("@nestjs/core");
const ThrottlerBehindProxyGuard_1 = require("./guards/ThrottlerBehindProxyGuard");
const throttler_1 = require("@nestjs/throttler");
const logs_module_1 = require("./logs/logs.module");
const schedule_1 = require("@nestjs/schedule");
const pdf_module_1 = require("./pdf/pdf.module");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    configure(consumer) {
        consumer.apply(loggor_middleware_1.LoggerMiddleware).forRoutes('/');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot({
                ttl: 30,
                limit: 30,
            }),
            typeorm_1.TypeOrmModule.forRoot(ormconfig_1.default),
            schedule_1.ScheduleModule.forRoot(),
            auth_module_1.AuthModule,
            pdf_module_1.PdfModule,
            user_module_1.UserModule,
            resume_module_1.ResumeModule,
            file_module_1.FileModule,
            organisation_module_1.OrganisationModule,
            hiring_module_1.HiringModule,
            notification_module_1.NotificationModule,
            lookup_module_1.LookupModule,
            staff_module_1.StaffModule,
            logs_module_1.LogsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: ThrottlerBehindProxyGuard_1.ThrottlerBehindProxyGuard,
            },
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map