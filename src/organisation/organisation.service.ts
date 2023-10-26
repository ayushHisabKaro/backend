import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import {
  CreateOrganisationBranch,
  CreateOrganisationPartner,
  CreateOrganisationShift,
} from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import Organisation from './entities/organisation.entity';
import OrganisationBranch from './entities/organisationBranch.entity';
import OrganisationPartner from './entities/organisationPartner.entity';
import OrganisationShift from './entities/organisationShfit.entity';
import OrganisationJoinRequest from './entities/organisationJoinRequest.entity';
import { generateRandomCode } from '../common/utils';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectRepository(Organisation)
    private organisationRepository: Repository<Organisation>,
    @InjectRepository(OrganisationBranch)
    private organisationBranchRepository: Repository<OrganisationBranch>,
    @InjectRepository(OrganisationShift)
    private organisationShiftRepository: Repository<OrganisationShift>,
    @InjectRepository(OrganisationPartner)
    private organisationPartnerRepository: Repository<OrganisationPartner>,
    @InjectRepository(OrganisationJoinRequest)
    private organisationJoinRequestRepository: Repository<OrganisationJoinRequest>,
  ) {}
  create(data: DeepPartial<Organisation>) {
    const resume = this.organisationRepository.create(data);
    return resume;
  }
  async save(data: Organisation) {
    const resume = await this.organisationRepository.save(data);
    return resume;
  }

  async createOneOrganisationBranch(
    data: CreateOrganisationBranch,
    organisationId: number,
  ): Promise<OrganisationBranch> {
    const branchData = this.organisationBranchRepository.create({
      ...data,
      organisation: { id: organisationId },
    });

    const branch = await this.organisationBranchRepository.save(branchData);
    return branch;
  }
  async createOrganisationBranch(
    data: CreateOrganisationBranch[],
    organisationId?: number,
  ): Promise<OrganisationBranch[]> {
    const branchData = data.map((i) => {
      const insertData: DeepPartial<OrganisationBranch> = i;
      if (organisationId) insertData.organisation = { id: organisationId };
      return this.organisationBranchRepository.create({ ...insertData });
    });
    const branch = await this.organisationBranchRepository.save(branchData);
    return branch;
  }
  async createOrganisationShift(
    data: CreateOrganisationShift[],
    organisationId?: number,
  ): Promise<OrganisationShift[]> {
    const branchData = data.map((i) => {
      const insertData: DeepPartial<OrganisationShift> = i;
      if (organisationId) insertData.organisation = { id: organisationId };
      return this.organisationShiftRepository.create({ ...insertData });
    });
    const branch = await this.organisationShiftRepository.save(branchData);
    return branch;
  }

  async createOrganisationPartner(
    data: CreateOrganisationPartner[],
    organisationId?: number,
  ): Promise<OrganisationPartner[]> {
    const partnerData = data.map((i) => {
      const insertData: DeepPartial<OrganisationPartner> = i;
      if (organisationId) insertData.organisation = { id: organisationId };
      const data: DeepPartial<OrganisationPartner> = i;
      if (i.userId) {
        data.user = { id: i.userId };
      }
      return this.organisationPartnerRepository.create({ ...insertData });
    });
    const partner = await this.organisationPartnerRepository.save(partnerData);
    return partner;
  }

  async createOrganisationJoinRequest(
    data: DeepPartial<OrganisationJoinRequest>,
  ): Promise<OrganisationJoinRequest> {
    const result = await this.organisationJoinRequestRepository.save(data);
    return result;
  }

  updatJoinReqSeenMany(ids: number[]) {
    return this.organisationJoinRequestRepository.update(ids, { seen: true });
  }

  async deleteOrganisationBranch(id: number): Promise<DeleteResult> {
    const branch = await this.organisationBranchRepository.delete(id);
    return branch;
  }

  async deleteOrganisationShift(
    organisation: Organisation,
  ): Promise<DeleteResult> {
    const shift = await this.organisationShiftRepository
      .createQueryBuilder('organisationShift')
      .where('organisation = :id', { id: organisation.id })
      .delete()
      .execute();
    return shift;
  }

  async findAllByUser(userId: number) {
    const orgs = await this.organisationRepository
      .createQueryBuilder('organisation')
      .select('organisation.id')
      .leftJoinAndSelect('organisation.partners', 'partners')
      .where('partners.user = :userId', { userId })
      .getMany();
    const orgIds = orgs.map((o) => o.id);
    return await this.organisationRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.partners', 'partners')
      .leftJoinAndSelect('organisation.branch', 'branch')
      .leftJoinAndSelect('organisation.shifts', 'shifts')
      .where('organisation.id IN (:...userIds) ', { userIds: orgIds })
      .getMany();
  }

  async findAll() {
    return await this.organisationRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.partners', 'partners')
      .leftJoinAndSelect('organisation.branch', 'branch')
      .leftJoinAndSelect('organisation.shifts', 'shifts')
      .getMany();
  }

  async findAllOrganisationBranch() {
    return await this.organisationBranchRepository
      .createQueryBuilder('organisationBranch')
      .getMany();
  }

  async findOne(id: number) {
    const result = await this.organisationRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.partners', 'partners')
      .leftJoinAndSelect('organisation.branch', 'branch')
      .leftJoinAndSelect('organisation.shifts', 'shifts')
      .where('organisation.id = :id', { id })
      .getOne();
    return result;
  }

  async findPartnersByOrg(id: number) {
    const result = await this.organisationRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.partners', 'partners')
      .leftJoinAndSelect('partners.user', 'user')
      .where('organisation.id = :id', { id })
      .getOne();
    return result;
  }

  async findPartnersByPhoneNumber(phoneNumber: string) {
    const result = await this.organisationPartnerRepository
      .createQueryBuilder('organisationPartner')
      .leftJoinAndSelect('organisationPartner.organisation', 'organisation')
      .leftJoinAndSelect('organisationPartner.user', 'user')
      .where('organisationPartner.phoneNumber = :phoneNumber', { phoneNumber })
      .getMany();
    return result;
  }

  async checkOrgPartnerByUser(user: User) {
    const partners = await this.findPartnersByPhoneNumber(user.phoneNumber);
    for await (const partner of partners) {
      if (!partner.user) {
        const data: DeepPartial<OrganisationPartner> = {
          user: { id: user.id },
        };
        await this.updateOrgPartner(partner.id, data);
      }
    }
  }

  async findByStaff(staffId: number) {
    const result = await this.organisationRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.staff', 'staff')
      .where('staff.id = :staffId', { staffId })
      .getOne();
    return result;
  }

  async findOneOrThrow(id: number) {
    const result = await this.organisationRepository
      .createQueryBuilder('organisation')
      .leftJoinAndSelect('organisation.partners', 'partners')
      .leftJoinAndSelect('organisation.branch', 'branch')
      .leftJoinAndSelect('organisation.shifts', 'shifts')
      .where('organisation.id = :id', { id })
      .getOne();
    if (!result) throw new BadRequestException('Organisation not found!');
    return result;
  }

  async findOneOrgBranchByCode(code: string): Promise<OrganisationBranch> {
    const result = await this.organisationBranchRepository
      .createQueryBuilder('organisationBranch')
      .where('organisationBranch.code = :code', {
        code,
      })
      .getOne();

    return result;
  }

  async findOneOrgBranchByCodeOrThrow(code: string) {
    const result = await this.organisationBranchRepository
      .createQueryBuilder('organisationBranch')
      .where('organisationBranch.code = :code', { code })
      .getOne();
    if (!result)
      throw new BadRequestException('Organisation Branch not found!');
    return result;
  }
  async findOneBranch(id: number) {
    const result = await this.organisationBranchRepository
      .createQueryBuilder('branch')
      .where('branch.id = :id', { id })
      .getOne();
    return result;
  }

  async findOneOrganisationJoinRequest(
    organisationBranchId: number,
    userId: number,
  ): Promise<OrganisationJoinRequest> {
    const result = await this.organisationJoinRequestRepository
      .createQueryBuilder('organisationJoinRequest')
      .where(
        'organisationJoinRequest.organisationBranch = :organisationBranchId',
        {
          organisationBranchId,
        },
      )
      .andWhere('organisationJoinRequest.user = :userId', { userId })
      .getOne();

    return result;
  }

  async findManyOrganisationJoinRequest(
    organisationBrnachId: number,
  ): Promise<OrganisationJoinRequest[]> {
    const result = await this.organisationJoinRequestRepository
      .createQueryBuilder('organisationJoinRequest')
      .leftJoinAndSelect(
        'organisationJoinRequest.organisationBranch',
        'organisationBranch',
      )
      .leftJoinAndSelect('organisationJoinRequest.user', 'user')
      .where('organisationBranch.id = :organisationBrnachId', {
        organisationBrnachId,
      })
      .andWhere('organisationJoinRequest.seen = false')
      .getMany();

    return result;
  }

  async findOneBranchOrThrow(id: number) {
    const result = await this.organisationBranchRepository
      .createQueryBuilder('branch')
      .where('branch.id = :id', { id })
      .getOne();
    if (!result) throw new BadRequestException('Branch not found!');
    return result;
  }

  async update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    if (!Object.keys(updateOrganisationDto).length) {
      return;
    }
    return await this.organisationRepository.update(id, updateOrganisationDto);
  }

  async updateOrgPartner(id: number, data: DeepPartial<OrganisationPartner>) {
    return await this.organisationPartnerRepository.update(id, data);
  }

  async updateOrgBranch(id: number, data: DeepPartial<OrganisationBranch>) {
    return await this.organisationBranchRepository.update(id, data);
  }

  async deleteOneOrganisationJoinRequest(
    organisationBranchId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const result = await this.organisationJoinRequestRepository
      .createQueryBuilder('organisationJoinRequest')
      .where('organisationBranch = :organisationBranchId', {
        organisationBranchId,
      })
      .andWhere('user = :userId', { userId })
      .delete()
      .execute();

    return result;
  }

  async deleteOrgJoinReq(id: number) {
    return await this.organisationJoinRequestRepository.delete(id);
  }

  remove(id: number) {
    return this.organisationRepository.delete(id);
  }

  removeAll() {
    return this.organisationRepository.delete({});
  }

  async generateUniqueCodeByOrganisationBranch() {
    let pin = generateRandomCode();
    const org = await this.findOneOrgBranchByCode(pin);
    if (org) {
      pin = await this.generateUniqueCodeByOrganisationBranch();
    }
    return pin;
  }
}
