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
exports.CreatePaymentDto = exports.GetHomePageStaffDto = exports.PayrollUpdateDto = exports.ConnectStaffDto = exports.CreateStaffDto = exports.createMonthlyAdvance = exports.CreateStaffAdvanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const entity_attribute_types_1 = require("../../types/entity.attribute.types");
class CreateStaffAdvanceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffAdvanceDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffAdvanceDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-10-01' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStaffAdvanceDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateStaffAdvanceDto.prototype, "sameMonth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateStaffAdvanceDto.prototype, "totalMonths", void 0);
exports.CreateStaffAdvanceDto = CreateStaffAdvanceDto;
class createMonthlyAdvance {
}
exports.createMonthlyAdvance = createMonthlyAdvance;
class CreateStaffDto {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                amount: 10000,
                interestRate: 4.5,
                startDate: '2022-10-01',
                sameMonth: false,
                totalMonths: 10,
            },
        ],
    }),
    (0, class_transformer_1.Type)(() => CreateStaffAdvanceDto),
    __metadata("design:type", Array)
], CreateStaffDto.prototype, "advance", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "organisationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "organisationBranchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test Staff 1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStaffDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9090909090' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStaffDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "salary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "hra", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'month' }),
    (0, class_validator_1.IsIn)(Object.values(entity_attribute_types_1.SalaryIntervals)),
    __metadata("design:type", String)
], CreateStaffDto.prototype, "salaryInterval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStaffDto.prototype, "openTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '19:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStaffDto.prototype, "closeTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:30' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStaffDto.prototype, "markLateAfter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "weekelyOff1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "weekelyOff2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "specialAllowance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "Bonus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "nightAllowance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "overTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStaffDto.prototype, "other", void 0);
exports.CreateStaffDto = CreateStaffDto;
class ConnectStaffDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ConnectStaffDto.prototype, "organisationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '909090' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 6),
    __metadata("design:type", String)
], ConnectStaffDto.prototype, "pin", void 0);
exports.ConnectStaffDto = ConnectStaffDto;
class PayrollUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-12-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PayrollUpdateDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PayrollUpdateDto.prototype, "salary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PayrollUpdateDto.prototype, "hra", void 0);
exports.PayrollUpdateDto = PayrollUpdateDto;
class GetHomePageStaffDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-11-08T18:30:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetHomePageStaffDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-11-09T18:30:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetHomePageStaffDto.prototype, "end", void 0);
exports.GetHomePageStaffDto = GetHomePageStaffDto;
class CreatePaymentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "monthlyAdvanceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
exports.CreatePaymentDto = CreatePaymentDto;
//# sourceMappingURL=create-staff.dto.js.map