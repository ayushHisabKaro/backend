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
exports.UpdateJobDto = exports.CreateJobDto = exports.CreateJobOtherLanguage = exports.CreateJobExperienceRequired = exports.CreateJobRequiredSkill = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const entity_attribute_types_1 = require("../../types/entity.attribute.types");
class CreateJobRequiredSkill {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobRequiredSkill.prototype, "name", void 0);
exports.CreateJobRequiredSkill = CreateJobRequiredSkill;
class CreateJobExperienceRequired {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobExperienceRequired.prototype, "name", void 0);
exports.CreateJobExperienceRequired = CreateJobExperienceRequired;
class CreateJobOtherLanguage {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobOtherLanguage.prototype, "name", void 0);
exports.CreateJobOtherLanguage = CreateJobOtherLanguage;
class CreateJobDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mid-level UX Designer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "organisationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 11 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "organisationBranchId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test address city, state 543210' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'gujarat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'surat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123456 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "pinCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bhimrad canal' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "landmark", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "minSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: entity_attribute_types_1.SalaryIntervals.MONTH }),
    (0, class_validator_1.IsIn)(Object.values(entity_attribute_types_1.SalaryIntervals)),
    __metadata("design:type", String)
], CreateJobDto.prototype, "minSalaryInterval", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 30000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "maxSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: entity_attribute_types_1.SalaryIntervals.MONTH }),
    (0, class_validator_1.IsIn)(Object.values(entity_attribute_types_1.SalaryIntervals)),
    __metadata("design:type", String)
], CreateJobDto.prototype, "maxSalaryInterval", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 1000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "minIncentive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: entity_attribute_types_1.SalaryIntervals.MONTH }),
    (0, class_validator_1.IsIn)(Object.values(entity_attribute_types_1.SalaryIntervals)),
    __metadata("design:type", String)
], CreateJobDto.prototype, "minIncentiveInterval", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 3000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "maxIncentive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:30' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:30' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateJobDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: entity_attribute_types_1.SalaryIntervals.MONTH }),
    (0, class_validator_1.IsIn)(Object.values(entity_attribute_types_1.SalaryIntervals)),
    __metadata("design:type", String)
], CreateJobDto.prototype, "maxIncentiveInterval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Full Time' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "jobTimingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-10-01' }),
    __metadata("design:type", Date)
], CreateJobDto.prototype, "applyBeforeDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye? We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you? We're looking for a like-minded",
    }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [{ name: 'Photoshop' }, { name: 'Illustrator' }],
    }),
    (0, class_transformer_1.Type)(() => CreateJobRequiredSkill),
    __metadata("design:type", Array)
], CreateJobDto.prototype, "requiredSkills", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [{ name: 'Experienced' }],
    }),
    (0, class_transformer_1.Type)(() => CreateJobExperienceRequired),
    __metadata("design:type", Array)
], CreateJobDto.prototype, "experienceRequired", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Halka Engllish' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "englishLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9090909090' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'some discription' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jobEmail@gmail.com' }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "emailAddress", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [{ name: 'Hindi' }, { name: 'Gujarati' }],
    }),
    (0, class_transformer_1.Type)(() => CreateJobOtherLanguage),
    __metadata("design:type", Array)
], CreateJobDto.prototype, "otherLanguages", void 0);
exports.CreateJobDto = CreateJobDto;
class UpdateJobDto extends (0, swagger_1.PartialType)(CreateJobDto) {
}
exports.UpdateJobDto = UpdateJobDto;
//# sourceMappingURL=create-job.dto.js.map