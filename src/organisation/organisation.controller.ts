import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import {
  CreateOrganisationBranch,
  CreateOrganisationDto,
  CreateOrganisationJoinRequest,
} from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { UserService } from '../user/user.service';
import { Roles } from '../auth/roles.decorator';
import { AuthRequest } from '../types/AuthRequest';
import OrganisationPartner from './entities/organisationPartner.entity';
import { DeepPartial } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Organisation')
@Controller('organisation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrganisationController {
  constructor(
    private readonly organisationService: OrganisationService,
    private readonly userService: UserService,
  ) {}

  async setOrgDefaultBranchAndCode(
    createOrganisationDto: CreateOrganisationDto,
  ) {
    if (!createOrganisationDto.branch.length) {
      createOrganisationDto.branch = [
        {
          name: createOrganisationDto.city,
          address: createOrganisationDto.address,
          state: createOrganisationDto.state,
          city: createOrganisationDto.city,
          landmark: createOrganisationDto.landmark,
          pinCode: createOrganisationDto.pinCode,
        },
      ];
    }
    for await (const orgBranch of createOrganisationDto.branch) {
      const code =
        await this.organisationService.generateUniqueCodeByOrganisationBranch();
      orgBranch.code = code;
    }
    return createOrganisationDto.branch;
  }

  @Roles('BUSINESS')
  @Post()
  async create(
    @Request() req: AuthRequest,
    @Body() createOrganisationDto: CreateOrganisationDto,
  ) {
    const isOwnNumberExists = createOrganisationDto.partners.find(
      (i) =>
        i.phoneNumber === req.user.phoneNumber ||
        i.phoneNumber === req.user.alternatePhoneNumber,
    );
    if (!isOwnNumberExists) {
      createOrganisationDto.partners.push({
        name: req.user.name,
        phoneNumber: req.user.phoneNumber,
      });
    }
    for await (const partner of createOrganisationDto.partners) {
      const user = await this.userService.findOneByPhoneNumber(
        partner.phoneNumber,
      );
      if (user) partner.userId = user.id;
    }

    createOrganisationDto.branch = await this.setOrgDefaultBranchAndCode(
      createOrganisationDto,
    );
    const branch = await this.organisationService.createOrganisationBranch(
      createOrganisationDto.branch,
    );
    const shifts = await this.organisationService.createOrganisationShift(
      createOrganisationDto.shifts,
    );
    const partners = await this.organisationService.createOrganisationPartner(
      createOrganisationDto.partners,
    );

    const createData = this.organisationService.create({
      ...createOrganisationDto,
      createdBy: { id: req.user.id },
      branch,
      shifts,
      partners,
    });
    return this.organisationService.save(createData);
  }

  // @Roles('BUSINESS')
  // @Post('branch')
  // async addBranch(
  //   @Param('id') id: string,
  //   @Body() createOrganisationDto: CreateOrganisationBranch,
  // ) {
  //   return await this.organisationService.createOneOrganisationBranch(
  //     createOrganisationDto,
  //     +id,
  //   );
  // }

  @Roles('BUSINESS')
  @Post('internal/addCode')
  async addCodeInAllOrganosation() {
    const organisationBranches =
      await this.organisationService.findAllOrganisationBranch();
    for await (const orgBranch of organisationBranches) {
      if (!orgBranch.code) {
        const code =
          await this.organisationService.generateUniqueCodeByOrganisationBranch();
        await this.organisationService.updateOrgBranch(orgBranch.id, { code });
      }
    }
  }
  // @Roles('EMPLOYEE')
  @Post('branch/join')
  async createOrganisationJoinRequest(
    @Body() createOrganisationJoinReqDto: CreateOrganisationJoinRequest,
  ) {
    const organisationBranch =
      await this.organisationService.findOneOrgBranchByCodeOrThrow(
        createOrganisationJoinReqDto.organisationBranchCode,
      );
    const check = await this.organisationService.findOneOrganisationJoinRequest(
      organisationBranch.id,
      createOrganisationJoinReqDto.userId,
    );
    if (check) {
      throw new BadRequestException('Already requested!');
    }

    if (
      createOrganisationJoinReqDto.organisationBranchCode === '' ||
      organisationBranch.code !==
        createOrganisationJoinReqDto.organisationBranchCode
    ) {
      throw new BadRequestException('Invalid organisation code!');
    }
    return await this.organisationService.createOrganisationJoinRequest({
      organisationBranch,
      user: { id: createOrganisationJoinReqDto.userId },
    });
  }

  @Roles('BUSINESS')
  @Post(':id/branch')
  async addBranchV2(
    @Param('id') id: string,
    @Body() createOrganisationDto: CreateOrganisationBranch,
  ) {
    const code =
      await this.organisationService.generateUniqueCodeByOrganisationBranch();
    createOrganisationDto.code = code;
    return await this.organisationService.createOneOrganisationBranch(
      createOrganisationDto,
      +id,
    );
  }

  @Get('/all')
  findAll(@Request() req: AuthRequest) {
    return this.organisationService.findAll();
  }

  @Get()
  findAllByUser(@Request() req: AuthRequest) {
    return this.organisationService.findAllByUser(req.user.id);
  }
  // @Roles('EMPLOYEE')
  @Get('branch/:id/join')
  async getOrganisationJoinRequest(@Param('id') id: string) {
    const requests =
      await this.organisationService.findManyOrganisationJoinRequest(+id);
    return requests;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organisationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganisationDto: UpdateOrganisationDto,
  ) {
    const organisation = await this.organisationService.findOneOrThrow(+id);

    if (updateOrganisationDto.branch) {
      // await this.organisationService.deleteOrganisationBranch(
      //   organisation.branch.map((i) => i.id),
      // );
      await this.organisationService.createOrganisationBranch(
        updateOrganisationDto.branch,
        organisation.id,
      );
    }
    if (updateOrganisationDto.shifts) {
      await this.organisationService.deleteOrganisationShift(organisation);
      await this.organisationService.createOrganisationShift(
        updateOrganisationDto.shifts,
        organisation.id,
      );
    }
    if (updateOrganisationDto.partners) {
      const org = await this.organisationService.findPartnersByOrg(+id);
      for await (const partner of updateOrganisationDto.partners) {
        if (!org.partners.find((p) => p.phoneNumber === partner.phoneNumber)) {
          await this.organisationService.createOrganisationPartner(
            [partner],
            +id,
          );
          this.userService
            .findOneByPhoneNumber(partner.phoneNumber)
            .then((user: User) => {
              this.organisationService.checkOrgPartnerByUser(user);
            });
        }
      }
    }
    const organisationData = this.organisationService.create(
      updateOrganisationDto,
    );
    delete organisationData.branch;
    delete organisationData.shifts;
    delete organisationData.partners;

    return this.organisationService.update(+id, organisationData);
  }

  @Delete('branch/:id')
  async removeBranch(@Param('id') id: string) {
    return await this.organisationService.deleteOrganisationBranch(+id);
  }

  // @Roles('EMPLOYEE')
  @Delete('branch/join/:id')
  async deleteOrganisationJoinRequest(@Param('id') id: string) {
    return await this.organisationService.deleteOrgJoinReq(+id);
  }

  @Delete('')
  removeAll() {
    return this.organisationService.removeAll();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisationService.remove(+id);
  }
}
