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
exports.CreateOrganisationJoinRequest = exports.CreateOrganisationDto = exports.CreateOrganisationBranch = exports.CreateOrganisationShift = exports.CreateOrganisationPartner = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateOrganisationPartner {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationPartner.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationPartner.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrganisationPartner.prototype, "userId", void 0);
exports.CreateOrganisationPartner = CreateOrganisationPartner;
class CreateOrganisationShift {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationShift.prototype, "openTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '18:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationShift.prototype, "closeTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:30' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationShift.prototype, "markLateAfter", void 0);
exports.CreateOrganisationShift = CreateOrganisationShift;
class CreateOrganisationBranch {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrganisationBranch.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test Branch' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationBranch.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test address city, state 543210' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationBranch.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'gujarat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationBranch.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'surat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationBranch.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationBranch.prototype, "pinCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bhimrad canal' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationBranch.prototype, "landmark", void 0);
exports.CreateOrganisationBranch = CreateOrganisationBranch;
class CreateOrganisationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Organisation 1' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://www.realserve.com.au/wp-content/uploads/Realserve-Sample-of-a-Gross-Floor-Area-Plan-for-Commercial-Property-building-1.jpg',
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test address city, state 543210' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'gujarat' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'surat' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "pinCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bhimrad canal' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "landmark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrganisationDto.prototype, "weekelyOff1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOrganisationDto.prototype, "weekelyOff2", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                openTime: '10:30',
                closeTime: '10:30',
                markLateAfter: '10:30',
            },
        ],
    }),
    (0, class_transformer_1.Type)(() => CreateOrganisationShift),
    __metadata("design:type", Array)
], CreateOrganisationDto.prototype, "shifts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Information Technology' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "industrySector", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                name: 'Main Branch',
                address: 'Test address city, state 543210',
                state: 'gujarat',
                city: 'surat',
                landmark: 'bhimrad canal',
            },
        ],
    }),
    (0, class_transformer_1.Type)(() => CreateOrganisationBranch),
    __metadata("design:type", Array)
], CreateOrganisationDto.prototype, "branch", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WERTYUIOP' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "gstNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://img.indiafilings.com/learn/wp-content/uploads/2017/07/12010421/GST-Registration-Certificate-Sample-Annexure-A.png',
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "gstFileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BORPJ1523G' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "panNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://upload.wikimedia.org/wikipedia/commons/3/31/A_sample_of_Permanent_Account_Number_%28PAN%29_Card.jpg',
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganisationDto.prototype, "panFileUrl", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [
            { name: 'Partner 1', phoneNumber: '9090909091' },
            { name: 'Partner 2', phoneNumber: '9090909092' },
        ],
    }),
    (0, class_transformer_1.Type)(() => CreateOrganisationPartner),
    __metadata("design:type", Array)
], CreateOrganisationDto.prototype, "partners", void 0);
exports.CreateOrganisationDto = CreateOrganisationDto;
class CreateOrganisationJoinRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateOrganisationJoinRequest.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123456' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOrganisationJoinRequest.prototype, "organisationBranchCode", void 0);
exports.CreateOrganisationJoinRequest = CreateOrganisationJoinRequest;
//# sourceMappingURL=create-organisation.dto.js.map