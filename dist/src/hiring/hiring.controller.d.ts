import { HiringService } from './hiring.service';
import { CreateJobDto, UpdateJobDto } from './dto/create-job.dto';
import { jobFilterType } from '../types/requestData.types';
import { DeepPartial } from 'typeorm';
import Job from './entities/job.entity';
import { AuthRequest } from '../types/AuthRequest';
import { JobAppliedByUserType, JobAppliedResponse, JobBookmarkedResponse, JobShortlistedResponseType, JobResponseType, JobBookmarkedByUserType } from '../types/responseData.types';
import { ResumeService } from '../resume/resume.service';
import { NotificationService } from '../notification/notification.service';
import { OrganisationService } from '../organisation/organisation.service';
export declare class HiringController {
    private readonly hiringService;
    private readonly resumeService;
    private readonly notificationService;
    private readonly organisationService;
    constructor(hiringService: HiringService, resumeService: ResumeService, notificationService: NotificationService, organisationService: OrganisationService);
    createJob(createJobDto: CreateJobDto): Promise<Job>;
    createJobApplied(request: AuthRequest, id: string): Promise<DeepPartial<import("./entities/jobApplied.entity").default> & import("./entities/jobApplied.entity").default>;
    createJobBookmarked(request: AuthRequest, id: string): Promise<DeepPartial<import("./entities/jobBookmark.entity").default> & import("./entities/jobBookmark.entity").default>;
    createJobShortlisted(id: string, userId: string): Promise<DeepPartial<import("./entities/jobShortlisted.entity").default> & import("./entities/jobShortlisted.entity").default>;
    rejectCandidate(id: string, userId: string): Promise<import("typeorm").UpdateResult>;
    closeJob(id: string): Promise<import("typeorm").UpdateResult>;
    findAllJobsFiltered(request: AuthRequest, jobFilter: jobFilterType): Promise<JobResponseType[]>;
    findAllJobs(): Promise<Job[]>;
    findAllJobsByOrganisation(id: string): Promise<Job[]>;
    findJobAppliedByUser(request: AuthRequest): Promise<JobAppliedByUserType[]>;
    findJobBookmarkedByUser(request: AuthRequest): Promise<JobBookmarkedByUserType[]>;
    findJobShortlist(id: string): Promise<JobShortlistedResponseType[]>;
    findJobApplied(id: string): Promise<JobAppliedResponse[]>;
    findJobBookmarked(id: string): Promise<JobBookmarkedResponse[]>;
    findOneJob(request: AuthRequest, id: string): Promise<JobResponseType>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<import("typeorm").UpdateResult>;
    removeJobShortlisted(id: string, userId: string): Promise<import("typeorm").DeleteResult>;
    removeJobBookmarked(request: AuthRequest, id: string): Promise<import("typeorm").DeleteResult>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
