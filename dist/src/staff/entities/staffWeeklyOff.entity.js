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
const staff_entity_1 = require("./staff.entity");
let StaffWeeklyOff = class StaffWeeklyOff {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffWeeklyOff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.default, (staff) => staff.weeklyOff, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", staff_entity_1.default)
], StaffWeeklyOff.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StaffWeeklyOff.prototype, "weeklyOff1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StaffWeeklyOff.prototype, "weeklyOff2", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StaffWeeklyOff.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StaffWeeklyOff.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], StaffWeeklyOff.prototype, "updatedAt", void 0);
StaffWeeklyOff = __decorate([
    (0, typeorm_1.Unique)(['staff', 'month']),
    (0, typeorm_1.Entity)()
], StaffWeeklyOff);
exports.default = StaffWeeklyOff;
//# sourceMappingURL=staffWeeklyOff.entity.js.map