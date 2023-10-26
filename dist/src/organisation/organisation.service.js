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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organisation_entity_1 = require("./entities/organisation.entity");
const organisationBranch_entity_1 = require("./entities/organisationBranch.entity");
const organisationPartner_entity_1 = require("./entities/organisationPartner.entity");
const organisationShfit_entity_1 = require("./entities/organisationShfit.entity");
const organisationJoinRequest_entity_1 = require("./entities/organisationJoinRequest.entity");
const utils_1 = require("../common/utils");
let OrganisationService = class OrganisationService {
    constructor(organisationRepository, organisationBranchRepository, organisationShiftRepository, organisationPartnerRepository, organisationJoinRequestRepository) {
        this.organisationRepository = organisationRepository;
        this.organisationBranchRepository = organisationBranchRepository;
        this.organisationShiftRepository = organisationShiftRepository;
        this.organisationPartnerRepository = organisationPartnerRepository;
        this.organisationJoinRequestRepository = organisationJoinRequestRepository;
    }
    create(data) {
        const resume = this.organisationRepository.create(data);
        return resume;
    }
    async save(data) {
        const resume = await this.organisationRepository.save(data);
        return resume;
    }
    async createOneOrganisationBranch(data, organisationId) {
        const branchData = this.organisationBranchRepository.create(Object.assign(Object.assign({}, data), { organisation: { id: organisationId } }));
        const branch = await this.organisationBranchRepository.save(branchData);
        return branch;
    }
    async createOrganisationBranch(data, organisationId) {
        const branchData = data.map((i) => {
            const insertData = i;
            if (organisationId)
                insertData.organisation = { id: organisationId };
            return this.organisationBranchRepository.create(Object.assign({}, insertData));
        });
        const branch = await this.organisationBranchRepository.save(branchData);
        return branch;
    }
    async createOrganisationShift(data, organisationId) {
        const branchData = data.map((i) => {
            const insertData = i;
            if (organisationId)
                insertData.organisation = { id: organisationId };
            return this.organisationShiftRepository.create(Object.assign({}, insertData));
        });
        const branch = await this.organisationShiftRepository.save(branchData);
        return branch;
    }
    async createOrganisationPartner(data, organisationId) {
        const partnerData = data.map((i) => {
            const insertData = i;
            if (organisationId)
                insertData.organisation = { id: organisationId };
            const data = i;
            if (i.userId) {
                data.user = { id: i.userId };
            }
            return this.organisationPartnerRepository.create(Object.assign({}, insertData));
        });
        const partner = await this.organisationPartnerRepository.save(partnerData);
        return partner;
    }
    async createOrganisationJoinRequest(data) {
        const result = await this.organisationJoinRequestRepository.save(data);
        return result;
    }
    updatJoinReqSeenMany(ids) {
        return this.organisationJoinRequestRepository.update(ids, { seen: true });
    }
    async deleteOrganisationBranch(id) {
        const branch = await this.organisationBranchRepository.delete(id);
        return branch;
    }
    async deleteOrganisationShift(organisation) {
        const shift = await this.organisationShiftRepository
            .createQueryBuilder('organisationShift')
            .where('organisation = :id', { id: organisation.id })
            .delete()
            .execute();
        return shift;
    }
    async findAllByUser(userId) {
        const orgs = await this.organisationRepository
            .createQueryBuilder('organisation')
            .select('organisation.id')
            .leftJoinAndSelect('organisation.partners', 'partners')
            .where('partners.user = :userId', { userId })
            .getMany();
        const orgIds = orgs.map((o) => o.id);
        return await this.organisationRepository
            .createQueryBuilder('organisation')
            .leftJoinAndSelect('organisation.partners', 'partners')
            .leftJoinAndSelect('organisation.branch', 'branch')
            .leftJoinAndSelect('organisation.shifts', 'shifts')
            .where('organisation.id IN (:...userIds) ', { userIds: orgIds })
            .getMany();
    }
    async findAll() {
        return await this.organisationRepository
            .createQueryBuilder('organisation')
            .leftJoinAndSelect('organisation.partners', 'partners')
            .leftJoinAndSelect('organisation.branch', 'branch')
            .leftJoinAndSelect('organisation.shifts', 'shifts')
            .getMany();
    }
    async findAllOrganisationBranch() {
        return await this.organisationBranchRepository
            .createQueryBuilder('organisationBranch')
            .getMany();
    }
    async findOne(id) {
        const result = await this.organisationRepository
            .createQueryBuilder('organisation')
            .leftJoinAndSelect('organisation.partners', 'partners')
            .leftJoinAndSelect('organisation.branch', 'branch')
            .leftJoinAndSelect('organisation.shifts', 'shifts')
            .where('organisation.id = :id', { id })
            .getOne();
        return result;
    }
    async findPartnersByOrg(id) {
        const result = await this.organisationRepository
            .createQueryBuilder('organisation')
            .leftJoinAndSelect('organisation.partners', 'partners')
            .leftJoinAndSelect('partners.user', 'user')
            .where('organisation.id = :id', { id })
            .getOne();
        return result;
    }
    async findPartnersByPhoneNumber(phoneNumber) {
        const result = await this.organisationPartnerRepository
            .createQueryBuilder('organisationPartner')
            .leftJoinAndSelect('organisationPartner.organisation', 'organisation')
            .leftJoinAndSelect('organisationPartner.user', 'user')
            .where('organisationPartner.phoneNumber = :phoneNumber', { phoneNumber })
            .getMany();
        return result;
    }
    async checkOrgPartnerByUser(user) {
        var _a, e_1, _b, _c;
        const partners = await this.findPartnersByPhoneNumber(user.phoneNumber);
        try {
            for (var _d = true, partners_1 = __asyncValues(partners), partners_1_1; partners_1_1 = await partners_1.next(), _a = partners_1_1.done, !_a;) {
                _c = partners_1_1.value;
                _d = false;
                try {
                    const partner = _c;
                    if (!partner.user) {
                        const data = {
                            user: { id: user.id },
                        };
                        await this.updateOrgPartner(partner.id, data);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = partners_1.return)) await _b.call(partners_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    async findByStaff(staffId) {
        const result = await this.organisationRepository
            .createQueryBuilder('organisation')
            .leftJoinAndSelect('organisation.staff', 'staff')
            .where('staff.id = :staffId', { staffId })
            .getOne();
        return result;
    }
    async findOneOrThrow(id) {
        const result = await this.organisationRepository
            .createQueryBuilder('organisation')
            .leftJoinAndSelect('organisation.partners', 'partners')
            .leftJoinAndSelect('organisation.branch', 'branch')
            .leftJoinAndSelect('organisation.shifts', 'shifts')
            .where('organisation.id = :id', { id })
            .getOne();
        if (!result)
            throw new common_1.BadRequestException('Organisation not found!');
        return result;
    }
    async findOneOrgBranchByCode(code) {
        const result = await this.organisationBranchRepository
            .createQueryBuilder('organisationBranch')
            .where('organisationBranch.code = :code', {
            code,
        })
            .getOne();
        return result;
    }
    async findOneOrgBranchByCodeOrThrow(code) {
        const result = await this.organisationBranchRepository
            .createQueryBuilder('organisationBranch')
            .where('organisationBranch.code = :code', { code })
            .getOne();
        if (!result)
            throw new common_1.BadRequestException('Organisation Branch not found!');
        return result;
    }
    async findOneBranch(id) {
        const result = await this.organisationBranchRepository
            .createQueryBuilder('branch')
            .where('branch.id = :id', { id })
            .getOne();
        return result;
    }
    async findOneOrganisationJoinRequest(organisationBranchId, userId) {
        const result = await this.organisationJoinRequestRepository
            .createQueryBuilder('organisationJoinRequest')
            .where('organisationJoinRequest.organisationBranch = :organisationBranchId', {
            organisationBranchId,
        })
            .andWhere('organisationJoinRequest.user = :userId', { userId })
            .getOne();
        return result;
    }
    async findManyOrganisationJoinRequest(organisationBrnachId) {
        const result = await this.organisationJoinRequestRepository
            .createQueryBuilder('organisationJoinRequest')
            .leftJoinAndSelect('organisationJoinRequest.organisationBranch', 'organisationBranch')
            .leftJoinAndSelect('organisationJoinRequest.user', 'user')
            .where('organisationBranch.id = :organisationBrnachId', {
            organisationBrnachId,
        })
            .andWhere('organisationJoinRequest.seen = false')
            .getMany();
        return result;
    }
    async findOneBranchOrThrow(id) {
        const result = await this.organisationBranchRepository
            .createQueryBuilder('branch')
            .where('branch.id = :id', { id })
            .getOne();
        if (!result)
            throw new common_1.BadRequestException('Branch not found!');
        return result;
    }
    async update(id, updateOrganisationDto) {
        if (!Object.keys(updateOrganisationDto).length) {
            return;
        }
        return await this.organisationRepository.update(id, updateOrganisationDto);
    }
    async updateOrgPartner(id, data) {
        return await this.organisationPartnerRepository.update(id, data);
    }
    async updateOrgBranch(id, data) {
        return await this.organisationBranchRepository.update(id, data);
    }
    async deleteOneOrganisationJoinRequest(organisationBranchId, userId) {
        const result = await this.organisationJoinRequestRepository
            .createQueryBuilder('organisationJoinRequest')
            .where('organisationBranch = :organisationBranchId', {
            organisationBranchId,
        })
            .andWhere('user = :userId', { userId })
            .delete()
            .execute();
        return result;
    }
    async deleteOrgJoinReq(id) {
        return await this.organisationJoinRequestRepository.delete(id);
    }
    remove(id) {
        return this.organisationRepository.delete(id);
    }
    removeAll() {
        return this.organisationRepository.delete({});
    }
    async generateUniqueCodeByOrganisationBranch() {
        let pin = (0, utils_1.generateRandomCode)();
        const org = await this.findOneOrgBranchByCode(pin);
        if (org) {
            pin = await this.generateUniqueCodeByOrganisationBranch();
        }
        return pin;
    }
};
OrganisationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organisation_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(organisationBranch_entity_1.default)),
    __param(2, (0, typeorm_1.InjectRepository)(organisationShfit_entity_1.default)),
    __param(3, (0, typeorm_1.InjectRepository)(organisationPartner_entity_1.default)),
    __param(4, (0, typeorm_1.InjectRepository)(organisationJoinRequest_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrganisationService);
exports.OrganisationService = OrganisationService;
//# sourceMappingURL=organisation.service.js.map