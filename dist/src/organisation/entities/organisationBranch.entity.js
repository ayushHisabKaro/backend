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
const staff_entity_1 = require("../../staff/entities/staff.entity");
const typeorm_1 = require("typeorm");
const job_entity_1 = require("../../hiring/entities/job.entity");
const organisation_entity_1 = require("./organisation.entity");
const organisationJoinRequest_entity_1 = require("./organisationJoinRequest.entity");
let OrganisationBranch = class OrganisationBranch {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrganisationBranch.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganisationBranch.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], OrganisationBranch.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganisationBranch.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganisationBranch.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganisationBranch.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganisationBranch.prototype, "landmark", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entity_1.default, (staff) => staff.user),
    __metadata("design:type", Array)
], OrganisationBranch.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organisation_entity_1.default, (organisation) => organisation.branch, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", organisation_entity_1.default)
], OrganisationBranch.prototype, "organisation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_entity_1.default, (job) => job.organisationBranch),
    __metadata("design:type", Array)
], OrganisationBranch.prototype, "jobs", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrganisationBranch.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organisationJoinRequest_entity_1.default, (organisationJoinRequest) => organisationJoinRequest.organisationBranch),
    __metadata("design:type", Array)
], OrganisationBranch.prototype, "organisationJoinRequest", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OrganisationBranch.prototype, "createdAt", void 0);
OrganisationBranch = __decorate([
    (0, typeorm_1.Unique)(['code']),
    (0, typeorm_1.Entity)()
], OrganisationBranch);
exports.default = OrganisationBranch;
//# sourceMappingURL=organisationBranch.entity.js.map