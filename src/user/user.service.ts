import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { Brackets, DeepPartial, Not, Raw, Repository } from 'typeorm';
import { CreateRoleDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Roles as _Roles } from 'src/types/entity.attribute.types';
import Role from './entities/role.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import UserLanguage from './entities/UserLanguage';

@UseGuards(JwtAuthGuard, RolesGuard)
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserLanguage)
    private userLanguageRepository: Repository<UserLanguage>,
  ) {}

  create(data: DeepPartial<User>) {
    const user = this.userRepository.create(data);
    return user;
  }
  async save(data: User) {
    return await this.userRepository.save(data);
  }

  async createLanguage(data: DeepPartial<UserLanguage>) {
    return await this.userLanguageRepository.save(data);
  }

  async findAll() {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .getMany();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findOneByEmailExceptAndThrow(email: string, userId: number) {
    const result = await this.userRepository.findOne({
      where: { email: email, id: Not(userId) },
      select: ['email'],
    });
    if (result) {
      throw new BadRequestException('Email already exists');
    }
    return result;
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.phoneNumber = :phoneNumber', { phoneNumber })
      .getOne();
    return user;
  }
  async findOneByBothPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.phoneNumber = :phoneNumber', { phoneNumber })
      .orWhere('user.alternatePhoneNumber = :alternatePhoneNumber', {
        alternatePhoneNumber: phoneNumber,
      })
      .getOne();
    return user;
  }

  async findOneByBothPhoneNumbersExceptAndThrow(
    phoneNumber: string,
    userId: number,
  ): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.phoneNumber', 'user.alternatePhoneNumber'])
      .where('user.id != :userId', { userId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('user.phoneNumber = :phoneNumber', { phoneNumber }).orWhere(
            'user.alternatePhoneNumber = :alternatePhoneNumber',
            {
              alternatePhoneNumber: phoneNumber,
            },
          );
        }),
      )

      .getOne();
    if (user) {
      throw new BadRequestException('Phone Number already exists');
    }
    return user;
  }
  async findManyByBothPhoneNumbers(phoneNumbers: string[]): Promise<User[]> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.phoneNumber', 'user.alternatePhoneNumber'])
      .where('user.phoneNumber IN (:...phoneNumbers) = :', { phoneNumbers })
      .orWhere('user.alternatePhoneNumber IN (:...alternatePhoneNumbers) = :', {
        alternatePhoneNumbers: phoneNumbers,
      })
      .getMany();
    return user;
  }

  async findByPhoneNumberWithRelations(
    phoneNumber: string,
  ): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.language', 'language')
      .where('user.phoneNumber = :phoneNumber', { phoneNumber })
      .getOne();
    if (user) return user;
    return null;
  }
  async findByBothPhoneNumberWithRelations(
    phoneNumber: string,
  ): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.language', 'language')
      .where('user.phoneNumber = :phoneNumber', { phoneNumber })
      .orWhere('user.alternatePhoneNumber = :alternatePhoneNumber', {
        alternatePhoneNumber: phoneNumber,
      })
      .getOne();
    if (user) return user;
    return null;
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.save({ name: createRoleDto.name });
    return role;
  }

  async findAllRoles(): Promise<Role[]> {
    const role = await this.roleRepository.find();
    return role;
  }
  async findRoleByName(name: string): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      where: { name: Raw((n) => `LOWER(${n}) = LOWER(:name)`, { name: name }) },
    });
    if (role) return role;
    return null;
  }

  async findEmailExceptUser(
    email: string,
    userId: number,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: Not(userId), email },
    });
    return user;
  }

  async findLanguageByCode(code: string): Promise<UserLanguage | null> {
    const language = await this.userLanguageRepository.findOne({
      where: { code: Raw((n) => `LOWER(${n}) = LOWER(:code)`, { code }) },
    });
    return language;
  }

  async findLanguageByCodeOrThrow(code: string): Promise<UserLanguage | null> {
    const language = await this.userLanguageRepository.findOne({
      where: { code: Raw((n) => `LOWER(${n}) = LOWER(:code)`, { code }) },
    });
    if (!language) throw new BadRequestException('Language Doesnt exists.');
    return language;
  }

  // async findOnewithEmailWithPassword(email: string) {
  //   return await this.userRepository.findOne({
  //     where: { email: email },
  //     select: ['id', 'email', 'password', 'name'],
  //     relations: ['role'],
  //   });
  // }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneWithRelations(id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.language', 'language')
      .leftJoinAndSelect('user.staff', 'staff')
      .leftJoinAndSelect('staff.organisation', 'organisation')
      .leftJoinAndSelect('staff.organisationBranch', 'organisationBranch')
      .where('user.id = :id', { id })
      .getOne();
  }

  async findOneOrThrow(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async findRoleOrFail(name: string) {
    const role = await this.roleRepository.findOne({ where: { name } });
    if (!role) {
      throw new BadRequestException('Role not found');
    }
    return role;
  }

  async findOneWithRole(id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', { id })
      .getOne();
  }

  async update(id: number, data: DeepPartial<User>) {
    return await this.userRepository.update(id, data);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
