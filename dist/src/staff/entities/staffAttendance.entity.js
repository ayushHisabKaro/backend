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
const attendanceType_entity_1 = require("./attendanceType.entity");
const staff_entity_1 = require("./staff.entity");
let StaffAttendance = class StaffAttendance {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffAttendance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.default, (staff) => staff.attendance, { onDelete: 'CASCADE' }),
    __metadata("design:type", staff_entity_1.default)
], StaffAttendance.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.marksAttendance),
    __metadata("design:type", user_entity_1.User)
], StaffAttendance.prototype, "markedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StaffAttendance.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], StaffAttendance.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true }),
    __metadata("design:type", Number)
], StaffAttendance.prototype, "lng", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], StaffAttendance.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attendanceType_entity_1.default, (attendanceType) => attendanceType.staffAttendance),
    __metadata("design:type", attendanceType_entity_1.default)
], StaffAttendance.prototype, "attendanceType", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StaffAttendance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StaffAttendance.prototype, "updatedAt", void 0);
StaffAttendance = __decorate([
    (0, typeorm_1.Entity)()
], StaffAttendance);
exports.default = StaffAttendance;
//# sourceMappingURL=staffAttendance.entity.js.map