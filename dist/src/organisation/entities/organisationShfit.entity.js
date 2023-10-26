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
const typeorm_1 = require("typeorm");
const organisation_entity_1 = require("./organisation.entity");
let OrganisationShift = class OrganisationShift {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrganisationShift.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], OrganisationShift.prototype, "openTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], OrganisationShift.prototype, "closeTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], OrganisationShift.prototype, "markLateAfter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organisation_entity_1.default, (organisation) => organisation.shifts, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", organisation_entity_1.default)
], OrganisationShift.prototype, "organisation", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], OrganisationShift.prototype, "createdAt", void 0);
OrganisationShift = __decorate([
    (0, typeorm_1.Entity)()
], OrganisationShift);
exports.default = OrganisationShift;
//# sourceMappingURL=organisationShfit.entity.js.map