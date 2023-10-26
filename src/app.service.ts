import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import AttendanceType from './staff/entities/attendanceType.entity';
import { attendanceTypes, Roles } from './types/entity.attribute.types';
import Role from './user/entities/role.entity';
import UserLanguage from './user/entities/UserLanguage';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AppService {
  private db = process.env.ENV === 'PROD' ? 'hk_prod' : 'hzk';
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserLanguage)
    private userLanguageRepository: Repository<UserLanguage>,
    @InjectRepository(AttendanceType)
    private attendanceTypeRepository: Repository<AttendanceType>,
    private dataSource: DataSource,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
  async addDefaultData() {
    // await this.roleRepository.delete({});

    const roles = Object.values(Roles).map((i) =>
      this.roleRepository.create({ id: null, name: i }),
    );
    await this.roleRepository
      .createQueryBuilder('roles')
      .insert()
      .values(roles)
      .orIgnore()
      .execute();
    const UserLanguages = {
      en: {
        name: 'ENGLISH',
        code: 'en',
      },
      hi: {
        name: 'HINDI',
        code: 'hi',
      },
    };
    const language = Object.values(UserLanguages).map((i) =>
      this.userLanguageRepository.create({ id: null, ...i }),
    );
    await this.userLanguageRepository
      .createQueryBuilder('language')
      .insert()
      .values(language)
      .orIgnore()
      .execute();

    let attendanceTypesData = Object.values(attendanceTypes).map((type) =>
      this.attendanceTypeRepository.create({ name: type }),
    );
    await this.attendanceTypeRepository.save(attendanceTypesData);
  }

  async getUserReport() {
    const res = await this.dataSource.query(
      // 'SELECT * FROM hzk.user',
      `SELECT 
      user.phoneNumber, user.email, user.created_at,
        CASE WHEN user.roleId = 1 THEN 'Employee' ELSE 'Business' END as Role, 
        resume.id as resume -- CASE WHEN resume.id = null THEN 'N/A' ELSE 'Created' END as Resume  
        FROM ${this.db}.user 
      LEFT JOIN ${this.db}.resume ON user.id = resume.userId 
      where user.created_at > "2023-03-12";`,
    );
    return res;
  }
  async getOrgReport() {
    const res = await this.dataSource.query(
      // 'SELECT * FROM hzk.user',
      `SELECT
      organisation.name as organisationName,
        user.phoneNumber as OwnerPhoneNumber,
        count(staff.id) as staffCount,
        count(job.id) as jobCount,
        organisation.created_at created_at
        FROM ${this.db}.organisation
        LEFT JOIN ${this.db}.staff on staff.organisationId = organisation.id
        LEFT JOIN ${this.db}.user on user.id = organisation.createdById
        LEFT OUTER JOIN ${this.db}.job on job.organisationId = organisation.id
        where organisation.created_at > "2023-03-12"
        GROUP BY organisation.id;`,
    );
    return res;
  }
}
