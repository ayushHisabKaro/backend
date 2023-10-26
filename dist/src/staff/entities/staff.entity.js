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
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const organisation_entity_1 = require("../../organisation/entities/organisation.entity");
const organisationBranch_entity_1 = require("../../organisation/entities/organisationBranch.entity");
const staffAdvance_entity_1 = require("./staffAdvance.entity");
const staffAttendance_entity_1 = require("./staffAttendance.entity");
const payrollApplied_entity_1 = require("./payrollApplied.entity");
const payrollDefault_entity_1 = require("./payrollDefault.entity");
const staffWeeklyOff_entity_1 = require("./staffWeeklyOff.entity");
let Staff = class Staff {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.staff),
    __metadata("design:type", user_entity_1.User)
], Staff.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staffAttendance_entity_1.default, (staffAttendance) => staffAttendance.staff),
    __metadata("design:type", Array)
], Staff.prototype, "attendance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staffAdvance_entity_1.default, (staffAdvance) => staffAdvance.staff),
    __metadata("design:type", Array)
], Staff.prototype, "advance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organisation_entity_1.default, (organisation) => organisation.staff),
    __metadata("design:type", organisation_entity_1.default)
], Staff.prototype, "organisation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organisationBranch_entity_1.default, (organisationBranch) => organisationBranch.staff),
    __metadata("design:type", organisationBranch_entity_1.default)
], Staff.prototype, "organisationBranch", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "salaryInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "openTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "closeTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time', nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "markLateAfter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staffWeeklyOff_entity_1.default, (weeklyOff) => weeklyOff.staff),
    __metadata("design:type", Array)
], Staff.prototype, "weeklyOff", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Staff.prototype, "weekelyOffTillNow", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "pin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "companyMobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "joiningDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "mobileHandset", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "laptop", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Staff.prototype, "otherInformation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payrollDefault_entity_1.default, (payroll) => payroll.staff),
    __metadata("design:type", Array)
], Staff.prototype, "payrollDefault", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payrollApplied_entity_1.default, (payroll) => payroll.staff),
    __metadata("design:type", Array)
], Staff.prototype, "payrollApplied", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Staff.prototype, "createdAt", void 0);
Staff = __decorate([
    (0, typeorm_1.Entity)()
], Staff);
exports.default = Staff;
//# sourceMappingURL=staff.entity.js.map