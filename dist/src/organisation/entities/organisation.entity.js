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
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const organisationBranch_entity_1 = require("./organisationBranch.entity");
const organisationPartner_entity_1 = require("./organisationPartner.entity");
const job_entity_1 = require("../../hiring/entities/job.entity");
const organisationShfit_entity_1 = require("./organisationShfit.entity");
const staff_entity_1 = require("../../staff/entities/staff.entity");
let Organisation = class Organisation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Organisation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Organisation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.organisations, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Organisation.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "landmark", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Organisation.prototype, "weekelyOff1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Organisation.prototype, "weekelyOff2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organisationShfit_entity_1.default, (organisationShift) => organisationShift.organisation),
    __metadata("design:type", Array)
], Organisation.prototype, "shifts", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "industrySector", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organisationBranch_entity_1.default, (organisationBranch) => organisationBranch.organisation),
    __metadata("design:type", Array)
], Organisation.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entity_1.default, (staff) => staff.user),
    __metadata("design:type", Array)
], Organisation.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => job_entity_1.default, (job) => job.organisation),
    __metadata("design:type", Array)
], Organisation.prototype, "jobs", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "gstNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "gstFileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "panNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organisation.prototype, "panFileUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => organisationPartner_entity_1.default, (organisationBranch) => organisationBranch.organisation),
    __metadata("design:type", Array)
], Organisation.prototype, "partners", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Organisation.prototype, "createdAt", void 0);
Organisation = __decorate([
    (0, typeorm_1.Entity)()
], Organisation);
exports.default = Organisation;
//# sourceMappingURL=organisation.entity.js.map