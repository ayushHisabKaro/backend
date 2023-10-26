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
const typeorm_1 = require("typeorm");
const staffAttendance_entity_1 = require("./staffAttendance.entity");
let AttendanceType = class AttendanceType {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AttendanceType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], AttendanceType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staffAttendance_entity_1.default, (staffAttendance) => staffAttendance.attendanceType),
    __metadata("design:type", Array)
], AttendanceType.prototype, "staffAttendance", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AttendanceType.prototype, "createdAt", void 0);
AttendanceType = __decorate([
    (0, typeorm_1.Entity)()
], AttendanceType);
exports.default = AttendanceType;
//# sourceMappingURL=attendanceType.entity.js.map