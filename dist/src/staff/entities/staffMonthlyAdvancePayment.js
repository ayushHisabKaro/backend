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
const staffMonthlyAdvance_1 = require("./staffMonthlyAdvance");
let StaffMonthlyAdvancePayment = class StaffMonthlyAdvancePayment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffMonthlyAdvancePayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staffMonthlyAdvance_1.default, (staffMonthlyAdvance) => staffMonthlyAdvance.monthlyAdvancePayment),
    __metadata("design:type", staffMonthlyAdvance_1.default)
], StaffMonthlyAdvancePayment.prototype, "staffMonthlyAdvance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], StaffMonthlyAdvancePayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], StaffMonthlyAdvancePayment.prototype, "createdAt", void 0);
StaffMonthlyAdvancePayment = __decorate([
    (0, typeorm_1.Entity)()
], StaffMonthlyAdvancePayment);
exports.default = StaffMonthlyAdvancePayment;
//# sourceMappingURL=staffMonthlyAdvancePayment.js.map