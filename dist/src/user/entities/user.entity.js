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
exports.User = void 0;
const resume_entity_1 = require("../../resume/entities/resume.entity");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
const organisation_entity_1 = require("../../organisation/entities/organisation.entity");
const organisationPartner_entity_1 = require("../../organisation/entities/organisationPartner.entity");
const UserLanguage_1 = require("./UserLanguage");
const jobApplied_entity_1 = require("../../hiring/entities/jobApplied.entity");
const jobBookmark_entity_1 = require("../../hiring/entities/jobBookmark.entity");
const jobShortlisted_entity_1 = require("../../hiring/entities/jobShortlisted.entity");
const notification_entity_1 = require("../../notification/entities/notification.entity");
const staff_entity_1 = require("../../staff/entities/staff.entity");
const staffAttendance_entity_1 = require("../../staff/entities/staffAttendance.entity");
const organisationJoinRequest_entity_1 = require("../../organisation/entities/organisationJoinRequest.entity");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.default, (role) => role.users),
    __metadata("design:type", role_entity_1.default)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => resume_entity_1.Resume, (resume) => resume.user),
    __metadata("design:type", resume_entity_1.Resume)
], User.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organisation_entity_1.default, (organisation) => organisation.createdBy),
    __metadata("design:type", Array)
], User.prototype, "organisations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organisationPartner_entity_1.default, (organisationPartner) => organisationPartner.user),
    __metadata("design:type", Array)
], User.prototype, "organisationPartner", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "alternatePhoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserLanguage_1.default, (language) => language.users),
    __metadata("design:type", UserLanguage_1.default)
], User.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "appVersion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "deviceName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entity_1.default, (staff) => staff.user),
    __metadata("design:type", Array)
], User.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobApplied_entity_1.default, (jobApplied) => jobApplied.user),
    __metadata("design:type", Array)
], User.prototype, "jobsApplied", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobBookmark_entity_1.default, (jobBookmarked) => jobBookmarked.user),
    __metadata("design:type", Array)
], User.prototype, "jobsBookmarked", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobShortlisted_entity_1.default, (jobShortlisted) => jobShortlisted.user),
    __metadata("design:type", Array)
], User.prototype, "jobsShortlisted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.default, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organisationJoinRequest_entity_1.default, (organisationJoinRequest) => organisationJoinRequest.user),
    __metadata("design:type", Array)
], User.prototype, "organisationJoinRequest", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staffAttendance_entity_1.default, (attendance) => attendance.markedBy),
    __metadata("design:type", Array)
], User.prototype, "marksAttendance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map