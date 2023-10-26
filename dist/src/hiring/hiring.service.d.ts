import { jobFilterType } from '../types/requestData.types';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { CreateJobExperienceRequired, CreateJobOtherLanguage, CreateJobRequiredSkill } from './dto/create-job.dto';
import Job from './entities/job.entity';
import { JobExperienceRequired } from './entities/jobExperienceRequired.entity';
import { JobOtherLanguage } from './entities/jobOtherLanguage.entity';
import { JobRequiredSkill } from './entities/jobRequiredSkills.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import JobApplied from './entities/jobApplied.entity';
import JobBookmarked from './entities/jobBookmark.entity';
import JobShortlisted from './entities/jobShortlisted.entity';
export declare class HiringService {
    private jobRepository;
    private jobExperienceRequiredRepository;
    private jobOtherLanguageRepository;
    private jobRequiredSkillRepository;
    private jobAppliedRepository;
    private jobBookmarkedRepository;
    private jobShortlistedRepository;
    constructor(jobRepository: Repository<Job>, jobExperienceRequiredRepository: Repository<JobExperienceRequired>, jobOtherLanguageRepository: Repository<JobOtherLanguage>, jobRequiredSkillRepository: Repository<JobRequiredSkill>, jobAppliedRepository: Repository<JobApplied>, jobBookmarkedRepository: Repository<JobBookmarked>, jobShortlistedRepository: Repository<JobShortlisted>);
    createJob(data: DeepPartial<Job>): Job;
    saveJob(data: Job): Promise<Job>;
    createJobApplied(data: DeepPartial<JobApplied>): Promise<DeepPartial<JobApplied> & JobApplied>;
    createJobBookmarked(data: DeepPartial<JobBookmarked>): Promise<DeepPartial<JobBookmarked> & JobBookmarked>;
    createJobShortlisted(data: DeepPartial<JobShortlisted>): Promise<DeepPartial<JobShortlisted> & JobShortlisted>;
    rejectCandidate(userId: number, jobId: number): Promise<import("typeorm").UpdateResult>;
    removeJobShortlisted(jobId: number, userId: number): Promise<DeleteResult>;
    updateJob(id: number, data: QueryDeepPartialEntity<Job>): Promise<import("typeorm").UpdateResult>;
    createJobExperienceRequired(data: CreateJobExperienceRequired[], jobId?: number): Promise<JobExperienceRequired[]>;
    createJobOtherLanguages(data: CreateJobOtherLanguage[], jobId?: number): Promise<JobOtherLanguage[]>;
    createJobRequiredSkills(data: CreateJobRequiredSkill[], jobId?: number): Promise<JobRequiredSkill[]>;
    deleteJobExperienceRequired(data: number[]): Promise<DeleteResult>;
    deleteJobOtherLanguages(data: number[]): Promise<DeleteResult>;
    deleteJobRequiredSkills(data: number[]): Promise<DeleteResult>;
    findOneJob(id: number): Promise<Job>;
    findOneJobOrThrow(id: number): Promise<Job>;
    findJobShortlistWithoutRejected(jobId: number): Promise<JobShortlisted[]>;
    findJobApplied(jobId: number): Promise<JobApplied[]>;
    findJobBookmarked(jobId: number): Promise<JobBookmarked[]>;
    findJobAppliedByUser(userId: number, jobId: number): Promise<JobApplied>;
    findJobShortlistedByUser(userId: number, jobId: number): Promise<JobShortlisted>;
    findJobBookmarkedByUser(userId: number, jobId: number): Promise<JobBookmarked>;
    findJobsAppliedByUser(userId: number): Promise<JobApplied[]>;
    findJobsBookmarkedByUser(userId: number): Promise<JobBookmarked[]>;
    findAllJobs(): Promise<Job[]>;
    findAllJobsByOrganisation(id: number): Promise<Job[]>;
    findAllJobsFiltered(param: jobFilterType, addData?: string[], userId?: number): Promise<Job[]>;
    findOne(id: number): string;
    removeAllJobs(): Promise<DeleteResult>;
    removeJob(id: number): Promise<DeleteResult>;
    removeJobBookmarked(userId: number, jobId: number): Promise<DeleteResult>;
}
