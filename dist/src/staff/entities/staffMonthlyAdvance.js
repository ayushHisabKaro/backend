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
const staffAdvance_entity_1 = require("./staffAdvance.entity");
const staffMonthlyAdvancePayment_1 = require("./staffMonthlyAdvancePayment");
let StaffMonthlyAdvance = class StaffMonthlyAdvance {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffMonthlyAdvance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staffAdvance_entity_1.default, (staffAdvance) => staffAdvance.monthlyAdvance),
    __metadata("design:type", staffAdvance_entity_1.default)
], StaffMonthlyAdvance.prototype, "staffAdvance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], StaffMonthlyAdvance.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StaffMonthlyAdvance.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staffMonthlyAdvancePayment_1.default, (StaffMonthlyAdvancePayment) => StaffMonthlyAdvancePayment.staffMonthlyAdvance),
    __metadata("design:type", Array)
], StaffMonthlyAdvance.prototype, "monthlyAdvancePayment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StaffMonthlyAdvance.prototype, "createdAt", void 0);
StaffMonthlyAdvance = __decorate([
    (0, typeorm_1.Entity)()
], StaffMonthlyAdvance);
exports.default = StaffMonthlyAdvance;
//# sourceMappingURL=staffMonthlyAdvance.js.map