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
exports.Resume = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const resumeLanguage_entity_1 = require("./resumeLanguage.entity");
const resumeSkills_entity_1 = require("./resumeSkills.entity");
const resumeDocument_entity_1 = require("./resumeDocument.entity");
const resumeWorkExperience_1 = require("./resumeWorkExperience");
const resumeEducation_entity_1 = require("./resumeEducation.entity");
let Resume = class Resume {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Resume.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], Resume.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resume.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Resume.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resume.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resume.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "pinCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Resume.prototype, "landmark", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Resume.prototype, "currentSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "currentSalaryInterval", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Resume.prototype, "currentSalaryVisibility", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "englishLevel", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resumeLanguage_entity_1.ResumeLanguage, (resumeLanguage) => resumeLanguage.resume),
    __metadata("design:type", Array)
], Resume.prototype, "otherLanguages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resumeWorkExperience_1.default, (resumeWorkExperience) => resumeWorkExperience.resume),
    __metadata("design:type", Array)
], Resume.prototype, "workExperience", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resumeSkills_entity_1.ResumeSkill, (resumeSkills) => resumeSkills.resume),
    __metadata("design:type", Array)
], Resume.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Resume.prototype, "highestEducation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resumeDocument_entity_1.ResumeDocument, (resumeDocument) => resumeDocument.resume),
    __metadata("design:type", Array)
], Resume.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => resumeEducation_entity_1.default, (resumeEducation) => resumeEducation.resume),
    __metadata("design:type", Array)
], Resume.prototype, "education", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Resume.prototype, "createdAt", void 0);
Resume = __decorate([
    (0, typeorm_1.Entity)()
], Resume);
exports.Resume = Resume;
//# sourceMappingURL=resume.entity.js.map