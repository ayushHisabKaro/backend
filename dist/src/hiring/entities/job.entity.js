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
const jobOtherLanguage_entity_1 = require("./jobOtherLanguage.entity");
const jobRequiredSkills_entity_1 = require("./jobRequiredSkills.entity");
const jobExperienceRequired_entity_1 = require("./jobExperienceRequired.entity");
const organisation_entity_1 = require("../../organisation/entities/organisation.entity");
const organisationBranch_entity_1 = require("../../organisation/entities/organisationBranch.entity");
const jobApplied_entity_1 = require("./jobApplied.entity");
const jobBookmark_entity_1 = require("./jobBookmark.entity");
const jobShortlisted_entity_1 = require("./jobShortlisted.entity");
let Job = class Job {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organisation_entity_1.default, (organisation) => organisation.jobs, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", organisation_entity_1.default)
], Job.prototype, "organisation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => organisationBranch_entity_1.default, (organisationBranch) => organisationBranch.jobs, { onDelete: 'CASCADE' }),
    __metadata("design:type", organisationBranch_entity_1.default)
], Job.prototype, "organisationBranch", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "landmark", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "minSalary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "minSalaryInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "maxSalary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "maxSalaryInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "minIncentive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "minIncentiveInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "maxIncentive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "maxIncentiveInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Job.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'time' }),
    __metadata("design:type", String)
], Job.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "jobTimingType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Job.prototype, "applyBeforeDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobRequiredSkills_entity_1.JobRequiredSkill, (jobRequiredSkill) => jobRequiredSkill.job),
    __metadata("design:type", Array)
], Job.prototype, "requiredSkills", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobExperienceRequired_entity_1.JobExperienceRequired, (jobExperienceRequired) => jobExperienceRequired.job),
    __metadata("design:type", Array)
], Job.prototype, "experienceRequired", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "englishLevel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Job.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "emailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Job.prototype, "isOpen", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobOtherLanguage_entity_1.JobOtherLanguage, (jobLanguage) => jobLanguage.job),
    __metadata("design:type", Array)
], Job.prototype, "otherLanguages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobApplied_entity_1.default, (jobApplied) => jobApplied.job),
    __metadata("design:type", Array)
], Job.prototype, "applied", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobBookmark_entity_1.default, (jobBookmarked) => jobBookmarked.job),
    __metadata("design:type", Array)
], Job.prototype, "bookmarked", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobShortlisted_entity_1.default, (jobShortListed) => jobShortListed.job),
    __metadata("design:type", Array)
], Job.prototype, "shortlisted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Job.prototype, "createdAt", void 0);
Job = __decorate([
    (0, typeorm_1.Entity)()
], Job);
exports.default = Job;
//# sourceMappingURL=job.entity.js.map