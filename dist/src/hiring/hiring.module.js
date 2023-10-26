"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiringModule = void 0;
const common_1 = require("@nestjs/common");
const hiring_service_1 = require("./hiring.service");
const hiring_controller_1 = require("./hiring.controller");
const typeorm_1 = require("@nestjs/typeorm");
const jobOtherLanguage_entity_1 = require("./entities/jobOtherLanguage.entity");
const jobExperienceRequired_entity_1 = require("./entities/jobExperienceRequired.entity");
const jobRequiredSkills_entity_1 = require("./entities/jobRequiredSkills.entity");
const job_entity_1 = require("./entities/job.entity");
const organisation_module_1 = require("../organisation/organisation.module");
const jobApplied_entity_1 = require("./entities/jobApplied.entity");
const jobBookmark_entity_1 = require("./entities/jobBookmark.entity");
const jobShortlisted_entity_1 = require("./entities/jobShortlisted.entity");
const resume_module_1 = require("../resume/resume.module");
const notification_module_1 = require("../notification/notification.module");
let HiringModule = class HiringModule {
};
HiringModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                job_entity_1.default,
                jobOtherLanguage_entity_1.JobOtherLanguage,
                jobExperienceRequired_entity_1.JobExperienceRequired,
                jobRequiredSkills_entity_1.JobRequiredSkill,
                jobApplied_entity_1.default,
                jobBookmark_entity_1.default,
                jobShortlisted_entity_1.default,
            ]),
            resume_module_1.ResumeModule,
            organisation_module_1.OrganisationModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [hiring_controller_1.HiringController],
        providers: [hiring_service_1.HiringService],
    })
], HiringModule);
exports.HiringModule = HiringModule;
//# sourceMappingURL=hiring.module.js.map