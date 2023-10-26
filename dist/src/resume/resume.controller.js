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
exports.ResumeController = void 0;
const common_1 = require("@nestjs/common");
const resume_service_1 = require("./resume.service");
const create_resume_dto_1 = require("./dto/create-resume.dto");
const update_resume_dto_1 = require("./dto/update-resume.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_guard_1 = require("../auth/role.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/roles.decorator");
let ResumeController = class ResumeController {
    constructor(resumeService) {
        this.resumeService = resumeService;
    }
    async create(createResumeDto, req) {
        if (await this.resumeService.findByUser(req.user.id)) {
            throw new common_1.BadRequestException('Resume already exists');
        }
        const otherLanguages = await this.resumeService.createOtherLanguages(createResumeDto.otherLanguages);
        const skills = await this.resumeService.createSkills(createResumeDto.skills);
        const documents = await this.resumeService.createDocuments(createResumeDto.documents);
        const workExperience = await this.resumeService.createWorkExperience(createResumeDto.workExperience);
        const education = await this.resumeService.saveResumeEducation(createResumeDto.education);
        const createData = this.resumeService.create(Object.assign(Object.assign({}, createResumeDto), { user: req.user, otherLanguages,
            skills,
            documents,
            workExperience,
            education }));
        return this.resumeService.save(createData);
    }
    async findMyResume(req) {
        return await this.resumeService.findByUser(req.user.id);
    }
    findAll() {
        return this.resumeService.findAll();
    }
    findByUser(id) {
        return this.resumeService.findByUser(+id);
    }
    findOne(id) {
        return this.resumeService.findOne(+id);
    }
    async updateByAuthUser(req, updateResumeDto) {
        const resume = await this.resumeService.findByUser(req.user.id);
        if (!resume) {
            throw new common_1.BadRequestException('Resume not found!');
        }
        if (updateResumeDto.otherLanguages) {
            this.resumeService.deleteAndInsertOtherLanguages(updateResumeDto.otherLanguages, resume);
        }
        if (updateResumeDto.skills) {
            this.resumeService.deleteAndInsertSkills(updateResumeDto.skills, resume);
        }
        if (updateResumeDto.documents) {
            this.resumeService.deleteAndInsertDocuments(updateResumeDto.documents, resume);
        }
        if (updateResumeDto.workExperience) {
            this.resumeService.deleteAndInsertWorkExperience(updateResumeDto.workExperience, resume);
        }
        if (updateResumeDto.education) {
            await this.resumeService.deleteAndInsertResumeEducation(updateResumeDto.education, resume.id);
        }
        delete updateResumeDto.education;
        delete updateResumeDto.otherLanguages;
        delete updateResumeDto.workExperience;
        delete updateResumeDto.skills;
        delete updateResumeDto.documents;
        return this.resumeService.update(resume.id, updateResumeDto);
    }
    remove(id) {
        return this.resumeService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('EMPLOYEE'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resume_dto_1.CreateResumeDto, Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "findMyResume", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResumeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_resume_dto_1.UpdateResumeDto]),
    __metadata("design:returntype", Promise)
], ResumeController.prototype, "updateByAuthUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResumeController.prototype, "remove", null);
ResumeController = __decorate([
    (0, swagger_1.ApiTags)('resume'),
    (0, common_1.Controller)('resume'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [resume_service_1.ResumeService])
], ResumeController);
exports.ResumeController = ResumeController;
//# sourceMappingURL=resume.controller.js.map