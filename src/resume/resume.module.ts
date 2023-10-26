import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { ResumeSkill } from './entities/resumeSkills.entity';
import { ResumeLanguage } from './entities/resumeLanguage.entity';
import { ResumeDocument } from './entities/resumeDocument.entity';
import ResumeWorkExperience from './entities/resumeWorkExperience';
import ResumeEducation from './entities/resumeEducation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Resume,
      ResumeSkill,
      ResumeLanguage,
      ResumeDocument,
      ResumeWorkExperience,
      ResumeEducation,
    ]),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [TypeOrmModule, ResumeService],
})
export class ResumeModule {}
