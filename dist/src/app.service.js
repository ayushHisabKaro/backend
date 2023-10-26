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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendanceType_entity_1 = require("./staff/entities/attendanceType.entity");
const entity_attribute_types_1 = require("./types/entity.attribute.types");
const role_entity_1 = require("./user/entities/role.entity");
const UserLanguage_1 = require("./user/entities/UserLanguage");
const dotenv = require("dotenv");
dotenv.config();
let AppService = class AppService {
    constructor(roleRepository, userLanguageRepository, attendanceTypeRepository, dataSource) {
        this.roleRepository = roleRepository;
        this.userLanguageRepository = userLanguageRepository;
        this.attendanceTypeRepository = attendanceTypeRepository;
        this.dataSource = dataSource;
        this.db = process.env.ENV === 'PROD' ? 'hk_prod' : 'hzk';
    }
    getHello() {
        return 'Hello World!';
    }
    generateOTP() {
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    async addDefaultData() {
        const roles = Object.values(entity_attribute_types_1.Roles).map((i) => this.roleRepository.create({ id: null, name: i }));
        await this.roleRepository
            .createQueryBuilder('roles')
            .insert()
            .values(roles)
            .orIgnore()
            .execute();
        const UserLanguages = {
            en: {
                name: 'ENGLISH',
                code: 'en',
            },
            hi: {
                name: 'HINDI',
                code: 'hi',
            },
        };
        const language = Object.values(UserLanguages).map((i) => this.userLanguageRepository.create(Object.assign({ id: null }, i)));
        await this.userLanguageRepository
            .createQueryBuilder('language')
            .insert()
            .values(language)
            .orIgnore()
            .execute();
        let attendanceTypesData = Object.values(entity_attribute_types_1.attendanceTypes).map((type) => this.attendanceTypeRepository.create({ name: type }));
        await this.attendanceTypeRepository.save(attendanceTypesData);
    }
    async getUserReport() {
        const res = await this.dataSource.query(`SELECT 
      user.phoneNumber, user.email, user.created_at,
        CASE WHEN user.roleId = 1 THEN 'Employee' ELSE 'Business' END as Role, 
        resume.id as resume -- CASE WHEN resume.id = null THEN 'N/A' ELSE 'Created' END as Resume  
        FROM ${this.db}.user 
      LEFT JOIN ${this.db}.resume ON user.id = resume.userId 
      where user.created_at > "2023-03-12";`);
        return res;
    }
    async getOrgReport() {
        const res = await this.dataSource.query(`SELECT
      organisation.name as organisationName,
        user.phoneNumber as OwnerPhoneNumber,
        count(staff.id) as staffCount,
        count(job.id) as jobCount,
        organisation.created_at created_at
        FROM ${this.db}.organisation
        LEFT JOIN ${this.db}.staff on staff.organisationId = organisation.id
        LEFT JOIN ${this.db}.user on user.id = organisation.createdById
        LEFT OUTER JOIN ${this.db}.job on job.organisationId = organisation.id
        where organisation.created_at > "2023-03-12"
        GROUP BY organisation.id;`);
        return res;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(UserLanguage_1.default)),
    __param(2, (0, typeorm_1.InjectRepository)(attendanceType_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map