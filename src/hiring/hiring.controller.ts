import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Query,
  Patch,
  Request,
} from '@nestjs/common';
import { HiringService } from './hiring.service';
import { CreateJobDto, UpdateJobDto } from './dto/create-job.dto';
import { jobFilterType } from '../types/requestData.types';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import {
  R_hiring_jobs_applied_user,
  R_hiring_jobs_delete,
  R_hiring_jobs_get,
  R_hiring_jobs_get_one,
  R_hiring_jobs_patch,
  R_hiring_jobs_post,
} from '../types/response.example';
import { DeepPartial } from 'typeorm';
import Job from './entities/job.entity';
import { AuthRequest } from '../types/AuthRequest';
import { Roles } from '../auth/roles.decorator';
import { Roles as RoleTypes } from '../types/entity.attribute.types';
import {
  JobAppliedByUserType,
  JobAppliedResponse,
  JobBookmarkedResponse,
  JobShortlistedResponseType,
  JobResponseType,
  JobBookmarkedByUserType,
} from '../types/responseData.types';
import { ResumeService } from '../resume/resume.service';
import { NotificationService } from '../notification/notification.service';
import { OrganisationService } from '../organisation/organisation.service';

@ApiTags('Hiring')
@Controller('hiring')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class HiringController {
  constructor(
    private readonly hiringService: HiringService,
    private readonly resumeService: ResumeService,
    private readonly notificationService: NotificationService,
    private readonly organisationService: OrganisationService,
  ) {}

  @ApiResponse({ schema: { example: R_hiring_jobs_post } })
  @Post('jobs')
  async createJob(@Body() createJobDto: CreateJobDto) {
    const experienceRequired =
      await this.hiringService.createJobExperienceRequired(
        createJobDto.experienceRequired,
      );
    const otherLanguages = await this.hiringService.createJobOtherLanguages(
      createJobDto.otherLanguages,
    );
    const requiredSkills = await this.hiringService.createJobRequiredSkills(
      createJobDto.requiredSkills,
    );
    try {
      const jobData = this.hiringService.createJob({
        ...createJobDto,
        organisation: { id: createJobDto.organisationId },
        organisationBranch: { id: createJobDto.organisationBranchId },
        experienceRequired,
        otherLanguages,
        requiredSkills,
      });
      return await this.hiringService.saveJob(jobData);
    } catch (error) {
      // experienceRequired.forEach((i)=> i.delete())
      // otherLanguages.forEach((i)=> i.delete())
      // requiredSkills.forEach((i)=> i.delete())
      throw error;
    }
  }

  @Post('jobs/:id/apply')
  async createJobApplied(
    @Request() request: AuthRequest,
    @Param('id') id: string,
  ) {
    const user = request.user;
    const job = await this.hiringService.findOneJobOrThrow(+id);
    const organisation = await this.organisationService.findPartnersByOrg(
      job.organisation.id,
    );
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

  @Post('jobs/:id/bookmark')
  async createJobBookmarked(
    @Request() request: AuthRequest,
    @Param('id') id: string,
  ) {
    const user = request.user;
    const job = await this.hiringService.findOneJobOrThrow(+id);
    const organisation = await this.organisationService.findPartnersByOrg(
      job.organisation.id,
    );
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

  @Roles('BUSINESS')
  @Post('jobs/:id/shortlist/user/:userId')
  async createJobShortlisted(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
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

  @Roles('BUSINESS')
  @Post('jobs/:id/reject/user/:userId')
  async rejectCandidate(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    const job = await this.hiringService.findOneJobOrThrow(+id);
    this.notificationService.create({
      title: job.organisation.name,
      type: 'Rejected',
      description: `You’re rejected for ${job.title}`,
      user: { id: +userId },
    });
    return this.hiringService.rejectCandidate(+userId, +id);
  }

  @Roles('BUSINESS')
  @Post('jobs/:id/close')
  closeJob(@Param('id') id: string) {
    return this.hiringService.updateJob(+id, {
      isOpen: false,
    });
  }

  @ApiResponse({ schema: { example: R_hiring_jobs_get } })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'searchAll',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'location',
    type: String,
    required: false,
  })
  @ApiResponse({ schema: { example: R_hiring_jobs_get } })
  @Get('jobs/filtered')
  async findAllJobsFiltered(
    @Request() request: AuthRequest,
    @Query() jobFilter: jobFilterType,
  ) {
    const result: JobResponseType[] =
      await this.hiringService.findAllJobsFiltered(
        jobFilter,
        ['applied', 'bookmarked'],
        request.user.id,
      );
    if (request.user.role.name === RoleTypes.EMPLOYEE) {
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

  // @ApiResponse({ schema: { example: R_hiring_jobs_applied_user } })
  @Get('jobs')
  async findAllJobs() {
    const result = await this.hiringService.findAllJobs();
    return result;
  }

  @ApiResponse({ schema: { example: R_hiring_jobs_applied_user } })
  @Get('jobs/organisation/:id')
  async findAllJobsByOrganisation(@Param('id') id: string) {
    const result = await this.hiringService.findAllJobsByOrganisation(+id);
    return result;
  }

  @ApiResponse({ schema: { example: R_hiring_jobs_applied_user } })
  @Roles('EMPLOYEE')
  @Get('jobs/users/apply')
  async findJobAppliedByUser(@Request() request: AuthRequest) {
    const result: JobAppliedByUserType[] =
      await this.hiringService.findJobsAppliedByUser(request.user.id);
    result.forEach((jobApplied) => {
      if (jobApplied.job && jobApplied.job.shortlisted) {
        // @ts-ignore
        jobApplied.job.shortlisted = jobApplied.job.shortlisted.length === 1;
      } else {
      }
    });
    return result;
  }
  @Roles('EMPLOYEE')
  @Get('jobs/users/bookmark')
  async findJobBookmarkedByUser(@Request() request: AuthRequest) {
    const result: JobBookmarkedByUserType[] =
      await this.hiringService.findJobsBookmarkedByUser(request.user.id);
    result.forEach((jobBookMarked) => {
      if (jobBookMarked.job && jobBookMarked.job.applied) {
        jobBookMarked.isApplied = jobBookMarked.job.applied.length === 1;
      }
    });
    return result;
  }

  @Get('jobs/:id/shortlist')
  async findJobShortlist(@Param('id') id: string) {
    const result: JobShortlistedResponseType[] =
      await this.hiringService.findJobShortlistWithoutRejected(+id);
    result.forEach((i) => {
      i.workExperience = this.resumeService.calculateWorkExperience(
        i.user.resume.workExperience,
      );
    });
    return result;
  }
  @Get('jobs/:id/apply')
  async findJobApplied(@Param('id') id: string) {
    const result: JobAppliedResponse[] =
      await this.hiringService.findJobApplied(+id);
    result.forEach((i) => {
      i.workExperience = null;
      if (i.user.resume) {
        i.workExperience = this.resumeService.calculateWorkExperience(
          i.user.resume.workExperience,
        );
      }
      i.isShortlisted = false;
      const check = i.job.shortlisted.find((j) => j.user.id === i.user.id);
      if (check) {
        i.isShortlisted = true;
      }
    });
    return result;
  }
  @Get('jobs/:id/bookmark')
  async findJobBookmarked(@Param('id') id: string) {
    const result: JobBookmarkedResponse[] =
      await this.hiringService.findJobBookmarked(+id);
    result.forEach((i) => {
      if (i.user.resume) {
        i.workExperience = this.resumeService.calculateWorkExperience(
          i.user.resume.workExperience,
        );
      }
      i.isShortlisted = false;
      const check = i.job.shortlisted.find((j) => j.user.id === i.user.id);
      if (check) {
        i.isShortlisted = true;
      }
    });
    return result;
  }

  @ApiResponse({ schema: { example: R_hiring_jobs_get_one } })
  @Get('jobs/:id')
  async findOneJob(@Request() request: AuthRequest, @Param('id') id: string) {
    const result: JobResponseType = await this.hiringService.findOneJobOrThrow(
      +id,
    );
    if (request.user.role.name === RoleTypes.EMPLOYEE) {
      result.isBookmarked = (await this.hiringService.findJobBookmarkedByUser(
        request.user.id,
        +id,
      ))
        ? true
        : false;
      result.isApplied = (await this.hiringService.findJobAppliedByUser(
        request.user.id,
        +id,
      ))
        ? true
        : false;
    }
    return result;
  }

  @ApiResponse({ schema: { example: R_hiring_jobs_patch } })
  @Patch('jobs/:id')
  async update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    try {
      const job = await this.hiringService.findOneJobOrThrow(+id);
      if (updateJobDto.experienceRequired) {
        await this.hiringService.deleteJobExperienceRequired(
          job.experienceRequired.map((i) => i.id),
        );
        job.experienceRequired =
          await this.hiringService.createJobExperienceRequired(
            updateJobDto.experienceRequired,
            job.id,
          );
      }
      if (updateJobDto.otherLanguages) {
        await this.hiringService.deleteJobOtherLanguages(
          job.otherLanguages.map((i) => i.id),
        );
        job.otherLanguages = await this.hiringService.createJobOtherLanguages(
          updateJobDto.otherLanguages,
          job.id,
        );
      }
      if (updateJobDto.requiredSkills) {
        await this.hiringService.deleteJobRequiredSkills(
          job.requiredSkills.map((i) => i.id),
        );
        job.requiredSkills = await this.hiringService.createJobRequiredSkills(
          updateJobDto.requiredSkills,
          job.id,
        );
      }

      const updateData: DeepPartial<Job> = {
        id: +id,
        ...updateJobDto,
      };
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
    } catch (error) {
      // experienceRequired.forEach((i)=> i.delete())
      // otherLanguages.forEach((i)=> i.delete())
      // requiredSkills.forEach((i)=> i.delete())
      throw error;
    }
  }

  @Delete('jobs/:id/shortlist/user/:userId')
  removeJobShortlisted(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    return this.hiringService.removeJobShortlisted(+id, +userId);
  }

  @Delete('jobs/:id/bookmark')
  removeJobBookmarked(
    @Request() request: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.hiringService.removeJobBookmarked(request.user.id, +id);
  }

  @ApiResponse({ schema: { example: R_hiring_jobs_delete } })
  @Delete('')
  removeAll() {
    return this.hiringService.removeAllJobs();
  }

  @ApiResponse({ schema: { example: R_hiring_jobs_delete } })
  @Delete('jobs/:id')
  remove(@Param('id') id: string) {
    return this.hiringService.removeJob(+id);
  }
}
