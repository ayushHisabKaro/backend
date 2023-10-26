"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeModule = void 0;
const common_1 = require("@nestjs/common");
const resume_service_1 = require("./resume.service");
const resume_controller_1 = require("./resume.controller");
const typeorm_1 = require("@nestjs/typeorm");
const resume_entity_1 = require("./entities/resume.entity");
const resumeSkills_entity_1 = require("./entities/resumeSkills.entity");
const resumeLanguage_entity_1 = require("./entities/resumeLanguage.entity");
const resumeDocument_entity_1 = require("./entities/resumeDocument.entity");
const resumeWorkExperience_1 = require("./entities/resumeWorkExperience");
const resumeEducation_entity_1 = require("./entities/resumeEducation.entity");
let ResumeModule = class ResumeModule {
};
ResumeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                resume_entity_1.Resume,
                resumeSkills_entity_1.ResumeSkill,
                resumeLanguage_entity_1.ResumeLanguage,
                resumeDocument_entity_1.ResumeDocument,
                resumeWorkExperience_1.default,
                resumeEducation_entity_1.default,
            ]),
        ],
        controllers: [resume_controller_1.ResumeController],
        providers: [resume_service_1.ResumeService],
        exports: [typeorm_1.TypeOrmModule, resume_service_1.ResumeService],
    })
], ResumeModule);
exports.ResumeModule = ResumeModule;
//# sourceMappingURL=resume.module.js.map