"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffModule = void 0;
const common_1 = require("@nestjs/common");
const staff_service_1 = require("./staff.service");
const staff_controller_1 = require("./staff.controller");
const typeorm_1 = require("@nestjs/typeorm");
const staff_entity_1 = require("./entities/staff.entity");
const staffAttendance_entity_1 = require("./entities/staffAttendance.entity");
const staffAdvance_entity_1 = require("./entities/staffAdvance.entity");
const attendanceType_entity_1 = require("./entities/attendanceType.entity");
const notification_module_1 = require("../notification/notification.module");
const organisation_module_1 = require("../organisation/organisation.module");
const logs_module_1 = require("../logs/logs.module");
const payrollApplied_entity_1 = require("./entities/payrollApplied.entity");
const staffMonthlyAdvance_1 = require("./entities/staffMonthlyAdvance");
const payrollDefault_entity_1 = require("./entities/payrollDefault.entity");
const staffMonthlyAdvancePayment_1 = require("./entities/staffMonthlyAdvancePayment");
const staffWeeklyOff_entity_1 = require("./entities/staffWeeklyOff.entity");
let StaffModule = class StaffModule {
};
StaffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                staff_entity_1.default,
                staffAttendance_entity_1.default,
                attendanceType_entity_1.default,
                staffAdvance_entity_1.default,
                payrollApplied_entity_1.default,
                payrollDefault_entity_1.default,
                staffMonthlyAdvance_1.default,
                staffMonthlyAdvancePayment_1.default,
                staffWeeklyOff_entity_1.default,
            ]),
            notification_module_1.NotificationModule,
            logs_module_1.LogsModule,
            (0, common_1.forwardRef)(() => organisation_module_1.OrganisationModule),
        ],
        controllers: [staff_controller_1.StaffController],
        providers: [staff_service_1.StaffService],
        exports: [typeorm_1.TypeOrmModule, staff_service_1.StaffService],
    })
], StaffModule);
exports.StaffModule = StaffModule;
//# sourceMappingURL=staff.module.js.map