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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const otp_1 = require("./entities/otp");
let OtpService = class OtpService {
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    async setOtp(phoneNumber, otp) {
        return await this.otpRepository
            .createQueryBuilder()
            .insert()
            .values({ id: null, phoneNumber, otp })
            .orUpdate(['otp'], ['phoneNumber'])
            .setParameter('otp', otp)
            .execute();
    }
    async getOtpUser(phoneNumber, otp) {
        return (await this.otpRepository
            .createQueryBuilder('otp')
            .where('otp.phoneNumber = :phoneNumber', { phoneNumber })
            .andWhere('otp.otp = :otp', { otp })
            .getOne())
            ? true
            : false;
    }
    async deleteOtpUser(phoneNumber, otp) {
        return await this.otpRepository
            .createQueryBuilder('otp')
            .where('phoneNumber = :phoneNumber', { phoneNumber })
            .andWhere('otp = :otp', { otp })
            .delete()
            .execute();
    }
};
OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(otp_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OtpService);
exports.OtpService = OtpService;
//# sourceMappingURL=otp.service.js.map