import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { attendanceType } from '../types/entity.attribute.types';
import * as moment from 'moment';
import {
  DeepPartial,
  InsertResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import AttendanceType from './entities/attendanceType.entity';
import PayrollApplied from './entities/payrollApplied.entity';
import Staff from './entities/staff.entity';
import StaffAdvance from './entities/staffAdvance.entity';
import StaffAttendance from './entities/staffAttendance.entity';
import StaffMonthlyAdvance from './entities/staffMonthlyAdvance';
import PayrollDefault from './entities/payrollDefault.entity';
import StaffMonthlyAdvancePayment from './entities/staffMonthlyAdvancePayment';
import { staffShortByTypes } from '../types/requestData.types';
import StaffWeeklyOff from './entities/staffWeeklyOff.entity';
import { MonthDetails } from '../types/responseData.types';
import { generateRandomCode } from '../common/utils';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    @InjectRepository(StaffAdvance)
    private staffAdvanceRepository: Repository<StaffAdvance>,
    @InjectRepository(StaffMonthlyAdvance)
    private staffMonthlyAdvanceRepository: Repository<StaffMonthlyAdvance>,
    @InjectRepository(StaffMonthlyAdvancePayment)
    private staffMonthlyAdvancePaymentRepository: Repository<StaffMonthlyAdvancePayment>,
    @InjectRepository(StaffAttendance)
    private staffAttendanceRepository: Repository<StaffAttendance>,
    @InjectRepository(AttendanceType)
    private attendanceTypeRepository: Repository<AttendanceType>,
    @InjectRepository(PayrollApplied)
    private payrollAppliedRepository: Repository<PayrollApplied>,
    @InjectRepository(PayrollDefault)
    private payrollDefaultRepository: Repository<PayrollDefault>,
    @InjectRepository(StaffWeeklyOff)
    private staffWeeklyOffRepository: Repository<StaffWeeklyOff>,
  ) {}
  create(data: DeepPartial<Staff>) {
    return this.staffRepository.save(data);
  }
  save(data: DeepPartial<Staff>) {
    return this.staffRepository.save(data);
  }
  insert(data: DeepPartial<Staff>) {
    return this.staffRepository.insert(data);
  }

  async createAdvance(data: DeepPartial<StaffAdvance[]>) {
    return await this.staffAdvanceRepository.save(data);
  }
  async createMonthlyAdvance(data: DeepPartial<StaffMonthlyAdvance>[]) {
    return await this.staffMonthlyAdvanceRepository.save(data);
  }
  async createMonthlyAdvancePayment(
    data: DeepPartial<StaffMonthlyAdvancePayment>,
  ) {
    return await this.staffMonthlyAdvancePaymentRepository.save(data);
  }
  async findAdvanceWithPayment(
    staffId: number,
    month?: string,
  ): Promise<StaffAdvance[]> {
    let advance = this.staffAdvanceRepository
      .createQueryBuilder('staffAdvance')
      .leftJoinAndSelect('staffAdvance.monthlyAdvance', 'monthlyAdvance')
      .leftJoinAndSelect(
        'monthlyAdvance.monthlyAdvancePayment',
        'monthlyAdvancePayment',
      )
      .where('staffAdvance.staff = :staffId', {
        staffId,
      });
    if (month) {
      advance.andWhere('monthlyAdvance.month = :month', {
        month,
      });
    }
    return advance.getMany();
  }
  async findMonthlyAdvanceWithPayment(
    staffId: number,
    month: string,
  ): Promise<StaffMonthlyAdvance[]> {
    return await this.staffMonthlyAdvanceRepository
      .createQueryBuilder('monthlyAdvance')
      .leftJoinAndSelect('monthlyAdvance.staffAdvance', 'staffAdvance')
      .leftJoinAndSelect(
        'monthlyAdvance.monthlyAdvancePayment',
        'monthlyAdvancePayment',
      )
      .where('staffAdvance.staff = :staffId', {
        staffId,
      })
      .andWhere('monthlyAdvance.month = :month', {
        month,
      })
      .getMany();
  }
  async findOneMonthlyAdvanceWithPayment(
    staffMonthlyAdvanceId: number,
  ): Promise<StaffMonthlyAdvance> {
    return await this.staffMonthlyAdvanceRepository
      .createQueryBuilder('staffMonthlyAdvance')
      .leftJoinAndSelect(
        'staffMonthlyAdvance.monthlyAdvancePayment',
        'monthlyAdvancePayment',
      )
      .where('staffMonthlyAdvance.id = :staffMonthlyAdvanceId', {
        staffMonthlyAdvanceId,
      })
      .getOne();
  }

  async findOneMonthlyAdvanceWithPaymentWithUser(
    staffMonthlyAdvanceId: number,
  ): Promise<StaffMonthlyAdvance> {
    return await this.staffMonthlyAdvanceRepository
      .createQueryBuilder('staffMonthlyAdvance')
      .leftJoinAndSelect(
        'staffMonthlyAdvance.monthlyAdvancePayment',
        'monthlyAdvancePayment',
      )
      .leftJoinAndSelect('staffMonthlyAdvance.staffAdvance', 'staffAdvance')
      .leftJoinAndSelect('staffAdvance.staff', 'staff')
      .leftJoinAndSelect('staff.user', 'user')
      .where('staffMonthlyAdvance.id = :staffMonthlyAdvanceId', {
        staffMonthlyAdvanceId,
      })
      .getOne();
  }

  createInstance(data: DeepPartial<Staff>) {
    const staff = this.staffRepository.create(data);
    return staff;
  }

  createAttendanceInstance(data: DeepPartial<StaffAttendance>) {
    const attendance = this.staffAttendanceRepository.create(data);
    return attendance;
  }

  async createAttendance(data: DeepPartial<StaffAttendance>) {
    const attendance = await this.staffAttendanceRepository.insert(data);
    return attendance;
  }
  async createManyAttendance(data: DeepPartial<StaffAttendance[]>) {
    const attendance = await this.staffAttendanceRepository.insert(data);
    return attendance;
  }
  async updateAttendance(id: number, data: DeepPartial<StaffAttendance>) {
    data.updatedAt = new Date();
    const attendance = await this.staffAttendanceRepository.update(id, data);
    return attendance;
  }

  async updateAdvance(id: number, data: DeepPartial<StaffAdvance>) {
    return await this.staffAdvanceRepository.update(id, data);
  }

  async createAttendanceType(types: attendanceType[]) {
    const attendanceTypes = types.map((type) =>
      this.attendanceTypeRepository.create({ name: type }),
    );
    return await this.attendanceTypeRepository.save(attendanceTypes);
  }

  async findWeeklyOff(staffId: number, month: string) {
    return await this.staffWeeklyOffRepository
      .createQueryBuilder('weeklyOdd')
      .where('weeklyOdd.staff = :staffId', { staffId })
      .andWhere('weeklyOdd.month = :month', { month })
      .getOne();
  }
  async saveWeeklyOff(data: DeepPartial<StaffWeeklyOff>) {
    return await this.staffWeeklyOffRepository.save(data);
  }

  async createPayrollDefault(data: DeepPartial<PayrollDefault>) {
    return await this.payrollDefaultRepository.save(data);
  }

  async createPayrollApplied(data: DeepPartial<PayrollApplied>) {
    return await this.payrollAppliedRepository.save(data);
  }

  async findPayrollApplied(staffId: number, month: string) {
    return await this.payrollAppliedRepository
      .createQueryBuilder('payrollApplied')
      .where('payrollApplied.staff = :staffId', { staffId })
      .andWhere('payrollApplied.month = :month', { month })
      .getOne();
  }

  async findPayrollDefault(staffId: number, month: string) {
    return await this.payrollDefaultRepository
      .createQueryBuilder('payrollDefault')
      .where('payrollDefault.staff = :staffId', { staffId })
      .andWhere('payrollDefault.month = :month', { month })
      .getOne();
  }

  async findAllPayrollDefault(staffId: number) {
    return await this.payrollDefaultRepository
      .createQueryBuilder('payrollDefault')
      .where('payrollDefault.staff = :staffId', { staffId })
      .getMany();
  }

  async savePayrollDefault(data: DeepPartial<PayrollDefault>) {
    const result = await this.payrollDefaultRepository.save(data);
    return result;
  }
  async savePayrollApplied(data: DeepPartial<PayrollApplied>) {
    const result = await this.payrollAppliedRepository.save(data);
    return result;
  }

  async createOrUpdatePayrollApplied(
    staffId: number,
    month: string,
    data: DeepPartial<PayrollApplied>,
  ) {
    let payroll: PayrollApplied;
    const checkPayroll = await this.findPayrollApplied(staffId, month);
    if (checkPayroll) {
      delete data.month;
      payroll = await this.payrollAppliedRepository.save({
        ...checkPayroll,
        ...data,
      });
    } else {
      payroll = await this.payrollAppliedRepository.save({
        ...data,
        staff: { id: staffId },
      });
    }
    return payroll;
  }

  async createOrUpdatePayrollDefault(
    staffId: number,
    month: string,
    data: DeepPartial<PayrollDefault>,
  ) {
    let payroll: PayrollDefault;
    const checkPayroll = await this.findPayrollDefault(staffId, month);
    if (checkPayroll) {
      payroll = await this.payrollDefaultRepository.save({
        ...checkPayroll,
        ...data,
      });
    } else {
      payroll = await this.payrollAppliedRepository.save({
        ...data,
        staff: { id: staffId },
      });
    }
    return payroll;
  }

  async findByUser(userId: number) {
    return await this.staffRepository
      .createQueryBuilder('staff')
      .where('staff.user = :userId', { userId })
      .leftJoinAndSelect('staff.organisation', 'organisation')
      .leftJoinAndSelect('staff.advance', 'advance')
      .getMany();
  }

  async findAll() {
    return await this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('staff.weeklyOff', 'weeklyOff')
      .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
      .leftJoinAndSelect('staff.payrollApplied', 'payrollApplied')
      .getMany();
  }

  async findAllWithAttendenceBetween(start: Date, end: Date) {
    return await this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('staff.weeklyOff', 'weeklyOff')
      .leftJoinAndSelect(
        'staff.attendance',
        'attendance',
        'attendance.createdAt BETWEEN :start AND :end',
        {
          start,
          end,
        },
      )
      .getMany();
  }

  async findAttendanceType(type: string) {
    return await this.attendanceTypeRepository
      .createQueryBuilder('attendanceType')
      .where('attendanceType.name = :type', { type })
      .getOne();
  }
  async findAllAttendanceTypes() {
    const result = await this.attendanceTypeRepository
      .createQueryBuilder('attendanceType')
      .getMany();
    if (!result) {
      throw new BadRequestException('Invalid attendance type');
    }
    return result;
  }
  async findAttendanceTypeOrThrow(type: string) {
    const result = await this.attendanceTypeRepository
      .createQueryBuilder('attendanceType')
      .where('attendanceType.name = :type', { type })
      .getOne();
    if (!result) {
      throw new BadRequestException('Invalid attendance type');
    }
    return result;
  }

  async findManyAttendance(staffId: number) {
    return await this.staffAttendanceRepository
      .createQueryBuilder('staffAttendance')
      .where('staffAttendance.staff = :staffId', { staffId })
      .getMany();
  }

  async findManyAttendanceByType(
    name: attendanceType,
    options?: {
      staffId?: number;
      branchId?: number;
      end?: Date;
    },
  ) {
    const attendance = this.staffAttendanceRepository
      .createQueryBuilder('staffAttendance')
      .leftJoinAndSelect('staffAttendance.attendanceType', 'attendanceType');
    if (options.branchId)
      attendance.leftJoinAndSelect('staffAttendance.staff', 'staff');
    attendance.where('attendanceType.name = :name', { name });
    if (options.branchId)
      attendance.andWhere('staff.organisationBranch = :branchId', {
        branchId: options.branchId,
      });
    if (options.staffId)
      attendance.andWhere('staffAttendance.staff = :staffId', {
        staffId: options.staffId,
      });
    if (options.end)
      attendance.andWhere('staffAttendance.createdAt <= :end', {
        end: options.end,
      });
    const result = await attendance.getMany();
    return result;
  }

  async findManyAttendanceBetweenByOrganisation(
    organisationId: number,
    branchId: number,
    start: Date,
    end: Date,
  ) {
    return await this.staffAttendanceRepository
      .createQueryBuilder('staffAttendance')
      .leftJoinAndSelect('staffAttendance.attendanceType', 'attendanceType')
      .leftJoinAndSelect('staffAttendance.staff', 'staff')
      .where('staff.organisation = :organisationId', { organisationId })
      .where('staff.organisationBranch = :branchId', { branchId })
      .andWhere('staffAttendance.createdAt BETWEEN :start AND :end', {
        start,
        end,
      })
      .getMany();
  }
  async findManyAttendanceBetween(staffId: number, start: Date, end: Date) {
    return await this.staffAttendanceRepository
      .createQueryBuilder('staffAttendance')
      .leftJoinAndSelect('staffAttendance.markedBy', 'markedBy')
      .leftJoinAndSelect('staffAttendance.attendanceType', 'attendanceType')
      .where('staffAttendance.staff = :staffId', { staffId })
      .andWhere('staffAttendance.createdAt BETWEEN :start AND :end', {
        start,
        end,
      })
      .getMany();
  }
  async findOneAttendanceBetween(staffId: number, start: Date, end: Date) {
    return await this.staffAttendanceRepository
      .createQueryBuilder('staffAttendance')
      .where('staffAttendance.staff = :staffId', { staffId })
      .andWhere('staffAttendance.createdAt BETWEEN :start AND :end', {
        start,
        end,
      })
      .getOne();
  }

  async findByOrganisationBranch(
    organisationBranch: number,
    filter?: { month?: string; sort: staffShortByTypes },
  ) {
    return await this.staffRepository
      .createQueryBuilder('staff')
      .where('staff.organisationBranch = :organisationBranch', {
        organisationBranch,
      })
      .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
      // .leftJoinAndSelect(
      //   'staff.payrollApplied',
      //   'payrollApplied',
      //   'payrollApplied.month = :month',
      //   { month: filter.month },
      // )
      .leftJoinAndSelect('staff.user', 'user')
      .getMany();
  }

  async findByOrganisationBranchWithAttendance(
    organisationId: number,
    branchId: number,
    start: Date,
    end: Date,
    // staffBeforeStart: boolean = true,
  ) {
    const staff = this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('staff.weeklyOff', 'weeklyOff')
      .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
      .leftJoinAndSelect('staff.payrollApplied', 'payrollApplied')
      .leftJoinAndSelect(
        'staff.attendance',
        'attendance',
        'attendance.createdAt BETWEEN :start AND :end',
        {
          start,
          end,
        },
      )
      .leftJoinAndSelect('attendance.attendanceType', 'attendanceType')
      .leftJoinAndSelect('attendance.markedBy', 'markedBy')
      .where('staff.organisation = :organisationId', { organisationId })
      .andWhere('staff.organisationBranch = :branchId', { branchId });
    // if (!staffBeforeStart)
    //   staff.andWhere('staff.createdAt >= :start', { start });
    const result = await staff.getMany();

    return result;
  }

  async findByOrganisationBranchWithAttendanceReport(
    organisationId: number,
    branchId: number,
    start: Date,
    end: Date,
    // staffBeforeStart: boolean = true,
  ) {
    const staff = this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect(
        'staff.attendance',
        'attendance',
        'attendance.createdAt BETWEEN :start AND :end',
        {
          start,
          end,
        },
      )
      .leftJoinAndSelect('attendance.attendanceType', 'attendanceType')
      .leftJoinAndSelect('attendance.markedBy', 'markedBy')
      .where('staff.organisation = :organisationId', { organisationId })
      .andWhere('staff.organisationBranch = :branchId', { branchId });
    // if (!staffBeforeStart)
    //   staff.andWhere('staff.createdAt >= :start', { start });
    const result = await staff.getMany();

    return result;
  }

  async findDocumentsByOrganisationBranch(
    organisationId: number,
    branchId: number,
    // staffBeforeStart: boolean = true,
  ) {
    const staff = this.staffRepository
      .createQueryBuilder('staff')
      .select([
        'staff.id',
        'user.id',
        'resume.id',
        'documents.url',
        'documents.name',
      ])
      .leftJoin('staff.user', 'user')
      .leftJoin('user.resume', 'resume')
      .leftJoin('resume.documents', 'documents')
      .where('staff.organisation = :organisationId', { organisationId })
      .andWhere('staff.organisationBranch = :branchId', { branchId });
    const result = await staff.getMany();

    return result;
  }

  async findOne(id: number) {
    return await this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('staff.advance', 'advance')
      .leftJoinAndSelect('advance.monthlyAdvance', 'monthlyAdvance')
      .where('staff.id = :id', { id })
      .getOne();
  }

  async findOneWithRelations(
    id: number,
    options?: { attendance?: { start: Date; end: Date } },
  ) {
    let result: Staff | SelectQueryBuilder<Staff> = this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.organisationBranch', 'organisationBranch')
      .leftJoinAndSelect('staff.weeklyOff', 'weeklyOff')
      .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
      .leftJoinAndSelect('staff.payrollApplied', 'payrollApplied')
      .leftJoinAndSelect('staff.advance', 'advance')
      .leftJoinAndSelect('advance.monthlyAdvance', 'monthlyAdvance')
      .leftJoinAndSelect(
        'monthlyAdvance.monthlyAdvancePayment',
        'monthlyAdvancePayment',
      );
    if (options && options.attendance) {
      result.leftJoinAndSelect(
        'staff.attendance',
        'attendance',
        'attendance.createdAt BETWEEN :start AND :end',
        {
          start: options.attendance.start,
          end: options.attendance.end,
        },
      );
    } else {
      result.leftJoinAndSelect('staff.attendance', 'attendance');
    }
    result
      .leftJoinAndSelect('attendance.attendanceType', 'attendanceType')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('user.resume', 'resume')
      .leftJoinAndSelect('resume.otherLanguages', 'otherLanguages')
      .leftJoinAndSelect('resume.workExperience', 'workExperience')
      .leftJoinAndSelect('resume.skills', 'skills')
      .leftJoinAndSelect('resume.documents', 'documents')
      .where('staff.id = :id', { id });
    result = await result.getOne();
    return result;
  }

  async findManyByBranchWithRelations(
    branchId: number,
    options?: { attendance?: { start: Date; end: Date }; month: string },
  ) {
    let result: Staff[] | SelectQueryBuilder<Staff> = this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
      .leftJoinAndSelect(
        'staff.payrollApplied',
        'payrollApplied',
        'payrollApplied.month = :month',
        { month: options.month },
      )
      .leftJoinAndSelect('staff.advance', 'advance')
      .leftJoinAndSelect(
        'advance.monthlyAdvance',
        'monthlyAdvance',
        // 'monthlyAdvance.month = :month',
        // { month: options.month },
      )
      .leftJoinAndSelect(
        'monthlyAdvance.monthlyAdvancePayment',
        'monthlyAdvancePayment',
      );
    if (options && options.attendance) {
      result.leftJoinAndSelect(
        'staff.attendance',
        'attendance',
        'attendance.createdAt BETWEEN :start AND :end',
        {
          start: options.attendance.start,
          end: options.attendance.end,
        },
      );
    } else {
      result.leftJoinAndSelect('staff.attendance', 'attendance');
    }
    result.leftJoinAndSelect('attendance.attendanceType', 'attendanceType');
    result.andWhere('staff.organisationBranch = :branchId', { branchId });
    result = await result.getMany();
    return result;
  }

  async findOneOrThrow(id: number) {
    const result = await this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.advance', 'advance')
      .leftJoinAndSelect('staff.weeklyOff', 'weeklyOff')
      .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
      .leftJoinAndSelect('staff.payrollApplied', 'payrollApplied')
      .leftJoinAndSelect('advance.monthlyAdvance', 'monthlyAdvance')
      .where('staff.id = :id', { id })
      .getOne();
    if (!result) {
      throw new BadRequestException('Invalid staff');
    }
    return result;
  }

  async findOneByOrganisationAndPin(organisationId: number, pin: string) {
    const staff = await this.staffRepository
      .createQueryBuilder('staff')
      .leftJoinAndSelect('staff.user', 'user')
      .where('staff.organisation = :organisationId', { organisationId })
      .andWhere('staff.pin = :pin', { pin })
      .getOne();

    return staff;
  }

  update(id: number, data: DeepPartial<Staff>) {
    if (!Object.values(data).length) return;
    return this.staffRepository.update(id, data);
  }

  remove(id: number) {
    return this.staffRepository.delete(id);
  }

  async removeAll() {
    return await this.staffRepository.delete({});
  }

  async removeAllAttendance() {
    const attendance = await this.staffAttendanceRepository.delete({});
    return attendance;
  }
  async removeAttendance(id: number) {
    const attendance = await this.staffAttendanceRepository.delete(id);
    return attendance;
  }

  async removeAllPayroll() {
    const payrollDefault = await this.payrollDefaultRepository.delete({});
    const payrollApplied = await this.payrollAppliedRepository.delete({});
    return { payrollDefault, payrollApplied };
  }

  async generateUniqueOTPByOrganisation(organisationId: number) {
    let OTP = generateRandomCode();
    const staff = await this.findOneByOrganisationAndPin(organisationId, OTP);

    if (staff) {
      OTP = await this.generateUniqueOTPByOrganisation(organisationId);
    }
    return OTP;
  }

  getDayStartAndEnd(date?: Date): {
    start: Date;
    end: Date;
    weekDay: number;
    month: number;
    year: number;
    daysInMonth: number;
    monthString: string;
    monthYear: number;
  } {
    const now = date ? moment(date) : moment();
    const start = now.startOf('day').toDate();
    const end = now.endOf('day').toDate();
    const weekDay = moment(now).isoWeekday();
    const month = moment(now).month();
    const year = moment(now).year();
    const daysInMonth = moment(now).daysInMonth();
    const monthString = moment(now).format('YYYY-MM');
    const monthYear = year * 100 + month;
    return {
      start,
      end,
      weekDay,
      month,
      year,
      daysInMonth,
      monthString,
      monthYear,
    };
  }

  getMonthStartAndEnd(date?: Date): MonthDetails {
    const now = date ? moment(date) : moment();
    const start = now.startOf('month').toDate();
    const end = now.endOf('month').toDate();
    const month = moment(now).month();
    const year = moment(now).year();
    const daysInMonth = moment(now).daysInMonth();
    const monthString = moment(now).format('YYYY-MM');
    const monthYear = year * 100 + month;
    const previousMonth = moment(now).subtract(1, 'month').toDate();
    return {
      start,
      end,
      month,
      daysInMonth,
      monthString,
      year,
      monthYear,
      previousMonth,
    };
  }
}
