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
exports.UpdateOrganisationDto = exports.UpdateOrganisationPartner = exports.updateOrganisationShift = exports.UpdateOrganisationBranch = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_organisation_dto_1 = require("./create-organisation.dto");
class UpdateOrganisationBranch {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateOrganisationBranch.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrganisationBranch.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test address city, state 543210' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrganisationBranch.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'gujarat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrganisationBranch.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'surat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrganisationBranch.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 123456 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrganisationBranch.prototype, "pinCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bhimrad canal' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrganisationBranch.prototype, "landmark", void 0);
exports.UpdateOrganisationBranch = UpdateOrganisationBranch;
class updateOrganisationShift {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateOrganisationShift.prototype, "openTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '18:00' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateOrganisationShift.prototype, "closeTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10:30' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateOrganisationShift.prototype, "markLateAfter", void 0);
exports.updateOrganisationShift = updateOrganisationShift;
class UpdateOrganisationPartner {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateOrganisationPartner.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrganisationPartner.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOrganisationPartner.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateOrganisationPartner.prototype, "userId", void 0);
exports.UpdateOrganisationPartner = UpdateOrganisationPartner;
class UpdateOrganisationDto extends (0, swagger_1.PartialType)(create_organisation_dto_1.CreateOrganisationDto) {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [
            {
                id: 1,
                name: 'Main Branch',
                address: 'Test address city, state 543210',
                state: 'gujarat',
                city: 'surat',
                pinCode: '123456',
                landmark: 'bhimrad canal',
            },
        ],
    }),
    (0, class_transformer_1.Type)(() => UpdateOrganisationBranch),
    __metadata("design:type", Array)
], UpdateOrganisationDto.prototype, "branch", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, swagger_1.ApiProperty)({
        example: [
            { name: 'Partner 1', phoneNumber: '9090909091' },
            { name: 'Partner 2', phoneNumber: '9090909092' },
        ],
    }),
    (0, class_transformer_1.Type)(() => UpdateOrganisationPartner),
    __metadata("design:type", Array)
], UpdateOrganisationDto.prototype, "partners", void 0);
exports.UpdateOrganisationDto = UpdateOrganisationDto;
//# sourceMappingURL=update-organisation.dto.js.map