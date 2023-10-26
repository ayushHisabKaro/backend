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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiringController = void 0;
const common_1 = require("@nestjs/common");
const hiring_service_1 = require("./hiring.service");
const create_job_dto_1 = require("./dto/create-job.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_guard_1 = require("../auth/role.guard");
const response_example_1 = require("../types/response.example");
const roles_decorator_1 = require("../auth/roles.decorator");
const entity_attribute_types_1 = require("../types/entity.attribute.types");
const resume_service_1 = require("../resume/resume.service");
const notification_service_1 = require("../notification/notification.service");
const organisation_service_1 = require("../organisation/organisation.service");
let HiringController = class HiringController {
    constructor(hiringService, resumeService, notificationService, organisationService) {
        this.hiringService = hiringService;
        this.resumeService = resumeService;
        this.notificationService = notificationService;
        this.organisationService = organisationService;
    }
    async createJob(createJobDto) {
        const experienceRequired = await this.hiringService.createJobExperienceRequired(createJobDto.experienceRequired);
        const otherLanguages = await this.hiringService.createJobOtherLanguages(createJobDto.otherLanguages);
        const requiredSkills = await this.hiringService.createJobRequiredSkills(createJobDto.requiredSkills);
        try {
            const jobData = this.hiringService.createJob(Object.assign(Object.assign({}, createJobDto), { organisation: { id: createJobDto.organisationId }, organisationBranch: { id: createJobDto.organisationBranchId }, experienceRequired,
                otherLanguages,
                requiredSkills }));
            return await this.hiringService.saveJob(jobData);
        }
        catch (error) {
            throw error;
        }
    }
    async createJobApplied(request, id) {
        const user = request.user;
        const job = await this.hiringService.findOneJobOrThrow(+id);
        const organisation = await this.organisationService.findPartnersByOrg(job.organisation.id);
        organisation.partners.forEach((p) => {
            this.notificationService.create({
                title: user.name,
                type: '',
                description: `Applied for ${job.title}`,
                user: p.user,
            });
        });
        return this.hiringService.createJobApplied({
            user: request.user,
            job,
        });
    }
    async createJobBookmarked(request, id) {
        const user = request.user;
        const job = await this.hiringService.findOneJobOrThrow(+id);
        const organisation = await this.organisationService.findPartnersByOrg(job.organisation.id);
        organisation.partners.forEach((p) => {
            this.notificationService.create({
                title: user.name,
                type: '',
                description: `Bookmarked ${job.title}`,
                user: p.user,
            });
        });
        return this.hiringService.createJobBookmarked({
            user: request.user,
            job,
        });
    }
    async createJobShortlisted(id, userId) {
        const job = await this.hiringService.findOneJobOrThrow(+id);
        this.notificationService.create({
            title: job.organisation.name,
            type: 'Shortlisted',
            description: `You’re Shortlisted for ${job.title}`,
            user: { id: +userId },
        });
        return this.hiringService.createJobShortlisted({
            user: { id: +userId },
            job: { id: +id },
        });
    }
    async rejectCandidate(id, userId) {
        const job = await this.hiringService.findOneJobOrThrow(+id);
        this.notificationService.create({
            title: job.organisation.name,
            type: 'Rejected',
            description: `You’re rejected for ${job.title}`,
            user: { id: +userId },
        });
        return this.hiringService.rejectCandidate(+userId, +id);
    }
    closeJob(id) {
        return this.hiringService.updateJob(+id, {
            isOpen: false,
        });
    }
    async findAllJobsFiltered(request, jobFilter) {
        const result = await this.hiringService.findAllJobsFiltered(jobFilter, ['applied', 'bookmarked'], request.user.id);
        if (request.user.role.name === entity_attribute_types_1.Roles.EMPLOYEE) {
            result.forEach((job) => {
                job.isApplied = false;
                if (job.applied.length === 1) {
                    job.isApplied = true;
                }
                job.isBookmarked = false;
                if (job.bookmarked.length === 1) {
                    job.isBookmarked = true;
                }
            });
        }
        return result;
    }
    async findAllJobs() {
        const result = await this.hiringService.findAllJobs();
        return result;
    }
    async findAllJobsByOrganisation(id) {
        const result = await this.hiringService.findAllJobsByOrganisation(+id);
        return result;
    }
    async findJobAppliedByUser(request) {
        const result = await this.hiringService.findJobsAppliedByUser(request.user.id);
        result.forEach((jobApplied) => {
            if (jobApplied.job && jobApplied.job.shortlisted) {
                jobApplied.job.shortlisted = jobApplied.job.shortlisted.length === 1;
            }
            else {
            }
        });
        return result;
    }
    async findJobBookmarkedByUser(request) {
        const result = await this.hiringService.findJobsBookmarkedByUser(request.user.id);
        result.forEach((jobBookMarked) => {
            if (jobBookMarked.job && jobBookMarked.job.applied) {
                jobBookMarked.isApplied = jobBookMarked.job.applied.length === 1;
            }
        });
        return result;
    }
    async findJobShortlist(id) {
        const result = await this.hiringService.findJobShortlistWithoutRejected(+id);
        result.forEach((i) => {
            i.workExperience = this.resumeService.calculateWorkExperience(i.user.resume.workExperience);
        });
        return result;
    }
    async findJobApplied(id) {
        const result = await this.hiringService.findJobApplied(+id);
        result.forEach((i) => {
            i.workExperience = null;
            if (i.user.resume) {
                i.workExperience = this.resumeService.calculateWorkExperience(i.user.resume.workExperience);
            }
            i.isShortlisted = false;
            const check = i.job.shortlisted.find((j) => j.user.id === i.user.id);
            if (check) {
                i.isShortlisted = true;
            }
        });
        return result;
    }
    async findJobBookmarked(id) {
        const result = await this.hiringService.findJobBookmarked(+id);
        result.forEach((i) => {
            if (i.user.resume) {
                i.workExperience = this.resumeService.calculateWorkExperience(i.user.resume.workExperience);
            }
            i.isShortlisted = false;
            const check = i.job.shortlisted.find((j) => j.user.id === i.user.id);
            if (check) {
                i.isShortlisted = true;
            }
        });
        return result;
    }
    async findOneJob(request, id) {
        const result = await this.hiringService.findOneJobOrThrow(+id);
        if (request.user.role.name === entity_attribute_types_1.Roles.EMPLOYEE) {
            result.isBookmarked = (await this.hiringService.findJobBookmarkedByUser(request.user.id, +id))
                ? true
                : false;
            result.isApplied = (await this.hiringService.findJobAppliedByUser(request.user.id, +id))
                ? true
                : false;
        }
        return result;
    }
    async update(id, updateJobDto) {
        try {
            const job = await this.hiringService.findOneJobOrThrow(+id);
            if (updateJobDto.experienceRequired) {
                await this.hiringService.deleteJobExperienceRequired(job.experienceRequired.map((i) => i.id));
                job.experienceRequired =
                    await this.hiringService.createJobExperienceRequired(updateJobDto.experienceRequired, job.id);
            }
            if (updateJobDto.otherLanguages) {
                await this.hiringService.deleteJobOtherLanguages(job.otherLanguages.map((i) => i.id));
                job.otherLanguages = await this.hiringService.createJobOtherLanguages(updateJobDto.otherLanguages, job.id);
            }
            if (updateJobDto.requiredSkills) {
                await this.hiringService.deleteJobRequiredSkills(job.requiredSkills.map((i) => i.id));
                job.requiredSkills = await this.hiringService.createJobRequiredSkills(updateJobDto.requiredSkills, job.id);
            }
            const updateData = Object.assign({ id: +id }, updateJobDto);
            if (updateJobDto.organisationId)
                updateData.organisation = {
                    id: updateJobDto.organisationId,
                };
            if (updateJobDto.organisationBranchId)
                updateData.organisationBranch = {
                    id: updateJobDto.organisationBranchId,
                };
            const jobData = this.hiringService.createJob(updateData);
            delete jobData.experienceRequired;
            delete jobData.otherLanguages;
            delete jobData.requiredSkills;
            return await this.hiringService.updateJob(+id, jobData);
        }
        catch (error) {
            throw error;
        }
    }
    removeJobShortlisted(id, userId) {
        return this.hiringService.removeJobShortlisted(+id, +userId);
    }
    removeJobBookmarked(request, id) {
        return this.hiringService.removeJobBookmarked(request.user.id, +id);
    }
    removeAll() {
        return this.hiringService.removeAllJobs();
    }
    remove(id) {
        return this.hiringService.removeJob(+id);
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_post } }),
    (0, common_1.Post)('jobs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "createJob", null);
__decorate([
    (0, common_1.Post)('jobs/:id/apply'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "createJobApplied", null);
__decorate([
    (0, common_1.Post)('jobs/:id/bookmark'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "createJobBookmarked", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)('jobs/:id/shortlist/user/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "createJobShortlisted", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)('jobs/:id/reject/user/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "rejectCandidate", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)('jobs/:id/close'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HiringController.prototype, "closeJob", null);
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_get } }),
    (0, swagger_1.ApiQuery)({
        name: 'sort',
        type: String,
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'searchAll',
        type: String,
        required: false,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'location',
        type: String,
        required: false,
    }),
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_get } }),
    (0, common_1.Get)('jobs/filtered'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findAllJobsFiltered", null);
__decorate([
    (0, common_1.Get)('jobs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findAllJobs", null);
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_applied_user } }),
    (0, common_1.Get)('jobs/organisation/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findAllJobsByOrganisation", null);
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_applied_user } }),
    (0, roles_decorator_1.Roles)('EMPLOYEE'),
    (0, common_1.Get)('jobs/users/apply'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findJobAppliedByUser", null);
__decorate([
    (0, roles_decorator_1.Roles)('EMPLOYEE'),
    (0, common_1.Get)('jobs/users/bookmark'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findJobBookmarkedByUser", null);
__decorate([
    (0, common_1.Get)('jobs/:id/shortlist'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findJobShortlist", null);
__decorate([
    (0, common_1.Get)('jobs/:id/apply'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findJobApplied", null);
__decorate([
    (0, common_1.Get)('jobs/:id/bookmark'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findJobBookmarked", null);
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_get_one } }),
    (0, common_1.Get)('jobs/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "findOneJob", null);
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_patch } }),
    (0, common_1.Patch)('jobs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", Promise)
], HiringController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('jobs/:id/shortlist/user/:userId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HiringController.prototype, "removeJobShortlisted", null);
__decorate([
    (0, common_1.Delete)('jobs/:id/bookmark'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], HiringController.prototype, "removeJobBookmarked", null);
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_delete } }),
    (0, common_1.Delete)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HiringController.prototype, "removeAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_hiring_jobs_delete } }),
    (0, common_1.Delete)('jobs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HiringController.prototype, "remove", null);
HiringController = __decorate([
    (0, swagger_1.ApiTags)('Hiring'),
    (0, common_1.Controller)('hiring'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [hiring_service_1.HiringService,
        resume_service_1.ResumeService,
        notification_service_1.NotificationService,
        organisation_service_1.OrganisationService])
], HiringController);
exports.HiringController = HiringController;
//# sourceMappingURL=hiring.controller.js.map