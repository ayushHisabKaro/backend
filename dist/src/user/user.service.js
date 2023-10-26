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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_guard_1 = require("../auth/role.guard");
const role_entity_1 = require("./entities/role.entity");
const UserLanguage_1 = require("./entities/UserLanguage");
let UserService = class UserService {
    constructor(userRepository, roleRepository, userLanguageRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userLanguageRepository = userLanguageRepository;
    }
    create(data) {
        const user = this.userRepository.create(data);
        return user;
    }
    async save(data) {
        return await this.userRepository.save(data);
    }
    async createLanguage(data) {
        return await this.userLanguageRepository.save(data);
    }
    async findAll() {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .getMany();
    }
    async findOneByEmail(email) {
        return await this.userRepository.findOne({ where: { email: email } });
    }
    async findOneByEmailExceptAndThrow(email, userId) {
        const result = await this.userRepository.findOne({
            where: { email: email, id: (0, typeorm_1.Not)(userId) },
            select: ['email'],
        });
        if (result) {
            throw new common_1.BadRequestException('Email already exists');
        }
        return result;
    }
    async findOneByPhoneNumber(phoneNumber) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.phoneNumber = :phoneNumber', { phoneNumber })
            .getOne();
        return user;
    }
    async findOneByBothPhoneNumber(phoneNumber) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.phoneNumber = :phoneNumber', { phoneNumber })
            .orWhere('user.alternatePhoneNumber = :alternatePhoneNumber', {
            alternatePhoneNumber: phoneNumber,
        })
            .getOne();
        return user;
    }
    async findOneByBothPhoneNumbersExceptAndThrow(phoneNumber, userId) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.phoneNumber', 'user.alternatePhoneNumber'])
            .where('user.id != :userId', { userId })
            .andWhere(new typeorm_1.Brackets((qb) => {
            qb.where('user.phoneNumber = :phoneNumber', { phoneNumber }).orWhere('user.alternatePhoneNumber = :alternatePhoneNumber', {
                alternatePhoneNumber: phoneNumber,
            });
        }))
            .getOne();
        if (user) {
            throw new common_1.BadRequestException('Phone Number already exists');
        }
        return user;
    }
    async findManyByBothPhoneNumbers(phoneNumbers) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.phoneNumber', 'user.alternatePhoneNumber'])
            .where('user.phoneNumber IN (:...phoneNumbers) = :', { phoneNumbers })
            .orWhere('user.alternatePhoneNumber IN (:...alternatePhoneNumbers) = :', {
            alternatePhoneNumbers: phoneNumbers,
        })
            .getMany();
        return user;
    }
    async findByPhoneNumberWithRelations(phoneNumber) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.language', 'language')
            .where('user.phoneNumber = :phoneNumber', { phoneNumber })
            .getOne();
        if (user)
            return user;
        return null;
    }
    async findByBothPhoneNumberWithRelations(phoneNumber) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.language', 'language')
            .where('user.phoneNumber = :phoneNumber', { phoneNumber })
            .orWhere('user.alternatePhoneNumber = :alternatePhoneNumber', {
            alternatePhoneNumber: phoneNumber,
        })
            .getOne();
        if (user)
            return user;
        return null;
    }
    async createRole(createRoleDto) {
        const role = await this.roleRepository.save({ name: createRoleDto.name });
        return role;
    }
    async findAllRoles() {
        const role = await this.roleRepository.find();
        return role;
    }
    async findRoleByName(name) {
        const role = await this.roleRepository.findOne({
            where: { name: (0, typeorm_1.Raw)((n) => `LOWER(${n}) = LOWER(:name)`, { name: name }) },
        });
        if (role)
            return role;
        return null;
    }
    async findEmailExceptUser(email, userId) {
        const user = await this.userRepository.findOne({
            where: { id: (0, typeorm_1.Not)(userId), email },
        });
        return user;
    }
    async findLanguageByCode(code) {
        const language = await this.userLanguageRepository.findOne({
            where: { code: (0, typeorm_1.Raw)((n) => `LOWER(${n}) = LOWER(:code)`, { code }) },
        });
        return language;
    }
    async findLanguageByCodeOrThrow(code) {
        const language = await this.userLanguageRepository.findOne({
            where: { code: (0, typeorm_1.Raw)((n) => `LOWER(${n}) = LOWER(:code)`, { code }) },
        });
        if (!language)
            throw new common_1.BadRequestException('Language Doesnt exists.');
        return language;
    }
    async findOne(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async findOneWithRelations(id) {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.language', 'language')
            .leftJoinAndSelect('user.staff', 'staff')
            .leftJoinAndSelect('staff.organisation', 'organisation')
            .leftJoinAndSelect('staff.organisationBranch', 'organisationBranch')
            .where('user.id = :id', { id })
            .getOne();
    }
    async findOneOrThrow(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return user;
    }
    async findRoleOrFail(name) {
        const role = await this.roleRepository.findOne({ where: { name } });
        if (!role) {
            throw new common_1.BadRequestException('Role not found');
        }
        return role;
    }
    async findOneWithRole(id) {
        return await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.id = :id', { id })
            .getOne();
    }
    async update(id, data) {
        return await this.userRepository.update(id, data);
    }
    remove(id) {
        return this.userRepository.delete(id);
    }
};
UserService = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(role_entity_1.default)),
    __param(2, (0, typeorm_2.InjectRepository)(UserLanguage_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map