import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jobFilterType, jobsShortByTypes } from '../types/requestData.types';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { CreateHiringDto } from './dto/create-hiring.dto';
import {
  CreateJobExperienceRequired,
  CreateJobOtherLanguage,
  CreateJobRequiredSkill,
} from './dto/create-job.dto';
import Job from './entities/job.entity';
import { JobExperienceRequired } from './entities/jobExperienceRequired.entity';
import { JobOtherLanguage } from './entities/jobOtherLanguage.entity';
import { JobRequiredSkill } from './entities/jobRequiredSkills.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import JobApplied from './entities/jobApplied.entity';
import JobBookmarked from './entities/jobBookmark.entity';
import JobShortlisted from './entities/jobShortlisted.entity';

@Injectable()
export class HiringService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(JobExperienceRequired)
    private jobExperienceRequiredRepository: Repository<JobExperienceRequired>,
    @InjectRepository(JobOtherLanguage)
    private jobOtherLanguageRepository: Repository<JobOtherLanguage>,
    @InjectRepository(JobRequiredSkill)
    private jobRequiredSkillRepository: Repository<JobRequiredSkill>,
    @InjectRepository(JobApplied)
    private jobAppliedRepository: Repository<JobApplied>,
    @InjectRepository(JobBookmarked)
    private jobBookmarkedRepository: Repository<JobBookmarked>,
    @InjectRepository(JobShortlisted)
    private jobShortlistedRepository: Repository<JobShortlisted>,
  ) {}

  createJob(data: DeepPartial<Job>) {
    const resume = this.jobRepository.create(data);
    return resume;
  }

  async saveJob(data: Job) {
    return await this.jobRepository.save(data);
  }

  async createJobApplied(data: DeepPartial<JobApplied>) {
    return await this.jobAppliedRepository.save(data);
  }

  async createJobBookmarked(data: DeepPartial<JobBookmarked>) {
    return await this.jobBookmarkedRepository.save(data);
  }

  async createJobShortlisted(data: DeepPartial<JobShortlisted>) {
    return await this.jobShortlistedRepository.save(data);
  }

  async rejectCandidate(userId: number, jobId: number) {
    return await this.jobShortlistedRepository
      .createQueryBuilder('jobShortlisted')
      .update()
      .where('job = :jobId', { jobId })
      .andWhere('user = :userId', { userId })
      .set({ isRejected: true })
      .execute();
  }

  async removeJobShortlisted(jobId: number, userId: number) {
    return await this.jobShortlistedRepository
      .createQueryBuilder('jobShortlisted')
      .where('jobId = :jobId', { jobId })
      .andWhere('userId = :userId', { userId })
      .delete()
      .execute();
  }

  async updateJob(id: number, data: QueryDeepPartialEntity<Job>) {
    console.log(
      this.jobRepository
        .createQueryBuilder('job')
        .update(data)
        .where('job.id = :id', { id })
        .getQuery(),
    );

    return await this.jobRepository
      .createQueryBuilder('job')
      .update(data)
      .where('job.id = :id', { id })
      .execute();
  }

  async createJobExperienceRequired(
    data: CreateJobExperienceRequired[],
    jobId?: number,
  ): Promise<JobExperienceRequired[]> {
    const branchData = data.map((i) => {
      const data: DeepPartial<JobExperienceRequired> = i;
      if (jobId) data.job = { id: jobId };
      return this.jobExperienceRequiredRepository.create({ ...i });
    });
    const branch = await this.jobExperienceRequiredRepository.save(branchData);
    return branch;
  }
  async createJobOtherLanguages(
    data: CreateJobOtherLanguage[],
    jobId?: number,
  ): Promise<JobOtherLanguage[]> {
    const branchData = data.map((i) => {
      const data: DeepPartial<JobOtherLanguage> = i;
      if (jobId) data.job = { id: jobId };
      return this.jobOtherLanguageRepository.create({ ...i });
    });
    const branch = await this.jobOtherLanguageRepository.save(branchData);
    return branch;
  }
  async createJobRequiredSkills(
    data: CreateJobRequiredSkill[],
    jobId?: number,
  ): Promise<JobRequiredSkill[]> {
    const branchData = data.map((i) => {
      const data: DeepPartial<JobRequiredSkill> = i;
      if (jobId) data.job = { id: jobId };
      return this.jobRequiredSkillRepository.create({ ...i });
    });
    const branch = await this.jobRequiredSkillRepository.save(branchData);
    return branch;
  }

  async deleteJobExperienceRequired(data: number[]): Promise<DeleteResult> {
    if (!data.length) return;
    const branch = await this.jobExperienceRequiredRepository.delete(data);
    return branch;
  }
  async deleteJobOtherLanguages(data: number[]): Promise<DeleteResult> {
    if (!data.length) return;
    const branch = await this.jobOtherLanguageRepository.delete(data);
    return branch;
  }
  async deleteJobRequiredSkills(data: number[]): Promise<DeleteResult> {
    if (!data.length) return;
    const branch = await this.jobRequiredSkillRepository.delete(data);
    return branch;
  }

  async findOneJob(id: number) {
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

  async findOneJobOrThrow(id: number) {
    const result = await this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.organisation', 'organisation')
      .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
      .leftJoinAndSelect('job.requiredSkills', 'requiredSkills')
      .leftJoinAndSelect('job.experienceRequired', 'experienceRequired')
      .leftJoinAndSelect('job.otherLanguages', 'otherLanguages')
      .where('job.id = :id', { id })
      .getOne();
    if (!result) throw new BadRequestException('Job not found!');
    return result;
  }

  async findJobShortlistWithoutRejected(jobId: number) {
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
  async findJobApplied(jobId: number) {
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
  async findJobBookmarked(jobId: number) {
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

  async findJobAppliedByUser(userId: number, jobId: number) {
    const result = await this.jobAppliedRepository

      .createQueryBuilder('jobApplied')
      .where('jobApplied.user = :userId', { userId })
      .andWhere('jobApplied.job = :jobId', { jobId })
      .getOne();
    return result;
  }
  async findJobShortlistedByUser(userId: number, jobId: number) {
    const result = await this.jobShortlistedRepository
      .createQueryBuilder('jobShortlist')
      .where('jobShortlist.user = :userId', { userId })
      .andWhere('jobShortlist.job = :jobId', { jobId })
      .getOne();
    return result;
  }
  async findJobBookmarkedByUser(userId: number, jobId: number) {
    const result = await this.jobBookmarkedRepository
      .createQueryBuilder('jobBookmarked')
      .where('jobBookmarked.user = :userId', { userId })
      .andWhere('jobBookmarked.job = :jobId', { jobId })
      .getOne();
    return result;
  }

  async findJobsAppliedByUser(userId: number) {
    const result = await this.jobAppliedRepository
      .createQueryBuilder('jobApplied')
      .leftJoinAndSelect('jobApplied.job', 'job')
      .leftJoinAndSelect('job.organisation', 'organisation')
      .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
      .leftJoinAndSelect(
        'job.shortlisted',
        'shortlisted',
        'shortlisted.user = :shortlistedUser',
        { shortlistedUser: userId },
      )
      .where('jobApplied.user = :userId', { userId })
      .getMany();
    return result;
  }
  async findJobsBookmarkedByUser(userId: number) {
    const result = await this.jobBookmarkedRepository
      .createQueryBuilder('jobBookmarked')
      .leftJoinAndSelect('jobBookmarked.job', 'job')
      .leftJoinAndSelect('job.organisation', 'organisation')
      .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
      .leftJoinAndSelect(
        'job.applied',
        'applied',
        'applied.user = :appliedUser',
        { appliedUser: userId },
      )
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

  findAllJobsByOrganisation(id: number) {
    return this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.organisation', 'organisation')
      .leftJoinAndSelect('job.organisationBranch', 'organisationBranch')
      .loadRelationCountAndMap('job.appliedCount', 'job.applied')
      .where('organisation.id = :id', { id })
      .getMany();
  }
  //title, sector, company, location
  async findAllJobsFiltered(
    param: jobFilterType,
    addData: string[] = [],
    userId?: number,
  ) {
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
      query.leftJoinAndSelect(
        'job.applied',
        'applied',
        'applied.user = :userId',
        {
          userId,
        },
      );
    }

    if (addData.includes('bookmarked')) {
      query
        .leftJoinAndSelect(
          'job.bookmarked',
          'bookmarked',
          'bookmarked.user = :userId',
          { userId },
        )
        .leftJoinAndSelect('bookmarked.user', 'bookmarkedUser');
    }

    if (param.organisationName || param.searchAll)
      query.orWhere('LOWER(organisation.name) LIKE :organisationName', {
        organisationName: `%${param.organisationName || param.searchAll}%`,
      });

    if (param.organisationIndustrySector || param.searchAll)
      query.orWhere(
        'LOWER(organisation.industrySector) LIKE :organisationIndustrySector',
        {
          organisationIndustrySector: `%${
            param.organisationIndustrySector || param.searchAll
          }%`,
        },
      );

    if (param.jobTitle || param.searchAll)
      query.orWhere('LOWER(job.title) LIKE :jobTitle', {
        jobTitle: `%${param.jobTitle || param.searchAll}%`,
      });

    // if (param.branchName || param.searchAll)
    //   query.orWhere('LOWER(organisationBranch.name) LIKE :branchName', {
    //     branchName: `%${param.branchName || param.searchAll}%`,
    //   });
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
    if (param.sort === 'old_to_recent') query.orderBy('job.createdAt', 'ASC');
    if (param.sort === 'recent_to_old') query.orderBy('job.createdAt', 'DESC');

    const data = await query.getMany();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} hiring`;
  }

  removeAllJobs() {
    return this.jobRepository.delete({});
  }

  removeJob(id: number) {
    return this.jobRepository.delete(id);
  }

  async removeJobBookmarked(userId: number, jobId: number) {
    return await this.jobBookmarkedRepository
      .createQueryBuilder('jobBookmarked')
      .where('user = :userId', { userId })
      .andWhere('job = :jobId', { jobId })
      .delete()
      .execute();
  }
}
