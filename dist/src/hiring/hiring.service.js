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
exports.HiringService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("./entities/job.entity");
const jobExperienceRequired_entity_1 = require("./entities/jobExperienceRequired.entity");
const jobOtherLanguage_entity_1 = require("./entities/jobOtherLanguage.entity");
const jobRequiredSkills_entity_1 = require("./entities/jobRequiredSkills.entity");
const jobApplied_entity_1 = require("./entities/jobApplied.entity");
const jobBookmark_entity_1 = require("./entities/jobBookmark.entity");
const jobShortlisted_entity_1 = require("./entities/jobShortlisted.entity");
let HiringService = class HiringService {
    constructor(jobRepository, jobExperienceRequiredRepository, jobOtherLanguageRepository, jobRequiredSkillRepository, jobAppliedRepository, jobBookmarkedRepository, jobShortlistedRepository) {
        this.jobRepository = jobRepository;
        this.jobExperienceRequiredRepository = jobExperienceRequiredRepository;
        this.jobOtherLanguageRepository = jobOtherLanguageRepository;
        this.jobRequiredSkillRepository = jobRequiredSkillRepository;
        this.jobAppliedRepository = jobAppliedRepository;
        this.jobBookmarkedRepository = jobBookmarkedRepository;
        this.jobShortlistedRepository = jobShortlistedRepository;
    }
    createJob(data) {
        const resume = this.jobRepository.create(data);
        return resume;
    }
    async saveJob(data) {
        return await this.jobRepository.save(data);
    }
    async createJobApplied(data) {
        return await this.jobAppliedRepository.save(data);
    }
    async createJobBookmarked(data) {
        return await this.jobBookmarkedRepository.save(data);
    }
    async createJobShortlisted(data) {
        return await this.jobShortlistedRepository.save(data);
    }
    async rejectCandidate(userId, jobId) {
        return await this.jobShortlistedRepository
            .createQueryBuilder('jobShortlisted')
            .update()
            .where('job = :jobId', { jobId })
            .andWhere('user = :userId', { userId })
            .set({ isRejected: true })
            .execute();
    }
    async removeJobShortlisted(jobId, userId) {
        return await this.jobShortlistedRepository
            .createQueryBuilder('jobShortlisted')
            .where('jobId = :jobId', { jobId })
            .andWhere('userId = :userId', { userId })
            .delete()
            .execute();
    }
    async updateJob(id, data) {
        console.log(this.jobRepository
            .createQueryBuilder('job')
            .update(data)
            .where('job.id = :id', { id })
            .getQuery());
        return await this.jobRepository
            .createQueryBuilder('job')
            .update(data)
            .where('job.id = :id', { id })
            .execute();
    }
    async createJobExperienceRequired(data, jobId) {
        const branchData = data.map((i) => {
            const data = i;
            if (jobId)
                data.job = { id: jobId };
            return this.jobExperienceRequiredRepository.create(Object.assign({}, i));
        });
        const branch = await this.jobExperienceRequiredRepository.save(branchData);
        return branch;
    }
    async createJobOtherLanguages(data, jobId) {
        const branchData = data.map((i) => {
            const data = i;
            if (jobId)
                data.job = { id: jobId };
            return this.jobOtherLanguageRepository.create(Object.assign({}, i));
        });
        const branch = await this.jobOtherLanguageRepository.save(branchData);
        return branch;
    }
    async createJobRequiredSkills(data, jobId) {
        const branchData = data.map((i) => {
            const data = i;
            if (jobId)
                data.job = { id: jobId };
            return this.jobRequiredSkillRepository.create(Object.assign({}, i));
        });
        const branch = await this.jobRequiredSkillRepository.save(branchData);
        return branch;
    }
    async deleteJobExperienceRequired(data) {
        if (!data.length)
            return;
        const branch = await this.jobExperienceRequiredRepository.delete(data);
        return branch;
    }
    async deleteJobOtherLanguages(data) {
        if (!data.length)
            return;
        const branch = await this.jobOtherLanguageRepository.delete(data);
        return branch;
    }
    async deleteJobRequiredSkills(data) {
        if (!data.length)
            return;
        const branch = await this.jobRequiredSkillRepository.delete(data);
        return branch;
    }
    async findOneJob(id) {
        return this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.organisation', 'organisation')
            .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
            .leftJoinAndSelect('job.requiredSkills', 'requiredSkills')
            .leftJoinAndSelect('job.experienceRequired', 'experienceRequired')
            .leftJoinAndSelect('job.otherLanguages', 'otherLanguages')
            .where('job.id = :id', { id })
            .getOne();
    }
    async findOneJobOrThrow(id) {
        const result = await this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.organisation', 'organisation')
            .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
            .leftJoinAndSelect('job.requiredSkills', 'requiredSkills')
            .leftJoinAndSelect('job.experienceRequired', 'experienceRequired')
            .leftJoinAndSelect('job.otherLanguages', 'otherLanguages')
            .where('job.id = :id', { id })
            .getOne();
        if (!result)
            throw new common_1.BadRequestException('Job not found!');
        return result;
    }
    async findJobShortlistWithoutRejected(jobId) {
        const result = await this.jobShortlistedRepository
            .createQueryBuilder('jobShortlist')
            .leftJoinAndSelect('jobShortlist.user', 'user')
            .leftJoinAndSelect('user.resume', 'resume')
            .leftJoinAndSelect('resume.workExperience', 'workExperience')
            .leftJoinAndSelect('resume.skills', 'skills')
            .leftJoinAndSelect('jobShortlist.job', 'job')
            .where('job.id = :jobId', { jobId })
            .andWhere('jobShortlist.isRejected = false')
            .getMany();
        return result;
    }
    async findJobApplied(jobId) {
        const result = await this.jobAppliedRepository
            .createQueryBuilder('jobApplied')
            .leftJoinAndSelect('jobApplied.user', 'user')
            .leftJoinAndSelect('user.resume', 'resume')
            .leftJoinAndSelect('resume.workExperience', 'workExperience')
            .leftJoinAndSelect('resume.skills', 'skills')
            .leftJoinAndSelect('jobApplied.job', 'job')
            .leftJoinAndSelect('job.shortlisted', 'shortlisted')
            .leftJoinAndSelect('shortlisted.user', 'shortlistedUser')
            .where('job.id = :jobId', { jobId })
            .getMany();
        return result;
    }
    async findJobBookmarked(jobId) {
        const result = await this.jobBookmarkedRepository
            .createQueryBuilder('jobBookmarked')
            .leftJoinAndSelect('jobBookmarked.user', 'user')
            .leftJoinAndSelect('user.resume', 'resume')
            .leftJoinAndSelect('resume.workExperience', 'workExperience')
            .leftJoinAndSelect('resume.skills', 'skills')
            .leftJoinAndSelect('jobBookmarked.job', 'job')
            .leftJoinAndSelect('job.shortlisted', 'shortlisted')
            .leftJoinAndSelect('shortlisted.user', 'shortlistedUser')
            .where('job.id = :jobId', { jobId })
            .getMany();
        return result;
    }
    async findJobAppliedByUser(userId, jobId) {
        const result = await this.jobAppliedRepository
            .createQueryBuilder('jobApplied')
            .where('jobApplied.user = :userId', { userId })
            .andWhere('jobApplied.job = :jobId', { jobId })
            .getOne();
        return result;
    }
    async findJobShortlistedByUser(userId, jobId) {
        const result = await this.jobShortlistedRepository
            .createQueryBuilder('jobShortlist')
            .where('jobShortlist.user = :userId', { userId })
            .andWhere('jobShortlist.job = :jobId', { jobId })
            .getOne();
        return result;
    }
    async findJobBookmarkedByUser(userId, jobId) {
        const result = await this.jobBookmarkedRepository
            .createQueryBuilder('jobBookmarked')
            .where('jobBookmarked.user = :userId', { userId })
            .andWhere('jobBookmarked.job = :jobId', { jobId })
            .getOne();
        return result;
    }
    async findJobsAppliedByUser(userId) {
        const result = await this.jobAppliedRepository
            .createQueryBuilder('jobApplied')
            .leftJoinAndSelect('jobApplied.job', 'job')
            .leftJoinAndSelect('job.organisation', 'organisation')
            .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
            .leftJoinAndSelect('job.shortlisted', 'shortlisted', 'shortlisted.user = :shortlistedUser', { shortlistedUser: userId })
            .where('jobApplied.user = :userId', { userId })
            .getMany();
        return result;
    }
    async findJobsBookmarkedByUser(userId) {
        const result = await this.jobBookmarkedRepository
            .createQueryBuilder('jobBookmarked')
            .leftJoinAndSelect('jobBookmarked.job', 'job')
            .leftJoinAndSelect('job.organisation', 'organisation')
            .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
            .leftJoinAndSelect('job.applied', 'applied', 'applied.user = :appliedUser', { appliedUser: userId })
            .where('jobBookmarked.user = :userId', { userId })
            .getMany();
        return result;
    }
    findAllJobs() {
        return this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.organisation', 'organisation')
            .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
            .leftJoinAndSelect('job.requiredSkills', 'requiredSkills')
            .leftJoinAndSelect('job.experienceRequired', 'experienceRequired')
            .leftJoinAndSelect('job.otherLanguages', 'otherLanguages')
            .getMany();
    }
    findAllJobsByOrganisation(id) {
        return this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.organisation', 'organisation')
            .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
            .loadRelationCountAndMap('job.appliedCount', 'job.applied')
            .where('organisation.id = :id', { id })
            .getMany();
    }
    async findAllJobsFiltered(param, addData = [], userId) {
        Object.keys(param).map((k) => {
            param[k] = param[k].toLocaleLowerCase();
        });
        const query = this.jobRepository
            .createQueryBuilder('job')
            .leftJoinAndSelect('job.organisation', 'organisation')
            .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
            .leftJoinAndSelect('job.requiredSkills', 'requiredSkills')
            .leftJoinAndSelect('job.experienceRequired', 'experienceRequired')
            .leftJoinAndSelect('job.otherLanguages', 'otherLanguages');
        if (addData.includes('applied')) {
            query.leftJoinAndSelect('job.applied', 'applied', 'applied.user = :userId', {
                userId,
            });
        }
        if (addData.includes('bookmarked')) {
            query
                .leftJoinAndSelect('job.bookmarked', 'bookmarked', 'bookmarked.user = :userId', { userId })
                .leftJoinAndSelect('bookmarked.user', 'bookmarkedUser');
        }
        if (param.organisationName || param.searchAll)
            query.orWhere('LOWER(organisation.name) LIKE :organisationName', {
                organisationName: `%${param.organisationName || param.searchAll}%`,
            });
        if (param.organisationIndustrySector || param.searchAll)
            query.orWhere('LOWER(organisation.industrySector) LIKE :organisationIndustrySector', {
                organisationIndustrySector: `%${param.organisationIndustrySector || param.searchAll}%`,
            });
        if (param.jobTitle || param.searchAll)
            query.orWhere('LOWER(job.title) LIKE :jobTitle', {
                jobTitle: `%${param.jobTitle || param.searchAll}%`,
            });
        if (param.jobAddress || param.location)
            query.orWhere(`LOWER(job.address) LIKE :jobAddress`, {
                jobAddress: `%${param.jobAddress || param.location}%`,
            });
        if (param.jobState || param.location)
            query.orWhere('LOWER(job.state) LIKE :jobState', {
                jobState: `%${param.jobState || param.location}%`,
            });
        if (param.jobCity || param.location)
            query.orWhere('LOWER(job.city) LIKE :jobCity', {
                jobCity: `%${param.jobCity || param.location}%`,
            });
        if (param.jobPinCode || param.location)
            query.orWhere('LOWER(job.pinCode) LIKE :jobPinCode', {
                jobPinCode: `%${param.jobPinCode || param.location}%`,
            });
        if (param.jobLandmark || param.location)
            query.orWhere('LOWER(job.landmark) LIKE :jobLandmark', {
                jobLandmark: `%${param.jobLandmark || param.location}%`,
            });
        if (param.branchAddress || param.location)
            query.orWhere('LOWER(organisationBranch.address) LIKE :branchAddress', {
                branchAddress: `%${param.branchAddress || param.location}%`,
            });
        if (param.branchState || param.location)
            query.orWhere('LOWER(organisationBranch.state) LIKE :branchState', {
                branchState: `%${param.branchState || param.location}%`,
            });
        if (param.branchCity || param.location)
            query.orWhere('LOWER(organisationBranch.city) LIKE :branchCity', {
                branchCity: `%${param.branchCity || param.location}%`,
            });
        if (param.branchPinCode || param.location)
            query.orWhere('LOWER(organisationBranch.pinCode) LIKE :branchPinCode', {
                branchPinCode: `%${param.branchPinCode || param.location}%`,
            });
        if (param.branchLandmark || param.location)
            query.orWhere('LOWER(organisationBranch.landmark) LIKE :branchLandmark', {
                branchLandmark: `%${param.branchLandmark || param.location}%`,
            });
        if (param.sort === 'high_to_low_salary')
            query.orderBy('job.maxSalary', 'DESC');
        if (param.sort === 'low_to_high_salary')
            query.orderBy('job.maxSalary', 'ASC');
        if (param.sort === 'old_to_recent')
            query.orderBy('job.createdAt', 'ASC');
        if (param.sort === 'recent_to_old')
            query.orderBy('job.createdAt', 'DESC');
        const data = await query.getMany();
        return data;
    }
    findOne(id) {
        return `This action returns a #${id} hiring`;
    }
    removeAllJobs() {
        return this.jobRepository.delete({});
    }
    removeJob(id) {
        return this.jobRepository.delete(id);
    }
    async removeJobBookmarked(userId, jobId) {
        return await this.jobBookmarkedRepository
            .createQueryBuilder('jobBookmarked')
            .where('user = :userId', { userId })
            .andWhere('job = :jobId', { jobId })
            .delete()
            .execute();
    }
};
HiringService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(jobExperienceRequired_entity_1.JobExperienceRequired)),
    __param(2, (0, typeorm_1.InjectRepository)(jobOtherLanguage_entity_1.JobOtherLanguage)),
    __param(3, (0, typeorm_1.InjectRepository)(jobRequiredSkills_entity_1.JobRequiredSkill)),
    __param(4, (0, typeorm_1.InjectRepository)(jobApplied_entity_1.default)),
    __param(5, (0, typeorm_1.InjectRepository)(jobBookmark_entity_1.default)),
    __param(6, (0, typeorm_1.InjectRepository)(jobShortlisted_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HiringService);
exports.HiringService = HiringService;
//# sourceMappingURL=hiring.service.js.map