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
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require('moment');
const typeorm_2 = require("typeorm");
const resume_entity_1 = require("./entities/resume.entity");
const resumeDocument_entity_1 = require("./entities/resumeDocument.entity");
const resumeLanguage_entity_1 = require("./entities/resumeLanguage.entity");
const resumeSkills_entity_1 = require("./entities/resumeSkills.entity");
const resumeWorkExperience_1 = require("./entities/resumeWorkExperience");
const resumeEducation_entity_1 = require("./entities/resumeEducation.entity");
let ResumeService = class ResumeService {
    constructor(resumeRepository, resumeLanguageRepository, resumeSkillsRepository, resumeDocumentRepository, resumeWorkExperienceRepository, resumeEducationRepository) {
        this.resumeRepository = resumeRepository;
        this.resumeLanguageRepository = resumeLanguageRepository;
        this.resumeSkillsRepository = resumeSkillsRepository;
        this.resumeDocumentRepository = resumeDocumentRepository;
        this.resumeWorkExperienceRepository = resumeWorkExperienceRepository;
        this.resumeEducationRepository = resumeEducationRepository;
    }
    create(data) {
        const resume = this.resumeRepository.create(data);
        return resume;
    }
    async save(data) {
        const resume = await this.resumeRepository.save(data);
        return resume;
    }
    async createOtherLanguages(data) {
        const resumeLanguageData = data.map((i) => this.resumeLanguageRepository.create(Object.assign({}, i)));
        const resumeLanguage = await this.resumeLanguageRepository.save(resumeLanguageData);
        return resumeLanguage;
    }
    async createSkills(data) {
        const resumeSkillsData = data.map((i) => this.resumeSkillsRepository.create(Object.assign({}, i)));
        const resumeSkills = await this.resumeSkillsRepository.save(resumeSkillsData);
        return resumeSkills;
    }
    async createDocuments(data) {
        const resumeDocumentData = data.map((i) => this.resumeDocumentRepository.create(Object.assign({}, i)));
        const resumeDocument = await this.resumeDocumentRepository.save(resumeDocumentData);
        return resumeDocument;
    }
    async createWorkExperience(data) {
        const resumeWorkExperience = data.map((i) => this.resumeWorkExperienceRepository.create(Object.assign({}, i)));
        const workExperience = await this.resumeWorkExperienceRepository.save(resumeWorkExperience);
        return workExperience;
    }
    findAll() {
        return this.resumeRepository.find();
    }
    findOne(id) {
        return this.resumeRepository
            .createQueryBuilder('resume')
            .leftJoinAndSelect('resume.otherLanguages', 'otherLanguages')
            .leftJoinAndSelect('resume.workExperience', 'workExperience')
            .leftJoinAndSelect('resume.skills', 'skills')
            .leftJoinAndSelect('resume.documents', 'documents')
            .leftJoinAndSelect('resume.user', 'user')
            .where('resume.id = :id', { id })
            .getOne();
    }
    findByUser(userId) {
        return this.resumeRepository
            .createQueryBuilder('resume')
            .leftJoinAndSelect('resume.education', 'education')
            .leftJoinAndSelect('resume.otherLanguages', 'otherLanguages')
            .leftJoinAndSelect('resume.workExperience', 'workExperience')
            .leftJoinAndSelect('resume.skills', 'skills')
            .leftJoinAndSelect('resume.documents', 'documents')
            .leftJoinAndSelect('resume.user', 'user')
            .where('resume.user = :userId', { userId })
            .getOne();
    }
    update(id, data) {
        return this.resumeRepository.update(id, data);
    }
    async deleteAndInsertOtherLanguages(_data, resume) {
        const data = _data.map((i) => (Object.assign(Object.assign({}, i), { resume })));
        const ids = data.map((i) => i.id);
        if (ids.length) {
            await this.resumeLanguageRepository
                .createQueryBuilder('resumeLanguageRepository')
                .where('resume = :id', { id: resume.id })
                .delete()
                .execute();
        }
        const insertResult = await this.resumeLanguageRepository.insert(data);
        return insertResult;
    }
    async deleteAndInsertSkills(_data, resume) {
        const data = _data.map((i) => (Object.assign(Object.assign({}, i), { resume })));
        const ids = data.map((i) => i.id);
        if (ids.length) {
            await this.resumeSkillsRepository
                .createQueryBuilder('resumeSkills')
                .where('resume = :id', { id: resume.id })
                .delete()
                .execute();
        }
        const insertResult = await this.resumeSkillsRepository.insert(data);
        return insertResult;
    }
    async deleteAndInsertDocuments(_data, resume) {
        const data = _data.map((i) => (Object.assign(Object.assign({}, i), { resume })));
        const ids = data.map((i) => i.id);
        if (ids.length) {
            await this.resumeDocumentRepository
                .createQueryBuilder('resumeDocumentRepository')
                .where('resume = :id', { id: resume.id })
                .delete()
                .execute();
        }
        const insertResult = await this.resumeDocumentRepository.insert(data);
        return insertResult;
    }
    async deleteAndInsertWorkExperience(_data, resume) {
        const data = _data.map((i) => (Object.assign(Object.assign({}, i), { resume })));
        const ids = data.map((i) => i.id);
        if (ids.length) {
            await this.resumeWorkExperienceRepository
                .createQueryBuilder('resumeWorkExperienceRepository')
                .where('resume = :id', { id: resume.id })
                .delete()
                .execute();
        }
        const insertResult = await this.resumeWorkExperienceRepository.insert(data);
        return insertResult;
    }
    async saveResumeEducation(data) {
        return await this.resumeEducationRepository.save(data);
    }
    async deleteAndInsertResumeEducation(_data, resumeId) {
        const data = _data.map((i) => (Object.assign(Object.assign({}, i), { resume: { id: resumeId } })));
        const ids = data.map((i) => i.id);
        if (ids.length) {
            await this.resumeEducationRepository
                .createQueryBuilder('resumeEducationRepository')
                .where('resume = :id', { id: resumeId })
                .delete()
                .execute();
        }
        const insertResult = await this.resumeEducationRepository.insert(data);
        return insertResult;
    }
    remove(id) {
        return this.resumeRepository.delete(id);
    }
    calculateWorkExperience(we) {
        let totalExperienceInMonth = 0;
        let totalExperienceInYears = 0;
        we.forEach((wei) => {
            const from = moment(wei.from);
            const to = moment(wei.to);
            totalExperienceInMonth += to.diff(from, 'months');
            totalExperienceInYears += to.diff(from, 'years');
        });
        if (totalExperienceInMonth >= 12) {
            return {
                value: totalExperienceInYears,
                unit: 'year',
            };
        }
        else {
            return {
                value: totalExperienceInMonth,
                unit: 'month',
            };
        }
    }
};
ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __param(1, (0, typeorm_1.InjectRepository)(resumeLanguage_entity_1.ResumeLanguage)),
    __param(2, (0, typeorm_1.InjectRepository)(resumeSkills_entity_1.ResumeSkill)),
    __param(3, (0, typeorm_1.InjectRepository)(resumeDocument_entity_1.ResumeDocument)),
    __param(4, (0, typeorm_1.InjectRepository)(resumeWorkExperience_1.default)),
    __param(5, (0, typeorm_1.InjectRepository)(resumeEducation_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ResumeService);
exports.ResumeService = ResumeService;
//# sourceMappingURL=resume.service.js.map