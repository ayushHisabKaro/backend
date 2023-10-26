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
exports.GetAttendanceDto = exports.UpdateAttendanceDto = exports.CreateAttendanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const entity_attribute_types_1 = require("../../types/entity.attribute.types");
class CreateAttendanceDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=435&q=80',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "photoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 21.141681 }),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreateAttendanceDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 72.783598 }),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreateAttendanceDto.prototype, "lng", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ example: 'surat' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PRESENT' }),
    (0, class_validator_1.IsIn)(Object.values(entity_attribute_types_1.attendanceTypes).map((i) => i)),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "attendanceType", void 0);
exports.CreateAttendanceDto = CreateAttendanceDto;
class UpdateAttendanceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PRESENT' }),
    (0, class_validator_1.IsIn)(Object.values(entity_attribute_types_1.attendanceTypes).map((i) => i)),
    __metadata("design:type", String)
], UpdateAttendanceDto.prototype, "attendanceType", void 0);
exports.UpdateAttendanceDto = UpdateAttendanceDto;
class GetAttendanceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], GetAttendanceDto.prototype, "staffId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-11-08T18:30:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetAttendanceDto.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2022-11-09T18:30:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], GetAttendanceDto.prototype, "end", void 0);
exports.GetAttendanceDto = GetAttendanceDto;
//# sourceMappingURL=create-attendance.dto.js.map