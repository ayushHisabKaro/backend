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
exports.UpdateWeeklyOffDto = exports.UpdateStaffDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_staff_dto_1 = require("./create-staff.dto");
const class_validator_1 = require("class-validator");
class UpdateStaffDto extends (0, swagger_1.PartialType)(create_staff_dto_1.CreateStaffDto) {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: '2022-11' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStaffDto.prototype, "weeklyOffMonth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: '9090909090' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStaffDto.prototype, "companyMobileNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'IT' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStaffDto.prototype, "department", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: '2023-04-13' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStaffDto.prototype, "joiningDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'mobileHandset' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStaffDto.prototype, "mobileHandset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'laptop' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStaffDto.prototype, "laptop", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'otherInformation' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStaffDto.prototype, "otherInformation", void 0);
exports.UpdateStaffDto = UpdateStaffDto;
class UpdateWeeklyOffDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateWeeklyOffDto.prototype, "weekelyOff1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateWeeklyOffDto.prototype, "weekelyOff2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-11' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWeeklyOffDto.prototype, "month", void 0);
exports.UpdateWeeklyOffDto = UpdateWeeklyOffDto;
//# sourceMappingURL=update-staff.dto.js.map