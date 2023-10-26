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
let PayrollApplied = class PayrollApplied {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.default, (staff) => staff.payrollApplied, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", staff_entity_1.default)
], PayrollApplied.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "hra", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "specialAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "bonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "nightAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "overTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "otherAddition", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "pf", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "esi", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "tds", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], PayrollApplied.prototype, "otherDeduction", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PayrollApplied.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PayrollApplied.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PayrollApplied.prototype, "updatedAt", void 0);
PayrollApplied = __decorate([
    (0, typeorm_1.Unique)(['staff', 'month']),
    (0, typeorm_1.Entity)()
], PayrollApplied);
exports.default = PayrollApplied;
//# sourceMappingURL=payrollApplied.entity.js.map