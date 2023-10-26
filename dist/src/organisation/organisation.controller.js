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
exports.OrganisationController = void 0;
const common_1 = require("@nestjs/common");
const organisation_service_1 = require("./organisation.service");
const create_organisation_dto_1 = require("./dto/create-organisation.dto");
const update_organisation_dto_1 = require("./dto/update-organisation.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_guard_1 = require("../auth/role.guard");
const user_service_1 = require("../user/user.service");
const roles_decorator_1 = require("../auth/roles.decorator");
let OrganisationController = class OrganisationController {
    constructor(organisationService, userService) {
        this.organisationService = organisationService;
        this.userService = userService;
    }
    async setOrgDefaultBranchAndCode(createOrganisationDto) {
        var _a, e_1, _b, _c;
        if (!createOrganisationDto.branch.length) {
            createOrganisationDto.branch = [
                {
                    name: createOrganisationDto.city,
                    address: createOrganisationDto.address,
                    state: createOrganisationDto.state,
                    city: createOrganisationDto.city,
                    landmark: createOrganisationDto.landmark,
                    pinCode: createOrganisationDto.pinCode,
                },
            ];
        }
        try {
            for (var _d = true, _e = __asyncValues(createOrganisationDto.branch), _f; _f = await _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const orgBranch = _c;
                    const code = await this.organisationService.generateUniqueCodeByOrganisationBranch();
                    orgBranch.code = code;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return createOrganisationDto.branch;
    }
    async create(req, createOrganisationDto) {
        var _a, e_2, _b, _c;
        const isOwnNumberExists = createOrganisationDto.partners.find((i) => i.phoneNumber === req.user.phoneNumber ||
            i.phoneNumber === req.user.alternatePhoneNumber);
        if (!isOwnNumberExists) {
            createOrganisationDto.partners.push({
                name: req.user.name,
                phoneNumber: req.user.phoneNumber,
            });
        }
        try {
            for (var _d = true, _e = __asyncValues(createOrganisationDto.partners), _f; _f = await _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const partner = _c;
                    const user = await this.userService.findOneByPhoneNumber(partner.phoneNumber);
                    if (user)
                        partner.userId = user.id;
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        createOrganisationDto.branch = await this.setOrgDefaultBranchAndCode(createOrganisationDto);
        const branch = await this.organisationService.createOrganisationBranch(createOrganisationDto.branch);
        const shifts = await this.organisationService.createOrganisationShift(createOrganisationDto.shifts);
        const partners = await this.organisationService.createOrganisationPartner(createOrganisationDto.partners);
        const createData = this.organisationService.create(Object.assign(Object.assign({}, createOrganisationDto), { createdBy: { id: req.user.id }, branch,
            shifts,
            partners }));
        return this.organisationService.save(createData);
    }
    async addCodeInAllOrganosation() {
        var _a, e_3, _b, _c;
        const organisationBranches = await this.organisationService.findAllOrganisationBranch();
        try {
            for (var _d = true, organisationBranches_1 = __asyncValues(organisationBranches), organisationBranches_1_1; organisationBranches_1_1 = await organisationBranches_1.next(), _a = organisationBranches_1_1.done, !_a;) {
                _c = organisationBranches_1_1.value;
                _d = false;
                try {
                    const orgBranch = _c;
                    if (!orgBranch.code) {
                        const code = await this.organisationService.generateUniqueCodeByOrganisationBranch();
                        await this.organisationService.updateOrgBranch(orgBranch.id, { code });
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = organisationBranches_1.return)) await _b.call(organisationBranches_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    async createOrganisationJoinRequest(createOrganisationJoinReqDto) {
        const organisationBranch = await this.organisationService.findOneOrgBranchByCodeOrThrow(createOrganisationJoinReqDto.organisationBranchCode);
        const check = await this.organisationService.findOneOrganisationJoinRequest(organisationBranch.id, createOrganisationJoinReqDto.userId);
        if (check) {
            throw new common_1.BadRequestException('Already requested!');
        }
        if (createOrganisationJoinReqDto.organisationBranchCode === '' ||
            organisationBranch.code !==
                createOrganisationJoinReqDto.organisationBranchCode) {
            throw new common_1.BadRequestException('Invalid organisation code!');
        }
        return await this.organisationService.createOrganisationJoinRequest({
            organisationBranch,
            user: { id: createOrganisationJoinReqDto.userId },
        });
    }
    async addBranchV2(id, createOrganisationDto) {
        const code = await this.organisationService.generateUniqueCodeByOrganisationBranch();
        createOrganisationDto.code = code;
        return await this.organisationService.createOneOrganisationBranch(createOrganisationDto, +id);
    }
    findAll(req) {
        return this.organisationService.findAll();
    }
    findAllByUser(req) {
        return this.organisationService.findAllByUser(req.user.id);
    }
    async getOrganisationJoinRequest(id) {
        const requests = await this.organisationService.findManyOrganisationJoinRequest(+id);
        return requests;
    }
    findOne(id) {
        return this.organisationService.findOne(+id);
    }
    async update(id, updateOrganisationDto) {
        var _a, e_4, _b, _c;
        const organisation = await this.organisationService.findOneOrThrow(+id);
        if (updateOrganisationDto.branch) {
            await this.organisationService.createOrganisationBranch(updateOrganisationDto.branch, organisation.id);
        }
        if (updateOrganisationDto.shifts) {
            await this.organisationService.deleteOrganisationShift(organisation);
            await this.organisationService.createOrganisationShift(updateOrganisationDto.shifts, organisation.id);
        }
        if (updateOrganisationDto.partners) {
            const org = await this.organisationService.findPartnersByOrg(+id);
            try {
                for (var _d = true, _e = __asyncValues(updateOrganisationDto.partners), _f; _f = await _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const partner = _c;
                        if (!org.partners.find((p) => p.phoneNumber === partner.phoneNumber)) {
                            await this.organisationService.createOrganisationPartner([partner], +id);
                            this.userService
                                .findOneByPhoneNumber(partner.phoneNumber)
                                .then((user) => {
                                this.organisationService.checkOrgPartnerByUser(user);
                            });
                        }
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        const organisationData = this.organisationService.create(updateOrganisationDto);
        delete organisationData.branch;
        delete organisationData.shifts;
        delete organisationData.partners;
        return this.organisationService.update(+id, organisationData);
    }
    async removeBranch(id) {
        return await this.organisationService.deleteOrganisationBranch(+id);
    }
    async deleteOrganisationJoinRequest(id) {
        return await this.organisationService.deleteOrgJoinReq(+id);
    }
    removeAll() {
        return this.organisationService.removeAll();
    }
    remove(id) {
        return this.organisationService.remove(+id);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_organisation_dto_1.CreateOrganisationDto]),
    __metadata("design:returntype", Promise)
], OrganisationController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)('internal/addCode'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganisationController.prototype, "addCodeInAllOrganosation", null);
__decorate([
    (0, common_1.Post)('branch/join'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_organisation_dto_1.CreateOrganisationJoinRequest]),
    __metadata("design:returntype", Promise)
], OrganisationController.prototype, "createOrganisationJoinRequest", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)(':id/branch'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_organisation_dto_1.CreateOrganisationBranch]),
    __metadata("design:returntype", Promise)
], OrganisationController.prototype, "addBranchV2", null);
__decorate([
    (0, common_1.Get)('/all'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Get)('branch/:id/join'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganisationController.prototype, "getOrganisationJoinRequest", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_organisation_dto_1.UpdateOrganisationDto]),
    __metadata("design:returntype", Promise)
], OrganisationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('branch/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganisationController.prototype, "removeBranch", null);
__decorate([
    (0, common_1.Delete)('branch/join/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganisationController.prototype, "deleteOrganisationJoinRequest", null);
__decorate([
    (0, common_1.Delete)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrganisationController.prototype, "remove", null);
OrganisationController = __decorate([
    (0, swagger_1.ApiTags)('Organisation'),
    (0, common_1.Controller)('organisation'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [organisation_service_1.OrganisationService,
        user_service_1.UserService])
], OrganisationController);
exports.OrganisationController = OrganisationController;
//# sourceMappingURL=organisation.controller.js.map