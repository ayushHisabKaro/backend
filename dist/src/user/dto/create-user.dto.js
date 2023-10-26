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
exports.LoginWithOtpDto = exports.SendOtpDto = exports.CreateUserDto = exports.CreateLanguageDto = exports.CreateRoleDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRoleDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
exports.CreateRoleDto = CreateRoleDto;
class CreateLanguageDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'English' }),
    __metadata("design:type", String)
], CreateLanguageDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'en' }),
    __metadata("design:type", String)
], CreateLanguageDto.prototype, "code", void 0);
exports.CreateLanguageDto = CreateLanguageDto;
class CreateUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
exports.CreateUserDto = CreateUserDto;
class SendOtpDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 10),
    (0, swagger_1.ApiProperty)({ example: '9099746341' }),
    __metadata("design:type", String)
], SendOtpDto.prototype, "phoneNumber", void 0);
exports.SendOtpDto = SendOtpDto;
class LoginWithOtpDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: '9099746341' }),
    __metadata("design:type", String)
], LoginWithOtpDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(4, 4),
    (0, swagger_1.ApiProperty)({ example: '4204' }),
    __metadata("design:type", String)
], LoginWithOtpDto.prototype, "otp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, common_1.Optional)(),
    (0, swagger_1.ApiProperty)({ example: 'en' }),
    __metadata("design:type", String)
], LoginWithOtpDto.prototype, "localization", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 1.1 }),
    __metadata("design:type", Number)
], LoginWithOtpDto.prototype, "appVersion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'samsung' }),
    __metadata("design:type", String)
], LoginWithOtpDto.prototype, "deviceName", void 0);
exports.LoginWithOtpDto = LoginWithOtpDto;
//# sourceMappingURL=create-user.dto.js.map