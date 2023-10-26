import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { AuthRequest } from '../types/AuthRequest';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';

@ApiTags('resume')
@Controller('resume')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @Roles('EMPLOYEE')
  async create(
    @Body() createResumeDto: CreateResumeDto,
    @Request() req: AuthRequest,
  ) {
    if (await this.resumeService.findByUser(req.user.id)) {
      throw new BadRequestException('Resume already exists');
    }
    const otherLanguages = await this.resumeService.createOtherLanguages(
      createResumeDto.otherLanguages,
    );
    const skills = await this.resumeService.createSkills(
      createResumeDto.skills,
    );
    const documents = await this.resumeService.createDocuments(
      createResumeDto.documents,
    );
    const workExperience = await this.resumeService.createWorkExperience(
      createResumeDto.workExperience,
    );

    const education = await this.resumeService.saveResumeEducation(
      createResumeDto.education,
    );

    const createData = this.resumeService.create({
      ...createResumeDto,
      user: req.user,
      otherLanguages,
      skills,
      documents,
      workExperience,
      education,
    });
    return this.resumeService.save(createData);
  }

  @Get('my')
  async findMyResume(@Request() req: AuthRequest) {
    return await this.resumeService.findByUser(req.user.id);
  }

  @Get()
  findAll() {
    return this.resumeService.findAll();
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.resumeService.findByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Patch('')
  async updateByAuthUser(
    @Request() req: AuthRequest,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    const resume = await this.resumeService.findByUser(req.user.id);
    if (!resume) {
      throw new BadRequestException('Resume not found!');
    }
    if (updateResumeDto.otherLanguages) {
      this.resumeService.deleteAndInsertOtherLanguages(
        updateResumeDto.otherLanguages,
        resume,
      );
    }
    if (updateResumeDto.skills) {
      this.resumeService.deleteAndInsertSkills(updateResumeDto.skills, resume);
    }
    if (updateResumeDto.documents) {
      this.resumeService.deleteAndInsertDocuments(
        updateResumeDto.documents,
        resume,
      );
    }
    if (updateResumeDto.workExperience) {
      this.resumeService.deleteAndInsertWorkExperience(
        updateResumeDto.workExperience,
        resume,
      );
    }
    if (updateResumeDto.education) {
      await this.resumeService.deleteAndInsertResumeEducation(
        updateResumeDto.education,
        resume.id,
      );
    }
    delete updateResumeDto.education;
    delete updateResumeDto.otherLanguages;
    delete updateResumeDto.workExperience;
    delete updateResumeDto.skills;
    delete updateResumeDto.documents;
    return this.resumeService.update(resume.id, updateResumeDto);
  }

  // @Patch(':id')
  // async updateById(
  //   @Param('id') id: string,
  //   @Body() updateResumeDto: UpdateResumeDto,
  // ) {
  //   if (updateResumeDto.otherLanguages)
  //     await this.resumeService.createOtherLanguages(
  //       updateResumeDto.otherLanguages.map((i) => {
  //         return { ...i, resume: { id } };
  //       }),
  //     );
  //   if (updateResumeDto.skills)
  //     await this.resumeService.createSkills(
  //       updateResumeDto.skills.map((i) => {
  //         return { ...i, resume: { id } };
  //       }),
  //     );
  //   if (updateResumeDto.documents)
  //     await this.resumeService.createDocuments(
  //       updateResumeDto.documents.map((i) => {
  //         return { ...i, resume: { id } };
  //       }),
  //     );
  //   if (updateResumeDto.workExperience)
  //     await this.resumeService.createWorkExperience(
  //       updateResumeDto.workExperience.map((i) => {
  //         return { ...i, resume: { id } };
  //       }),
  //     );
  //   delete updateResumeDto.otherLanguages;
  //   delete updateResumeDto.workExperience;
  //   delete updateResumeDto.skills;
  //   delete updateResumeDto.documents;
  //   return this.resumeService.update(+id, updateResumeDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }
}
