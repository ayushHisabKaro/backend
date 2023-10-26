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
exports.JobOtherLanguage = void 0;
const typeorm_1 = require("typeorm");
const job_entity_1 = require("./job.entity");
let JobOtherLanguage = class JobOtherLanguage {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobOtherLanguage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobOtherLanguage.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_entity_1.default, (job) => job.otherLanguages, { onDelete: 'CASCADE' }),
    __metadata("design:type", job_entity_1.default)
], JobOtherLanguage.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], JobOtherLanguage.prototype, "createdAt", void 0);
JobOtherLanguage = __decorate([
    (0, typeorm_1.Entity)()
], JobOtherLanguage);
exports.JobOtherLanguage = JobOtherLanguage;
//# sourceMappingURL=jobOtherLanguage.entity.js.map