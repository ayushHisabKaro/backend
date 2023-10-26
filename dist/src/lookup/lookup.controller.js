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
exports.LookupControllerV2 = exports.LookupController = void 0;
const common_1 = require("@nestjs/common");
const lookup_service_1 = require("./lookup.service");
const create_lookup_dto_1 = require("./dto/create-lookup.dto");
const update_lookup_dto_1 = require("./dto/update-lookup.dto");
const swagger_1 = require("@nestjs/swagger");
let LookupController = class LookupController {
    constructor(lookupService) {
        this.lookupService = lookupService;
    }
    create(createLookupDto) {
        return this.lookupService.create(createLookupDto);
    }
    findAll() {
        return this.lookupService.findAll();
    }
    findOne(name) {
        return this.lookupService.findOneByName(name);
    }
    async update(name, updateLookupDto) {
        const lookup = await this.lookupService.findOneByName(name);
        if (!lookup)
            throw new common_1.BadRequestException('Lookup not found!');
        return this.lookupService.update(lookup.id, updateLookupDto);
    }
    remove(id) {
        return this.lookupService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lookup_dto_1.CreateLookupDto]),
    __metadata("design:returntype", void 0)
], LookupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LookupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lookup_dto_1.UpdateLookupDto]),
    __metadata("design:returntype", Promise)
], LookupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LookupController.prototype, "remove", null);
LookupController = __decorate([
    (0, swagger_1.ApiTags)('Lookup'),
    (0, common_1.Controller)('lookup'),
    __metadata("design:paramtypes", [lookup_service_1.LookupService])
], LookupController);
exports.LookupController = LookupController;
let LookupControllerV2 = class LookupControllerV2 {
    constructor(lookupService) {
        this.lookupService = lookupService;
    }
    create(createLookupDto) {
        return this.lookupService.create(createLookupDto);
    }
    findAll() {
        return this.lookupService.findAll();
    }
    findOne(name) {
        return this.lookupService.findOneByName(name);
    }
    async update(name, updateLookupDto) {
        const lookup = await this.lookupService.findOneByName(name);
        if (!lookup)
            throw new common_1.BadRequestException('Lookup not found!');
        return this.lookupService.update(lookup.id, updateLookupDto);
    }
    remove(id) {
        return this.lookupService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lookup_dto_1.CreateLookupDto]),
    __metadata("design:returntype", void 0)
], LookupControllerV2.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LookupControllerV2.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LookupControllerV2.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lookup_dto_1.UpdateLookupDto]),
    __metadata("design:returntype", Promise)
], LookupControllerV2.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LookupControllerV2.prototype, "remove", null);
LookupControllerV2 = __decorate([
    (0, common_1.Controller)({
        path: 'lookup',
        version: '2',
    }),
    (0, swagger_1.ApiTags)('Lookup V2'),
    __metadata("design:paramtypes", [lookup_service_1.LookupService])
], LookupControllerV2);
exports.LookupControllerV2 = LookupControllerV2;
//# sourceMappingURL=lookup.controller.js.map