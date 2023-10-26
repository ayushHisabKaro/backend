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
const staffMonthlyAdvance_1 = require("./staffMonthlyAdvance");
let StaffAdvance = class StaffAdvance {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffAdvance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StaffAdvance.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StaffAdvance.prototype, "interestRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], StaffAdvance.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], StaffAdvance.prototype, "sameMonth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StaffAdvance.prototype, "totalMonths", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staffMonthlyAdvance_1.default, (staffMonthlyAdvance) => staffMonthlyAdvance.staffAdvance),
    __metadata("design:type", Array)
], StaffAdvance.prototype, "monthlyAdvance", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.default, (staff) => staff.advance, { onDelete: 'CASCADE' }),
    __metadata("design:type", staff_entity_1.default)
], StaffAdvance.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StaffAdvance.prototype, "createdAt", void 0);
StaffAdvance = __decorate([
    (0, typeorm_1.Entity)()
], StaffAdvance);
exports.default = StaffAdvance;
//# sourceMappingURL=staffAdvance.entity.js.map