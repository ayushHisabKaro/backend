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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const otp_service_1 = require("./otp.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let UserController = class UserController {
    constructor(userService, otpService) {
        this.userService = userService;
        this.otpService = otpService;
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOneWithRelations(+id);
    }
    async update(req, updateUserDto) {
        const role = updateUserDto.role
            ? await this.userService.findRoleByName(updateUserDto.role)
            : req.user.role;
        if (updateUserDto.email)
            await this.userService.findOneByEmailExceptAndThrow(updateUserDto.email, req.user.id);
        if (updateUserDto.phoneNumber)
            await this.userService.findOneByBothPhoneNumbersExceptAndThrow(updateUserDto.phoneNumber, req.user.id);
        if (updateUserDto.alternatePhoneNumber)
            await this.userService.findOneByBothPhoneNumbersExceptAndThrow(updateUserDto.alternatePhoneNumber, req.user.id);
        const updateData = this.userService.create(Object.assign(Object.assign(Object.assign({}, req.user), updateUserDto), { role, id: req.user.id }));
        delete updateData.organisations;
        delete updateData.jobsApplied;
        delete updateData.jobsBookmarked;
        delete updateData.jobsShortlisted;
        return this.userService.save(updateData);
    }
    remove(req) {
        return this.userService.remove(+req.user.id);
    }
    removeById(id) {
        return this.userService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(''),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeById", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        otp_service_1.OtpService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map