import { Module } from '@nestjs/common';
import { HiringService } from './hiring.service';
import { HiringController } from './hiring.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOtherLanguage } from './entities/jobOtherLanguage.entity';
import { JobExperienceRequired } from './entities/jobExperienceRequired.entity';
import { JobRequiredSkill } from './entities/jobRequiredSkills.entity';
import Job from './entities/job.entity';
import { OrganisationModule } from '../organisation/organisation.module';
import JobApplied from './entities/jobApplied.entity';
import JobBookmarked from './entities/jobBookmark.entity';
import JobShortlisted from './entities/jobShortlisted.entity';
import { ResumeModule } from '../resume/resume.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Job,
      JobOtherLanguage,
      JobExperienceRequired,
      JobRequiredSkill,
      JobApplied,
      JobBookmarked,
      JobShortlisted,
    ]),
    ResumeModule,
    OrganisationModule,
    NotificationModule,
  ],
  controllers: [HiringController],
  providers: [HiringService],
})
export class HiringModule {}
