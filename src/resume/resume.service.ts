import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const moment = require('moment'); // require
import { WorkExperienceResponse } from 'src/types/responseData.types';
import { DeepPartial, DeleteResult, InsertResult, Repository } from 'typeorm';
import {
  CreateResumeDocument,
  CreateResumeLanguage,
  CreateResumeSkills,
  CreateResumeWorkExperience,
} from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';
import { ResumeDocument } from './entities/resumeDocument.entity';
import { ResumeLanguage } from './entities/resumeLanguage.entity';
import { ResumeSkill } from './entities/resumeSkills.entity';
import ResumeWorkExperience from './entities/resumeWorkExperience';
import ResumeEducation from './entities/resumeEducation.entity';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private resumeRepository: Repository<Resume>,
    @InjectRepository(ResumeLanguage)
    private resumeLanguageRepository: Repository<ResumeLanguage>,
    @InjectRepository(ResumeSkill)
    private resumeSkillsRepository: Repository<ResumeSkill>,
    @InjectRepository(ResumeDocument)
    private resumeDocumentRepository: Repository<ResumeDocument>,
    @InjectRepository(ResumeWorkExperience)
    private resumeWorkExperienceRepository: Repository<ResumeWorkExperience>,
    @InjectRepository(ResumeEducation)
    private resumeEducationRepository: Repository<ResumeEducation>,
  ) {}
  create(data: DeepPartial<Resume>) {
    const resume = this.resumeRepository.create(data);
    return resume;
  }
  async save(data: Resume) {
    const resume = await this.resumeRepository.save(data);
    return resume;
  }

  async createOtherLanguages(
    data: DeepPartial<CreateResumeLanguage>[],
  ): Promise<ResumeLanguage[]> {
    const resumeLanguageData = data.map((i) =>
      this.resumeLanguageRepository.create({ ...i }),
    );
    const resumeLanguage = await this.resumeLanguageRepository.save(
      resumeLanguageData,
    );
    return resumeLanguage;
  }
  async createSkills(
    data: DeepPartial<CreateResumeSkills>[],
  ): Promise<ResumeSkill[]> {
    const resumeSkillsData = data.map((i) =>
      this.resumeSkillsRepository.create({ ...i }),
    );
    const resumeSkills = await this.resumeSkillsRepository.save(
      resumeSkillsData,
    );
    return resumeSkills;
  }
  async createDocuments(
    data: DeepPartial<CreateResumeDocument>[],
  ): Promise<ResumeDocument[]> {
    const resumeDocumentData = data.map((i) =>
      this.resumeDocumentRepository.create({ ...i }),
    );
    const resumeDocument = await this.resumeDocumentRepository.save(
      resumeDocumentData,
    );
    return resumeDocument;
  }
  async createWorkExperience(
    data: DeepPartial<CreateResumeWorkExperience>[],
  ): Promise<ResumeWorkExperience[]> {
    const resumeWorkExperience = data.map((i) =>
      this.resumeWorkExperienceRepository.create({ ...i }),
    );
    const workExperience = await this.resumeWorkExperienceRepository.save(
      resumeWorkExperience,
    );
    return workExperience;
  }

  findAll() {
    return this.resumeRepository.find();
  }

  findOne(id: number) {
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

  findByUser(userId: number) {
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

  update(id: number, data: DeepPartial<Resume>) {
    return this.resumeRepository.update(id, data);
  }

  async deleteAndInsertOtherLanguages(
    _data: DeepPartial<ResumeLanguage>[],
    resume: Resume,
  ): Promise<InsertResult> {
    const data = _data.map((i) => ({ ...i, resume }));
    const ids: number[] = data.map((i) => i.id);
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
  async deleteAndInsertSkills(
    _data: DeepPartial<ResumeSkill>[],
    resume: Resume,
  ): Promise<InsertResult> {
    const data = _data.map((i) => ({ ...i, resume }));
    const ids: number[] = data.map((i) => i.id);
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
  async deleteAndInsertDocuments(
    _data: DeepPartial<ResumeDocument>[],
    resume: Resume,
  ): Promise<InsertResult> {
    const data = _data.map((i) => ({ ...i, resume }));
    const ids: number[] = data.map((i) => i.id);
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
  async deleteAndInsertWorkExperience(
    _data: DeepPartial<ResumeWorkExperience>[],
    resume: Resume,
  ): Promise<InsertResult> {
    const data = _data.map((i) => ({ ...i, resume }));
    const ids: number[] = data.map((i) => i.id);
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

  async saveResumeEducation(data: DeepPartial<ResumeEducation[]>) {
    return await this.resumeEducationRepository.save(data);
  }
  async deleteAndInsertResumeEducation(
    _data: DeepPartial<ResumeEducation>[],
    resumeId: number,
  ): Promise<InsertResult> {
    const data = _data.map((i) => ({ ...i, resume: { id: resumeId } }));
    const ids: number[] = data.map((i) => i.id);
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

  remove(id: number) {
    return this.resumeRepository.delete(id);
  }

  calculateWorkExperience(we: ResumeWorkExperience[]): WorkExperienceResponse {
    let totalExperienceInMonth = 0;
    let totalExperienceInYears = 0;
    we.forEach((wei) => {
      // console.log(moment);

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
    } else {
      return {
        value: totalExperienceInMonth,
        unit: 'month',
      };
    }
  }
}
