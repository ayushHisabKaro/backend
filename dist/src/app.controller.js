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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const axios = require('axios');
const app_service_1 = require("./app.service");
const auth_service_1 = require("./auth/auth.service");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const roles_decorator_1 = require("./auth/roles.decorator");
const logs_service_1 = require("./logs/logs.service");
const entity_attribute_types_1 = require("./types/entity.attribute.types");
const response_example_1 = require("./types/response.example");
const create_user_dto_1 = require("./user/dto/create-user.dto");
const otp_service_1 = require("./user/otp.service");
const user_service_1 = require("./user/user.service");
const organisation_service_1 = require("./organisation/organisation.service");
const json_2_csv_1 = require("json-2-csv");
let AppController = class AppController {
    constructor(authService, userService, organisationService, otpService, appService, logsService) {
        this.authService = authService;
        this.userService = userService;
        this.organisationService = organisationService;
        this.otpService = otpService;
        this.appService = appService;
        this.logsService = logsService;
    }
    createJWTBody(user) {
        return { email: user.email, id: user.id };
    }
    async sendTextLocalOtp(phoneNumber, otp) {
        const apiKey = 'NTg2NjRkNDk2ZDVhMzc3NjM3NjM2NDQ5NGQ0OTQ1NjQ=';
        const sender = 'HSBKRO';
        const number = '91' + phoneNumber;
        let applicationName = 'application name';
        const message = encodeURIComponent(`Dear Customer,
${otp} is your one time password (OTP). Please enter the OTP to proceed.

Thank you,
Team HisabKaro`);
        var url = 'http://api.textlocal.in/send/?' +
            'apiKey=' +
            apiKey +
            '&sender=' +
            sender +
            '&numbers=' +
            number +
            '&message=' +
            message;
        console.log(url);
        await axios
            .post(url)
            .then(function (response) {
            console.log('TEXTLOCAL response ', response.data);
        })
            .catch(function (error) {
            console.log('TEXTLOCAL error ', error.message);
        });
    }
    async sendOtp(body, request) {
        const liveOtp = process.env.LIVE_OTP === 'true';
        const _otp = liveOtp ? this.appService.generateOTP() : '4204';
        if (liveOtp)
            await this.sendTextLocalOtp(body.phoneNumber, _otp);
        const otp = await this.otpService.setOtp(body.phoneNumber, _otp);
        const value = [
            request.ips.join('/'),
            request.ip,
            request.header('x-forwarded-for'),
            body.phoneNumber,
        ].join(',');
        this.logsService.create({ name: entity_attribute_types_1.LogTypes.OTP, value });
        console.log(otp, _otp);
        return { success: true, message: 'Otp sent!' };
    }
    async loginWithOtp(loginWithOtpDto) {
        const { phoneNumber, otp, appVersion, deviceName } = loginWithOtpDto;
        const valid = await this.otpService.getOtpUser(phoneNumber, otp);
        if (!valid) {
            throw new common_1.BadRequestException(`Invalid OTP!`);
        }
        await this.otpService.deleteOtpUser(phoneNumber, otp);
        let isNewUser = false;
        let user = await this.userService.findByBothPhoneNumberWithRelations(phoneNumber);
        if (!user) {
            const language = await this.userService.findLanguageByCodeOrThrow(loginWithOtpDto.localization);
            const userData = this.userService.create({
                phoneNumber,
                language,
                appVersion,
                deviceName,
            });
            user = await this.userService.save(userData);
            await this.organisationService.checkOrgPartnerByUser(user);
        }
        else {
            this.userService.update(user.id, { appVersion, deviceName });
        }
        if (!user.name || !user.role) {
            isNewUser = true;
        }
        const authUser = this.authService.createJwtUser(user);
        return Object.assign(Object.assign({}, authUser), { isNewUser });
    }
    async loginWithOutOtp(loginWithOtpDto) {
        const { phoneNumber, otp } = loginWithOtpDto;
        let isNewUser = false;
        let user = await this.userService.findByBothPhoneNumberWithRelations(phoneNumber);
        if (!user) {
            throw new common_1.BadRequestException(`Invalid USER!`);
        }
        const authUser = this.authService.createJwtUser(user);
        return Object.assign(Object.assign({}, authUser), { isNewUser });
    }
    addDefaultData() {
        return this.appService.addDefaultData();
    }
    createRole(createRoleDto) {
        return this.userService.createRole(createRoleDto);
    }
    getRoles() {
        return this.userService.findAllRoles();
    }
    createLanguage(createRoleDto) {
        return this.userService.createLanguage(createRoleDto);
    }
    async me(req) {
        console.log('REQUEST user ', req.user);
        return req.user;
    }
    async setLastActive(req) {
        console.log('REQUEST user ', req.user);
        this.userService.update(req.user.id, { lastActive: new Date() });
        return req.user;
    }
    async report(req, name, res) {
        console.log('REQUEST user ', req.user);
        let result = [];
        if (name === 'user') {
            result = await this.appService.getUserReport();
        }
        else if (name === 'org') {
            result = await this.appService.getOrgReport();
        }
        const data = await (0, json_2_csv_1.json2csv)(result);
        res.attachment(`data-${name}.csv`);
        res.set('Content-Type', 'application/octet-stream');
        res.status(200).send(data);
        return result;
    }
    root() {
        return 'Hello World';
    }
};
__decorate([
    (0, throttler_1.Throttle)(1, 10),
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_sendOtpResponse } }),
    (0, common_1.Post)('auth/sendOtp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.SendOtpDto, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)('auth/loginWithOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.LoginWithOtpDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginWithOtp", null);
__decorate([
    (0, common_1.Post)('auth/loginWithoutOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.LoginWithOtpDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginWithOutOtp", null);
__decorate([
    (0, common_1.Post)('defaultDate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "addDefaultData", null);
__decorate([
    (0, common_1.Post)('role'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateRoleDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createRole", null);
__decorate([
    (0, common_1.Get)('role'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Post)('language'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateLanguageDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createLanguage", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('log/appOpened'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "setLastActive", null);
__decorate([
    (0, common_1.Get)('report/:name'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('name')),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "report", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "root", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)('App'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        organisation_service_1.OrganisationService,
        otp_service_1.OtpService,
        app_service_1.AppService,
        logs_service_1.LogsService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map