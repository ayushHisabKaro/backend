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
const organisation_entity_1 = require("./organisation.entity");
let OrganisationPartner = class OrganisationPartner {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrganisationPartner.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganisationPartner.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrganisationPartner.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.organisationPartner),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], OrganisationPartner.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organisation_entity_1.default, (organisation) => organisation.partners, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", organisation_entity_1.default)
], OrganisationPartner.prototype, "organisation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OrganisationPartner.prototype, "createdAt", void 0);
OrganisationPartner = __decorate([
    (0, typeorm_1.Entity)()
], OrganisationPartner);
exports.default = OrganisationPartner;
//# sourceMappingURL=organisationPartner.entity.js.map