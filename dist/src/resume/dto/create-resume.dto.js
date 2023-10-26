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
exports.CreateResumeDto = exports.CreateResumeWorkExperience = exports.CreateResumeDocument = exports.CreateResumeSkills = exports.CreateResumeEducationDto = exports.CreateResumeLanguage = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const entity_attribute_types_1 = require("../../types/entity.attribute.types");
class CreateResumeLanguage {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateResumeLanguage.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeLanguage.prototype, "name", void 0);
exports.CreateResumeLanguage = CreateResumeLanguage;
class CreateResumeEducationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'GTU' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeEducationDto.prototype, "education", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeEducationDto.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeEducationDto.prototype, "to", void 0);
exports.CreateResumeEducationDto = CreateResumeEducationDto;
class CreateResumeSkills {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateResumeSkills.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeSkills.prototype, "name", void 0);
exports.CreateResumeSkills = CreateResumeSkills;
class CreateResumeDocument {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateResumeDocument.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDocument.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateResumeDocument.prototype, "url", void 0);
exports.CreateResumeDocument = CreateResumeDocument;
class CreateResumeWorkExperience {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateResumeWorkExperience.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FullStack Developer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeWorkExperience.prototype, "jobTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Zognest' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeWorkExperience.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Information Technology' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeWorkExperience.prototype, "sector", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2021-09-01T09:00.00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], CreateResumeWorkExperience.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-09-30T09:00.00.000Z' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Date)
], CreateResumeWorkExperience.prototype, "to", void 0);
exports.CreateResumeWorkExperience = CreateResumeWorkExperience;
class CreateResumeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9090909090' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'employeeTest@gmail.com' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test address city, state 543210' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'gujarat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'surat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123456 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "pinCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bhimrad canal' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "landmark", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 900000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateResumeDto.prototype, "currentSalary", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: entity_attribute_types_1.SalaryIntervals.MONTH }),
    (0, class_validator_1.IsIn)(Object.values(entity_attribute_types_1.SalaryIntervals)),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "currentSalaryInterval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateResumeDto.prototype, "currentSalaryVisibility", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'Tagda' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "englishLevel", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({ example: [{ name: 'english' }] }),
    (0, class_transformer_1.Type)(() => CreateResumeLanguage),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "otherLanguages", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({ example: [{ name: 'coding' }] }),
    (0, class_transformer_1.Type)(() => CreateResumeSkills),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [{ name: 'Experience Certificate', url: 'https://file.pdf' }],
    }),
    (0, class_transformer_1.Type)(() => CreateResumeDocument),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "documents", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                jobTitle: 'FullStack Developer',
                company: 'Zognest',
                sector: 'Information Technology',
                from: '2021-09-01T09:00.00.000Z',
                to: '2022-09-30T09:00.00.000Z',
            },
        ],
    }),
    (0, class_transformer_1.Type)(() => CreateResumeWorkExperience),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "workExperience", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                education: 'GTU',
                from: '2022',
                to: '2023',
            },
        ],
    }),
    (0, class_transformer_1.Type)(() => CreateResumeEducationDto),
    __metadata("design:type", Array)
], CreateResumeDto.prototype, "education", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'BE Computer' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "highestEducation", void 0);
exports.CreateResumeDto = CreateResumeDto;
//# sourceMappingURL=create-resume.dto.js.map