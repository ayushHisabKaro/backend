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
const resume_entity_1 = require("./resume.entity");
let ResumeWorkExperience = class ResumeWorkExperience {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ResumeWorkExperience.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResumeWorkExperience.prototype, "jobTitle", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResumeWorkExperience.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ResumeWorkExperience.prototype, "sector", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ResumeWorkExperience.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ResumeWorkExperience.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resume_entity_1.Resume, (resume) => resume.workExperience, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", resume_entity_1.Resume)
], ResumeWorkExperience.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ResumeWorkExperience.prototype, "createdAt", void 0);
ResumeWorkExperience = __decorate([
    (0, typeorm_1.Entity)()
], ResumeWorkExperience);
exports.default = ResumeWorkExperience;
//# sourceMappingURL=resumeWorkExperience.js.map