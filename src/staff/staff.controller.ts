import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request as NestRequest,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import {
  ConnectStaffDto,
  CreatePaymentDto,
  CreateStaffAdvanceDto,
  CreateStaffDto,
  PayrollUpdateDto,
} from './dto/create-staff.dto';
import { UpdateStaffDto, UpdateWeeklyOffDto } from './dto/update-staff.dto';
import { AuthRequest } from '../types/AuthRequest';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { OrganisationService } from '../organisation/organisation.service';
import { Roles } from '../auth/roles.decorator';
import Staff from './entities/staff.entity';
import {
  CreateAttendanceDto,
  UpdateAttendanceDto,
} from './dto/create-attendance.dto';
import {
  attendanceTypes,
  LogTypes,
  SalaryIntervals,
  Roles as RolesEnum,
} from '../types/entity.attribute.types';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import LogColor from '../common/LogColour';
import * as moment from 'moment';
import StaffAttendance from './entities/staffAttendance.entity';
import { LogsService } from 'src/logs/logs.service';
import PayrollApplied from './entities/payrollApplied.entity';
import {
  AttendanceSummaryOrganisation,
  AttendanceSummaryStaff,
  MonthDetails,
  PayrollAppliedResponse,
  PayrollSummaryResponse,
  StaffAdvanceWithPaid,
  StaffAttendanceResponse,
  StaffAttendanceWithCurrentPayroll,
  StaffMonthlyAdvanceWithPaid,
  StaffResponse,
  StaffWithCurrentPayroll,
} from '../types/responseData.types';

import { R_staff_summary } from '../types/response.example';
import { Request } from 'express';
import StaffMonthlyAdvance from './entities/staffMonthlyAdvance';
import { DeepPartial, InsertResult, UpdateResult } from 'typeorm';
import * as dotenv from 'dotenv';
import StaffAdvance from './entities/staffAdvance.entity';
import PayrollDefault from './entities/payrollDefault.entity';
import { UpdatePayrollDto } from './dto/payroll.dto';
import AttendanceType from './entities/attendanceType.entity';
import StaffMonthlyAdvancePayment from './entities/staffMonthlyAdvancePayment';
import { staffShortByTypes } from '../types/requestData.types';
import StaffWeeklyOff from './entities/staffWeeklyOff.entity';
import { getDateFromTimeString } from '../common/utils';
import { NotificationService } from '../notification/notification.service';
dotenv.config();
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('staff')
@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly organisationService: OrganisationService,
    private readonly logsService: LogsService,
    private readonly notificationService: NotificationService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  // @Post()
  // create(@Body() createStaffDto: CreateStaffDto) {
  //   return this.staffService.create(createStaffDto);
  // }

  makeMonthlyAdvance(advance: StaffAdvance[]) {
    const monthlyAdvanceData: DeepPartial<StaffMonthlyAdvance>[] = [];
    advance.forEach((sa) => {
      const startMonth = moment(sa.startDate);
      if (sa.sameMonth) {
        const interestAmount = +(
          (sa.amount * sa.interestRate) /
          100 /
          12
        ).toFixed(2);
        const amount = +(sa.amount + interestAmount).toFixed(2);
        monthlyAdvanceData.push({
          amount,
          month: startMonth.format('YYYY-MM'),
          staffAdvance: sa,
        });
      } else {
        const interestAmount = +(
          (sa.amount * sa.interestRate) /
          100 /
          12
        ).toFixed(2);
        const monthlyAmount = +(
          sa.amount / sa.totalMonths +
          interestAmount
        ).toFixed(2);
        const totalAmount = monthlyAmount * sa.totalMonths;
        // let prevMonth = startMonth;
        for (let index = 0; index < sa.totalMonths; index++) {
          const monthString = startMonth.format('YYYY-MM');
          // prevMonth = moment(monthString);
          monthlyAdvanceData.push({
            amount: monthlyAmount,
            month: monthString,
            staffAdvance: sa,
          });
          startMonth.add(1, 'months');
        }
      }
    });
    return monthlyAdvanceData;
  }

  async addOneStaff(
    createStaffDto: CreateStaffDto,
  ): Promise<DeepPartial<Staff> & Staff> {
    const organisation = await this.organisationService.findOneOrThrow(
      createStaffDto.organisationId,
    );
    let pin: string;
    if (createStaffDto.userId) {
      createStaffDto.user = { id: createStaffDto.userId };
    } else {
      pin = await this.staffService.generateUniqueOTPByOrganisation(
        createStaffDto.organisationId,
      );
    }

    const advance = await this.staffService.createAdvance(
      createStaffDto.advance,
    );

    const weeklyOff = await this.staffService.saveWeeklyOff({
      weeklyOff1: createStaffDto.weekelyOff1,
      weeklyOff2: createStaffDto.weekelyOff2,
      month: this.staffService.getMonthStartAndEnd().monthString,
    });

    const monthlyAdvanceData = this.makeMonthlyAdvance(advance);
    const advanceMonthly = await this.staffService.createMonthlyAdvance(
      monthlyAdvanceData,
    );

    const payrollDefault = await this.staffService.createPayrollDefault({
      salary: createStaffDto.salary,
      month: moment().format('YYYY-MM'),
    });
    const payrollApplied = await this.staffService.createPayrollApplied({
      salary: createStaffDto.salary,
      month: moment().format('YYYY-MM'),
    });

    const staff = await this.staffService.save({
      ...createStaffDto,
      advance,
      organisation,
      weeklyOff: [weeklyOff],
      payrollApplied: [payrollApplied],
      payrollDefault: [payrollDefault],
      organisationBranch: { id: createStaffDto.organisationBranchId },
      pin,
    });

    if (createStaffDto.userId)
      await this.organisationService.deleteOneOrganisationJoinRequest(
        staff.organisationBranch.id,
        staff.user.id,
      );

    return staff;
  }

  @Roles('BUSINESS')
  @Post('organisation')
  async addStaff(
    @Body() createStaffDto: CreateStaffDto,
  ): Promise<DeepPartial<Staff> & Staff> {
    const staff = await this.addOneStaff(createStaffDto);
    return staff;
  }

  @Roles('BUSINESS')
  @Post('organisation/multiple')
  async addMultipleStaff(
    @Body() createStaffDtos: CreateStaffDto[],
  ): Promise<Staff[]> {
    const staffList: Staff[] = [];
    for await (const createStaffDto of createStaffDtos) {
      const staff = await this.addOneStaff(createStaffDto);
      staffList.push(staff);
    }
    return staffList;
  }

  @Post('connect')
  async create(
    @Body() connectStaffDto: ConnectStaffDto,
    @NestRequest() req: AuthRequest,
  ): Promise<DeepPartial<Staff> & Staff> {
    const staff = await this.staffService.findOneByOrganisationAndPin(
      connectStaffDto.organisationId,
      connectStaffDto.pin,
    );
    if (!staff || staff.user) {
      throw new BadRequestException('Invalid pin!');
    }
    staff.user = req.user;
    const result = await this.staffService.save(staff);
    return result;
  }
  // ! create schedulers on start
  @Roles('BUSINESS')
  @Post(':id/salary/update')
  async salaruUpdateSchedule(
    @Param('id') id: string,
    @Body() body: PayrollUpdateDto, //: Promise<Payroll>
  ): Promise<{
    result: string;
  }> {
    // const result = await this.staffService.createPayrollApplied({
    //   ...body,
    //   staff: { id: +id },
    // });
    // const time = moment(body.date).toDate();
    // this.scheduleJob(`createPayroll for staff ${id}`, time, result);
    return { result: 'pending' };
  }

  @Post('defaultAttendanceTypes/add')
  async createDefaultAttendanceType(): Promise<AttendanceType[]> {
    return await this.staffService.createAttendanceType(
      Object.values(attendanceTypes).map((i) => i),
    );
  }
  @Post('markAllAttendance')
  async markAllAttendance() {
    return await this._markAllAttendance(true);
  }
  @Post('test/payroll/add')
  async testAddPayroll() {
    const staffs = await this.staffService.findAll();
    for await (const s of staffs) {
      if (!s.payrollDefault.length) {
        const payrollDefault = await this.staffService.createPayrollDefault({
          salary: 10000,
          hra: 10,
          specialAllowance: 10,
          bonus: 10,
          nightAllowance: 10,
          overTime: 10,
          otherAddition: 0,
          pf: 10,
          esi: 10,
          tds: 10,
          otherDeduction: 100,
          month: moment().format('YYYY-MM'),
          staff: s,
        });
      }
      if (!s.payrollApplied.length) {
        const payrollApplied = await this.staffService.createPayrollApplied({
          salary: 10000,
          hra: 10,
          specialAllowance: 10,
          bonus: 10,
          nightAllowance: 10,
          overTime: 10,
          otherAddition: 0,
          pf: 10,
          esi: 10,
          tds: 10,
          otherDeduction: 100,
          month: moment().format('YYYY-MM'),
          staff: s,
        });
      }
    }
  }
  @Post('test/attendnace/add')
  async testAttendanceAdd() {
    await this.staffService.removeAllAttendance();
    let current = moment('2022-12-01');
    let currentDate = current.toDate();
    const attendanceList: StaffAttendance[] = [];
    const staffList = await this.staffService.findAll();
    // for await (const staff of staffList) {
    //   const { monthString } = this.staffService.getMonthStartAndEnd();
    //   const wo = await this.staffService.findWeeklyOff(staff.id, monthString);
    //   if (!wo) {
    //     await this.staffService.createWeeklyOff({
    //       staff,
    //       weeklyOff1: 6,
    //       weeklyOff2: 7,
    //       month: monthString,
    //     });
    //   }
    // }
    const allAttendanceTypes = await this.staffService.findAllAttendanceTypes();
    const presentType = allAttendanceTypes.find(
      (t) => t.name === attendanceTypes.PRESENT,
    );
    const absentType = allAttendanceTypes.find(
      (t) => t.name === attendanceTypes.ABSENT,
    );
    const weeklyOffType = allAttendanceTypes.find(
      (t) => t.name === attendanceTypes.WEEKLY_OFF,
    );
    while (currentDate < new Date()) {
      const { start, end, weekDay } =
        this.staffService.getDayStartAndEnd(currentDate);
      const { monthString } =
        this.staffService.getMonthStartAndEnd(currentDate);
      console.log(start, end, weekDay);
      currentDate = moment(currentDate).add(1, 'day').toDate();

      let attendanceType = absentType;
      for await (const staff of staffList) {
        if (staff.createdAt > start) {
          continue;
        }
        const checkAttendance =
          await this.staffService.findOneAttendanceBetween(
            staff.id,
            start,
            end,
          );
        if (checkAttendance) {
          const message = LogColor.setColor(
            `Attendance already exists for ${start.toLocaleDateString()} : ${
              staff.user.name
            }`,
            LogColor.FgBlue,
          );
          console.log(message);
          continue;
        }
        attendanceType = presentType;
        const weeklyOff = this.getSpecificMonthWeeklyOff(
          staff.weeklyOff,
          monthString,
        );
        if (
          weeklyOff.weeklyOff1 == weekDay ||
          weeklyOff.weeklyOff2 === weekDay
        ) {
          attendanceType = weeklyOffType;
        }
        attendanceList.push(
          this.staffService.createAttendanceInstance({
            attendanceType,
            staff,
            createdAt: start,
            updatedAt: start,
          }),
        );
        const message = LogColor.setColor(
          `Attendance done for ${start.toLocaleDateString()} : ${staff.name}`,
          LogColor.BgGreen,
        );
        console.log(message);
      }
    }
    await this.staffService.createManyAttendance(attendanceList);
  }

  @Post(':id/attendance')
  async createAttendance(
    @Param('id') id: string,
    @Body() createAttendanceDto: CreateAttendanceDto,
    @NestRequest() req: AuthRequest,
  ): Promise<UpdateResult | InsertResult | { message: string; code: string }> {
    const { start, end } = this.staffService.getDayStartAndEnd();
    const staff = await this.staffService.findOne(+id);
    const now = new Date();
    const markLateAfter = getDateFromTimeString(staff.markLateAfter);
    const openTime = getDateFromTimeString(staff.openTime);
    const closeTime = getDateFromTimeString(staff.closeTime);
    if (req.user.role.name === RolesEnum.EMPLOYEE) {
      console.log(now);
      console.log(openTime);
      console.log(closeTime);

      if (now < openTime || now > closeTime) {
        return {
          message: 'Not allowed!',
          code: 'ON_OFFICE_HOURS',
        };
      } else if (now > markLateAfter) {
        createAttendanceDto.attendanceType = attendanceTypes.LATE_HALF_DAY;
      }
    }

    const attendanceType = await this.staffService.findAttendanceTypeOrThrow(
      createAttendanceDto.attendanceType,
    );
    const attendanceExists = await this.staffService.findOneAttendanceBetween(
      +id,
      start,
      end,
    );
    let attendance: InsertResult | UpdateResult;
    if (attendanceExists) {
      const data = this.staffService.createAttendanceInstance({
        ...createAttendanceDto,
        attendanceType,
        markedBy: req.user,
      });
      attendance = await this.staffService.updateAttendance(
        attendanceExists.id,
        data,
      );
    } else {
      const staff = await this.staffService.findOneOrThrow(+id);
      attendance = await this.staffService.createAttendance({
        ...createAttendanceDto,
        attendanceType,
        staff,
        markedBy: req.user,
      });
    }
    // this.getAndUpdateWeeklyOffTillNow(+id);
    return attendance;
  }

  getRemainingPayment(monthlyAdvance: StaffMonthlyAdvance): number {
    const paymentRequired = monthlyAdvance.amount;
    const paymentDone = monthlyAdvance.monthlyAdvancePayment.reduce(
      (prevValue, currentValue) => prevValue + currentValue.amount,
      0,
    );
    return paymentRequired - paymentDone;
  }

  @Post(':id/advance')
  async addAdvance(
    @Param('id') id: string,
    @Body() createStaffAdvanceDtos: CreateStaffAdvanceDto[],
  ) {
    const advance = await this.staffService.createAdvance(
      createStaffAdvanceDtos,
    );
    const monthlyAdvanceData = this.makeMonthlyAdvance(advance);
    const advanceMonthly = await this.staffService.createMonthlyAdvance(
      monthlyAdvanceData,
    );
    for await (const adv of advance) {
      await this.staffService.updateAdvance(adv.id, { staff: { id: +id } });
    }
    return advance;
  }

  @Post('advance/pay')
  async payAdvance(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<
    DeepPartial<StaffMonthlyAdvancePayment> & StaffMonthlyAdvancePayment
  > {
    const getPayments =
      await this.staffService.findOneMonthlyAdvanceWithPayment(
        createPaymentDto.monthlyAdvanceId,
      );
    const remaimingAmount = this.getRemainingPayment(getPayments);
    if (createPaymentDto.amount > remaimingAmount) {
      throw new BadRequestException('Payment can not exceed advance amount');
    }
    const payment = await this.staffService.createMonthlyAdvancePayment({
      ...createPaymentDto,
      staffMonthlyAdvance: { id: createPaymentDto.monthlyAdvanceId },
    });
    // notification

    this.staffService
      .findOneMonthlyAdvanceWithPaymentWithUser(
        createPaymentDto.monthlyAdvanceId,
      )
      .then((paymentWithUser) => {
        this.notificationService.create({
          title: 'Advance paid!',
          type: 'AdvancePaid',
          description: `₹${createPaymentDto.amount} paid for ${createPaymentDto.monthlyAdvanceId}`,
          user: paymentWithUser.staffAdvance.staff.user,
        });
      });
    return payment;
  }

  @Roles('BUSINESS')
  @Get('organisation/branch/:branchId')
  async getStaffByOrganisationBranch(
    @Param('branchId') branchId: string,
    @Query('filter') sort: staffShortByTypes,
  ): Promise<StaffResponse[]> {
    const month = this.staffService.getMonthStartAndEnd();
    const staff = await this.staffService.findByOrganisationBranch(+branchId, {
      month: month.monthString,
      sort,
    });
    staff.forEach((s: StaffResponse) => {
      const payroll = this.getSpecificMonthPayroll(
        s.payrollDefault,
        month.monthString,
      );
      if (payroll) {
        s.salary = payroll.salary;
      }
    });
    if (sort === 'high_to_low_salary') {
      staff.sort((a: StaffResponse, b: StaffResponse) => b.salary - a.salary);
    } else if (sort === 'low_to_high_salary') {
      staff.sort((a: StaffResponse, b: StaffResponse) => a.salary - b.salary);
    }
    return staff;
  }

  payrollSummaryFormatAndUpdate(
    staffList: Staff[],
    month: MonthDetails,
    sort: staffShortByTypes,
  ) {
    let totalPayableSalary = 0;
    let totalAdvance = 0;
    const staffListResponse = staffList.map((staff: StaffResponse) => {
      const payroll = this.calculateMonthlyPayrollFromDefault(
        staff,
        month.daysInMonth,
        month.monthString,
      );
      staff.salary = payroll.currentSalary;
      staff.hra = payroll.hra;
      this.staffService
        .createOrUpdatePayrollApplied(staff.id, month.monthString, payroll)
        .then((res) => console.log(res));

      totalPayableSalary += payroll.salary;
      totalAdvance += payroll.advanceDetails.pendingTotalAdvance;

      delete staff.advance;
      delete staff.attendance;
      delete staff.payrollApplied;
      delete staff.payrollDefault;
      return {
        staff,
        payrollApplied: { ...payroll, month: month.monthString },
      };
    });

    totalAdvance = +totalAdvance.toFixed(2);
    totalPayableSalary = +totalPayableSalary.toFixed(2);

    if (sort === 'high_to_low_salary') {
      staffListResponse.sort(
        (a, b) => b.payrollApplied.salary - a.payrollApplied.salary,
      );
    } else if (sort === 'low_to_high_salary') {
      staffListResponse.sort(
        (a, b) => a.payrollApplied.salary - b.payrollApplied.salary,
      );
    }
    return { staffListResponse, totalPayableSalary, totalAdvance };
  }

  @Get('organisation/branch/:branchId/payroll/summary')
  async getStaffPayrollByOrganisationBranch(
    @Param('branchId') branchId: string,
    @Query('filter') sort: staffShortByTypes,
    @Query('start') _start: string,
    @Query('end') _end: string,
  ): Promise<PayrollSummaryResponse> {
    let thisMonth = this.staffService.getMonthStartAndEnd();
    if (_start && _end) {
      thisMonth = this.staffService.getMonthStartAndEnd(new Date(_end));
    }
    let lastMonth = this.staffService.getMonthStartAndEnd(
      thisMonth.previousMonth,
    );
    let staffList: StaffResponse[] =
      await this.staffService.findManyByBranchWithRelations(+branchId, {
        attendance: { start: thisMonth.start, end: thisMonth.end },
        month: thisMonth.monthString,
      });
    let staffListLastMonth: StaffResponse[] =
      await this.staffService.findManyByBranchWithRelations(+branchId, {
        attendance: { start: lastMonth.start, end: lastMonth.end },
        month: lastMonth.monthString,
      });

    const { staffListResponse, totalPayableSalary, totalAdvance } =
      this.payrollSummaryFormatAndUpdate(staffList, thisMonth, sort);
    const lastMonthSummary = this.payrollSummaryFormatAndUpdate(
      staffListLastMonth,
      lastMonth,
      sort,
    );

    return {
      staffList: staffListResponse,
      totalPayableSalary,
      totalAdvance,
      lastMonthSummary: { ...lastMonthSummary, staffList: staffListResponse },
    };
  }

  @Roles('BUSINESS')
  @Get('organisation/:organisationId/branch/:branchId/summary')
  async getStaffSummaryByOrganisationBranch(
    @Param('organisationId') organisationId: string,
    @Param('branchId') branchId: string,
    @Query('start') _start: string,
    @Query('end') _end: string,
    @Query('filter') filter: string,
  ): Promise<AttendanceSummaryOrganisation> {
    let attendance: StaffAttendance[] = [];
    let daysInMonth = 0;
    let requiredAttendanceThisMonth = 0;
    let requiredAttendanceThisDay = 0;
    let day: {
      start: Date;
      end: Date;
      month: number;
      daysInMonth: number;
      monthString: string;
    };
    if (!_start || !_end) {
      day = this.staffService.getDayStartAndEnd();
    } else {
      day = this.staffService.getDayStartAndEnd(new Date(_end));
    }
    const start = day.start;
    const end = day.end;
    console.log(`Attendance Start ${start} End ${end}`);

    daysInMonth = day.daysInMonth;
    const staff: StaffWithCurrentPayroll[] =
      await this.staffService.findByOrganisationBranchWithAttendance(
        +organisationId,
        +branchId,
        start,
        end,
      );
    const totalWeeklyOff = await this.staffService.findManyAttendanceByType(
      attendanceTypes.WEEKLY_OFF,
      { branchId: +branchId, end },
    );

    let PRESENT = 0;
    let ABSENT = 0;
    let LATE_HALF_DAY = 0;
    let WEEKLY_OFF = 0;
    let PAID_LEAVE = 0;
    const weeklyOff: {
      total: number;
      spent: number;
    } = { total: 0, spent: totalWeeklyOff.length };
    staff.forEach((i) => {
      weeklyOff.total += this.getCarryForwardCountForOne(i, end).total;

      const monthWeeklyOff = this.getSpecificMonthWeeklyOff(
        i.weeklyOff,
        day.monthString,
      );
      const a = i.attendance;
      // ! need update after loophole fix
      requiredAttendanceThisMonth += 1; // this.checkRequiredPresentOfThisDay(i)//   ? 1//   : 0;
      requiredAttendanceThisDay += 1; // this.checkRequiredPresentOfThisDay(i)//   ? 1//   : 0;
      const staffData = {
        id: i.id,
        user: i.user,
        name: i.name,
        phoneNumber: i.phoneNumber,
        // currentPayroll: this.getSpecificDateSalaryWithHra(i.payroll, start),
        salaryInterval: i.salaryInterval,
        openTime: i.openTime,
        closeTime: i.closeTime,
        markLateAfter: i.markLateAfter,
        // @ts-ignore
        weekelyOff1: monthWeeklyOff.weeklyOff1,
        weekelyOff2: monthWeeklyOff.weeklyOff2,
        weekelyOffTillNow: i.weekelyOffTillNow,
        pin: i.pin,
        createdAt: i.createdAt,
      };
      const staffCreatedAt = moment(staffData.createdAt)
        .startOf('day')
        .toDate();
      if (a.length) {
        a.forEach((j: StaffAttendanceWithCurrentPayroll) => {
          const type = j.attendanceType;
          if (
            type.name === 'PRESENT'
            // ||
            // type.name === attendanceTypes.PRESENT_PLUS_FULL_OVERTIME ||
            // type.name === attendanceTypes.PRESENT_PLUS_HALF_OVERTIME
          )
            PRESENT += 1;
          if (type.name === 'ABSENT') ABSENT += 1;
          if (type.name === 'LATE_HALF_DAY') LATE_HALF_DAY += 1;
          if (type.name === 'WEEKLY_OFF') WEEKLY_OFF += 1;
          if (type.name === 'PAID_LEAVE') PAID_LEAVE += 1;

          // @ts-ignore
          j.staff = staffData;
          attendance.push(j);
        });
        attendance.sort((a, b) => {
          if (!a.updatedAt) return 1;
          if (!b.updatedAt) return -1;
          return a.updatedAt.getTime() - b.updatedAt.getTime();
        });
      } else if (staffCreatedAt <= start) {
        attendance.push(
          this.staffService.createAttendanceInstance({ staff: staffData }),
        );
      }
    });

    weeklyOff.spent = WEEKLY_OFF;
    weeklyOff.total = requiredAttendanceThisDay;

    const analysis = {
      PRESENT,
      ABSENT,
      LATE_HALF_DAY,
      WEEKLY_OFF,
      PAID_LEAVE,
      weeklyOff,
    };

    if (Object.values(attendanceTypes).find((at) => at === filter))
      attendance = attendance.filter((a) => {
        if (a.attendanceType) return a.attendanceType.name === filter;
        else false;
      });
    return {
      totalStaff: staff.length,
      analysis,
      daysInMonth,
      requiredAttendanceThisMonth,
      requiredAttendanceThisDay,
      attendance,
    };
  }

  @Roles('BUSINESS')
  @Get('organisation/:organisationId/branch/:branchId/report')
  async getStaffReportByOrganisationBranch(
    @Param('organisationId') organisationId: string,
    @Param('branchId') branchId: string,
    @Query('start') _start: string,
    @Query('end') _end: string,
  ): Promise<StaffWithCurrentPayroll[]> {
    let day: {
      start: Date;
      end: Date;
      // month: number;
      // daysInMonth: number;
      // monthString: string;
    };
    if (!_start || !_end) {
      day = this.staffService.getDayStartAndEnd();
    } else {
      day = {
        start: new Date(_start),
        end: new Date(_end),
      };
    }
    const start = day.start;
    const end = day.end;
    console.log(`Attendance Start ${start} End ${end}`);

    const staff: StaffWithCurrentPayroll[] =
      await this.staffService.findByOrganisationBranchWithAttendanceReport(
        +organisationId,
        +branchId,
        start,
        end,
      );

    return staff;
  }

  @Roles('BUSINESS')
  @Get('organisation/:organisationId/branch/:branchId/documents')
  async getStaffDocumentsByOrganisationBranch(
    @Param('organisationId') organisationId: string,
    @Param('branchId') branchId: string,
  ): Promise<StaffWithCurrentPayroll[]> {
    let staff: Staff[] =
      await this.staffService.findDocumentsByOrganisationBranch(
        +organisationId,
        +branchId,
      );
    const docs = [];
    staff.map((s) => {
      if (
        s.user &&
        s.user.resume &&
        s.user.resume.documents &&
        s.user.resume.documents.length
      ) {
        s.user.resume.documents.forEach((d) => {
          docs.push({ userName: s.user.name || '', ...d });
        });
      }
    });
    return docs;
  }

  @Roles('BUSINESS')
  @Get('all/organisation/:organisationId/branch/:branchId')
  async getStaffByOrganisation(
    @Param('organisationId') organisationId: string,
    @Param('branchId') branchId: string,
  ): Promise<Staff[]> {
    const { start, end } = this.staffService.getDayStartAndEnd();
    const staff: StaffAttendanceResponse[] =
      await this.staffService.findByOrganisationBranchWithAttendance(
        +organisationId,
        +branchId,
        start,
        end,
      );

    return staff;
  }

  @Roles('BUSINESS')
  @Get('organisation/:organisationId/branch/:branchId/attendance/today')
  async findManyAttendanceBetweenByOrganisation(
    @Param('organisationId') organisationId: string,
    @Param('branchId') branchId: string,
  ): Promise<StaffAttendance[]> {
    const { start, end } = this.staffService.getDayStartAndEnd();
    const staff =
      await this.staffService.findManyAttendanceBetweenByOrganisation(
        +organisationId,
        +branchId,
        start,
        end,
      );
    return staff;
  }

  @Get()
  findAll(@NestRequest() req: AuthRequest) {
    return this.staffService.findByUser(req.user.id);
  }

  // ! calculateMonthlyAdvance;

  getSpecificMonthPayroll(
    payroll: PayrollDefault[] | PayrollApplied[],
    monthString: string,
  ): PayrollAppliedResponse {
    // const payroll: { date: string; salary: number; endDate?: string }[] = [
    //   { date: '2022-09-12', salary: 1000 },
    //   { date: '2022-11-15', salary: 2000 },
    //   { date: '2022-11-20', salary: 3000 },
    // ];
    const month = moment(monthString).month();
    const year = moment(monthString).year();
    let salary: PayrollDefault = payroll[0];
    payroll.forEach((s, i) => {
      const dMonth = moment(s.month).month();
      const dYear = moment(s.month).year();
      if (i < payroll.length - 1) {
        if (monthString === s.month) {
          salary = s;
        }
      } else if (month >= dMonth && year >= dYear) {
        salary = s;
      }
    });
    return salary;
  }

  getSpecificMonthWeeklyOff(
    weeklyOff: StaffWeeklyOff[],
    monthString: string,
  ): StaffWeeklyOff {
    const month = moment(monthString).month();
    const year = moment(monthString).year();
    let specificWeeklyOff: StaffWeeklyOff = weeklyOff[0];
    weeklyOff.forEach((s, i) => {
      const dMonth = moment(s.month).month();
      const dYear = moment(s.month).year();
      if (i < weeklyOff.length - 1) {
        if (monthString === s.month) {
          specificWeeklyOff = s;
        }
      } else if (month >= dMonth && year >= dYear) {
        specificWeeklyOff = s;
      }
    });
    return specificWeeklyOff;
  }

  calculateAdvance(
    advance: StaffAdvance[],
    monthString: string,
  ): {
    advanceThisMonth: number;
    advancePaidThisMonth: number;
    pendingAdvanceThisMonth: number;
    advanceAfterThisMonth: number;
    pendingTotalAdvance: number;
  } {
    let advanceThisMonth = 0;
    let advancePaidThisMonth = 0;
    let advanceAfterThisMonth = 0;
    let advancePaidAfterThisMonth = 0;
    const mtObj =
      this.staffService.getMonthStartAndEnd(/* new Date(monthString) */);
    advance.forEach((advance) => {
      advance.monthlyAdvance.forEach((ma) => {
        // const remainingPayment = this.getRemainingPayment(ma);
        const maMtObj = this.staffService.getMonthStartAndEnd(
          new Date(ma.month),
        );
        if (maMtObj.monthYear === mtObj.monthYear) {
          advanceThisMonth += ma.amount;
          advancePaidThisMonth += ma.monthlyAdvancePayment.reduce(
            (prev, cur) => prev + cur.amount,
            0,
          );
        } else if (maMtObj.monthYear > mtObj.monthYear) {
          advanceAfterThisMonth += ma.amount;
          advancePaidAfterThisMonth += ma.monthlyAdvancePayment.reduce(
            (prev, cur) => prev + cur.amount,
            0,
          );
        }
      });
    });
    const pendingAdvanceThisMonth = +(
      advanceThisMonth - advancePaidThisMonth
    ).toFixed(2);
    const pendingTotalAdvance = advanceAfterThisMonth;
    return {
      advanceThisMonth,
      advancePaidThisMonth,
      pendingAdvanceThisMonth,
      advanceAfterThisMonth,
      pendingTotalAdvance,
    };
  }

  calculateMonthlyPayrollFromDefault(
    staff: Staff,
    daysInMonth: number,
    monthString: string,
  ): PayrollAppliedResponse {
    let salary = 0;
    let {
      advanceThisMonth,
      advancePaidThisMonth,
      pendingAdvanceThisMonth,
      advanceAfterThisMonth,
      pendingTotalAdvance,
    } = this.calculateAdvance(staff.advance, monthString);

    let dailySalary = 0;
    let dailyHra = 0;
    // Current Payroll
    const currentPayroll: PayrollAppliedResponse = this.getSpecificMonthPayroll(
      staff.payrollDefault,
      monthString,
    );
    const currentSalary = currentPayroll.salary;
    currentPayroll.currentSalary = currentPayroll.salary;
    if (staff.salaryInterval === SalaryIntervals.MONTH) {
      dailySalary = currentSalary / daysInMonth;
    } else if (staff.salaryInterval === SalaryIntervals.DAY) {
      dailySalary = currentSalary;
    } else if (staff.salaryInterval === SalaryIntervals.WEEK) {
      dailySalary = currentSalary / 7;
    }

    staff.attendance.forEach((i) => {
      const type = i.attendanceType.name;
      if (
        type === attendanceTypes.PRESENT ||
        type === attendanceTypes.WEEKLY_OFF ||
        type === attendanceTypes.PAID_LEAVE
      ) {
        salary += dailySalary;
      } else if (type === attendanceTypes.PRESENT_PLUS_FULL_OVERTIME) {
        salary += dailySalary;
        currentPayroll.overTime += dailySalary;
      } else if (type === attendanceTypes.PRESENT_PLUS_HALF_OVERTIME) {
        salary += dailySalary;
        currentPayroll.overTime += dailySalary / 2;
      }
    });
    currentPayroll.salary = salary;
    currentPayroll.advance = pendingAdvanceThisMonth;
    const addition =
      currentPayroll.hra +
      currentPayroll.specialAllowance +
      currentPayroll.bonus +
      currentPayroll.nightAllowance +
      currentPayroll.overTime +
      currentPayroll.otherAddition;
    const deduction =
      currentPayroll.advance +
      currentPayroll.pf +
      currentPayroll.esi +
      currentPayroll.tds +
      currentPayroll.otherDeduction;

    currentPayroll.totalEarnings = currentPayroll.salary + addition;
    currentPayroll.totalDeduction = deduction;

    // if (currentPayroll.totalEarnings >= currentPayroll.totalDeduction) {
    //   pendingTotalAdvance -= currentPayroll.advance;
    // }
    // else {
    //   currentPayroll.totalDeduction -= currentPayroll.advance;
    //   currentPayroll.advance = 0;
    // }

    currentPayroll.netAmount =
      currentPayroll.totalEarnings - currentPayroll.totalDeduction;

    currentPayroll.advanceDetails = {
      advanceAfterThisMonth: advanceAfterThisMonth,
      pendingTotalAdvance: pendingTotalAdvance,
      advanceThisMonth: advanceThisMonth,
      advancePaidThisMonth: advancePaidThisMonth,
    };

    return currentPayroll;
  }

  // calculateMonthlyPayrollFromApplied(
  //   staff: Staff,
  //   daysInMonth: number,
  //   monthString: string,
  // ): PayrollAppliedResponse {
  //   // let salary = 0;
  //   let { advanceThisMonth, advancePaidThisMonth, pendingAdvanceThisMonth } =
  //     this.calculateAdvance(staff.advance, monthString);

  //   let dailySalary = 0;
  //   let dailyHra = 0;
  //   // Current Payroll
  //   const currentPayroll: PayrollAppliedResponse = this.getSpecificMonthPayroll(
  //     staff.payrollDefault,
  //     monthString,
  //   );
  //   // const currentSalary = currentPayroll.salary;
  //   // currentPayroll.currentSalary = currentPayroll.salary;
  //   // if (staff.salaryInterval === SalaryIntervals.MONTH) {
  //   //   dailySalary = currentSalary / daysInMonth;
  //   // } else if (staff.salaryInterval === SalaryIntervals.DAY) {
  //   //   dailySalary = currentSalary;
  //   // } else if (staff.salaryInterval === SalaryIntervals.WEEK) {
  //   //   dailySalary = currentSalary / 7;
  //   // }

  //   // staff.attendance.forEach((i) => {
  //   //   const type = i.attendanceType.name;
  //   //   if (
  //   //     type === attendanceTypes.PRESENT ||
  //   //     type === attendanceTypes.WEEKLY_OFF ||
  //   //     type === attendanceTypes.PAID_LEAVE
  //   //   ) {
  //   //     salary += dailySalary;
  //   //   } else if (type === attendanceTypes.PRESENT_PLUS_FULL_OVERTIME) {
  //   //     salary += dailySalary;
  //   //     currentPayroll.overTime += dailySalary;
  //   //   } else if (type === attendanceTypes.PRESENT_PLUS_HALF_OVERTIME) {
  //   //     salary += dailySalary;
  //   //     currentPayroll.overTime += dailySalary / 2;
  //   //   }
  //   // });
  //   // currentPayroll.salary = salary;
  //   currentPayroll.advance = pendingAdvanceThisMonth;
  //   const addition =
  //     currentPayroll.hra +
  //     currentPayroll.specialAllowance +
  //     currentPayroll.bonus +
  //     currentPayroll.nightAllowance +
  //     currentPayroll.overTime +
  //     currentPayroll.otherAddition;
  //   const deduction =
  //     currentPayroll.advance +
  //     currentPayroll.pf +
  //     currentPayroll.esi +
  //     currentPayroll.tds +
  //     currentPayroll.otherDeduction;
  //   currentPayroll.totalEarnings = currentPayroll.salary + addition;
  //   currentPayroll.totalDeduction = deduction;
  //   currentPayroll.netAmount =
  //     currentPayroll.totalEarnings - currentPayroll.totalDeduction;
  //   return currentPayroll;
  // }

  grantedWeeeklyOffTill(staff: Staff, till: Date) {
    const current = moment(staff.createdAt);
    const now = till ? till : moment().toDate();
    let grantedWeeeklyOffTillNow = 0;
    while (current.toDate() <= now) {
      const cw = current.isoWeekday();
      const { monthString } = this.staffService.getMonthStartAndEnd(
        current.toDate(),
      );
      const weeklyOff = this.getSpecificMonthWeeklyOff(
        staff.weeklyOff,
        monthString,
      );
      if (cw === weeklyOff.weeklyOff1 || cw === weeklyOff.weeklyOff2) {
        grantedWeeeklyOffTillNow++;
      }
      current.add(1, 'day');
    }
    return grantedWeeeklyOffTillNow;
  }

  getRequiredPresentOfThisMonth(staff: Staff): number {
    let requiredPresent = 0;
    let { start, end, monthString } = this.staffService.getMonthStartAndEnd();
    const weeklyOff = this.getSpecificMonthWeeklyOff(
      staff.weeklyOff,
      monthString,
    );
    const current = moment(start);
    while (current.toDate() <= end) {
      const cw = current.isoWeekday();
      current.add(1, 'day');
      if (cw === weeklyOff.weeklyOff1 || cw === weeklyOff.weeklyOff2) {
        continue;
      }
      requiredPresent++;
    }
    return requiredPresent;
  }

  checkRequiredPresentOfThisDay(staff: Staff): boolean {
    let { start, monthString } = this.staffService.getDayStartAndEnd();
    const weeklyOff = this.getSpecificMonthWeeklyOff(
      staff.weeklyOff,
      monthString,
    );
    const current = moment(start).isoWeekday();

    if (current === weeklyOff.weeklyOff1 || current === weeklyOff.weeklyOff2) {
      return false;
    }
    return true;
  }

  async getAndUpdateWeeklyOffTillNow(staffId: number) {
    const weeklyOffs = await this.staffService.findManyAttendanceByType(
      attendanceTypes.WEEKLY_OFF,
      { staffId },
    );
    const spent = weeklyOffs.length;
    // this.staffService.update(staffId, { weekelyOffTillNow: spent });
    return spent;
  }

  // ! LOOPHOLE FIX
  getCarryForwardCountForOne(staff: Staff, till: Date) {
    const grantedWeeklyOffTillNow = this.grantedWeeeklyOffTill(staff, till);
    const spent = staff.weekelyOffTillNow;
    return { total: grantedWeeklyOffTillNow, spent };
  }

  @Get(':id/salary')
  async getSalary(@Param('id') id: string): Promise<PayrollApplied> {
    const { start, end, daysInMonth, monthString } =
      this.staffService.getMonthStartAndEnd();
    const staff = await this.staffService.findOneOrThrow(+id);
    staff.attendance = await this.staffService.findManyAttendanceBetween(
      staff.id,
      start,
      end,
    );
    const salary = this.calculateMonthlyPayrollFromDefault(
      staff,
      daysInMonth,
      monthString,
    );
    return salary;
  }

  @Get(':id/attendance/today')
  async findAttendanceBetween(@Param('id') id: string) {
    const { start, end } = this.staffService.getDayStartAndEnd();
    const result = await this.staffService.findManyAttendanceBetween(
      +id,
      start,
      end,
    );
    const attendance = result.length > 0 ? result[0] : null;
    return attendance;
  }

  @ApiResponse({ schema: { example: R_staff_summary } })
  @Get(':id/attendance/summary')
  async findAttendanceSummary(
    @Param('id') id: string,
    @Query('startDate') _start: string,
    @Query('endDate') _end: string,
    @Query('filter') filter: string,
  ): Promise<AttendanceSummaryStaff> {
    const staff = await this.staffService.findOneOrThrow(+id);
    let { start, end, daysInMonth } = this.staffService.getMonthStartAndEnd();
    if (_start && _end) {
      // @ts-ignore
      start = _start;
      // @ts-ignore
      end = _end;
    }
    const weeklyOff = this.getCarryForwardCountForOne(staff, end);
    let attendance = await this.staffService.findManyAttendanceBetween(
      +id,
      new Date(start),
      new Date(end),
    );
    let PRESENT = 0;
    let ABSENT = 0;
    let LATE_HALF_DAY = 0;
    let WEEKLY_OFF = 0;
    let PAID_LEAVE = 0;
    staff.attendance = attendance;
    const requiredAttendanceThisMonth = attendance.length; //this.getRequiredPresentOfThisMonth(staff);
    attendance.forEach((a) => {
      const type = a.attendanceType;
      if (type.name === 'PRESENT') PRESENT += 1;
      if (type.name === 'ABSENT') ABSENT += 1;
      if (type.name === 'LATE_HALF_DAY') LATE_HALF_DAY += 1;
      if (type.name === 'WEEKLY_OFF') WEEKLY_OFF += 1;
      if (type.name === 'PAID_LEAVE') PAID_LEAVE += 1;
    });

    weeklyOff.spent = WEEKLY_OFF;
    weeklyOff.total = requiredAttendanceThisMonth;

    if (Object.values(attendanceTypes).find((at) => at === filter))
      attendance = attendance.filter((a) => {
        if (a.attendanceType) return a.attendanceType.name === filter;
        else false;
      });

    const analysis = {
      PRESENT,
      ABSENT,
      LATE_HALF_DAY,
      WEEKLY_OFF,
      PAID_LEAVE,
      weeklyOff,
    };

    return { analysis, attendance, daysInMonth, requiredAttendanceThisMonth };
  }

  @Get(':id/advance')
  async findAdvance(@Param('id') id: string): Promise<StaffAdvanceWithPaid[]> {
    const { monthString, monthYear, start } =
      this.staffService.getMonthStartAndEnd();

    const advance: StaffAdvanceWithPaid[] =
      await this.staffService.findAdvanceWithPayment(+id);
    advance.forEach((adv) => {
      adv.monthlyAdvance.forEach((mAdv: StaffMonthlyAdvanceWithPaid) => {
        let total = 0;
        const advMonth = this.staffService.getMonthStartAndEnd(
          moment(mAdv.month).toDate(),
        );
        mAdv.paid = false;
        if (advMonth.monthYear < monthYear) {
          mAdv.paid = true;
          mAdv.paidAmount = mAdv.amount;
        } else {
          total = mAdv.monthlyAdvancePayment.reduce(
            (prev, next) => prev + next.amount,
            0,
          );
          if (total >= mAdv.amount) mAdv.paid = true;
        }

        mAdv.paidAmount = total;

        if (advMonth.monthYear > monthYear && !adv.nextDue) {
          adv.nextDue = mAdv.month;
        }
      });
      adv.totalAmount = adv.monthlyAdvance.reduce(
        (prev, next) => prev + next.amount,
        0,
      );
      adv.paidAmount = adv.monthlyAdvance.reduce(
        (prev, next: StaffMonthlyAdvanceWithPaid) => prev + next.paidAmount,
        0,
      );
      adv.pendingAmount = adv.totalAmount - adv.paidAmount;
    });
    return advance;
  }

  @Get(':id/payroll/applied/:month')
  async findPayrollApplied(
    @Param('id') id: string,
    @Param('month') month: string,
  ): Promise<PayrollApplied> {
    let payroll = await this.staffService.findPayrollApplied(+id, month);
    if (!payroll) {
      const payrollDefault = await this.staffService.findAllPayrollDefault(+id);
      payroll = this.getSpecificMonthPayroll(payrollDefault, month);
    }
    return payroll;
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('month') month: string,
  ): Promise<{ staff: StaffResponse; payrollApplied: PayrollAppliedResponse }> {
    const _month = month ? moment(month).toDate() : undefined;
    let { start, end, daysInMonth, monthString } =
      this.staffService.getMonthStartAndEnd(_month);
    if (_month) end = moment(_month).endOf('day').toDate();
    const staff: StaffResponse = await this.staffService.findOneWithRelations(
      +id,
      {
        attendance: { start, end },
      },
    );
    const payroll = this.calculateMonthlyPayrollFromDefault(
      staff,
      daysInMonth,
      monthString,
    );
    const weeklyoff = this.getSpecificMonthWeeklyOff(
      staff.weeklyOff,
      monthString,
    );
    staff.weeklyOff1 = weeklyoff.weeklyOff1;
    staff.weeklyOff2 = weeklyoff.weeklyOff2;
    staff.salary = payroll.currentSalary;
    staff.hra = payroll.hra;
    this.staffService
      .createOrUpdatePayrollApplied(staff.id, monthString, payroll)
      .then((res) => console.log(res));
    return { staff, payrollApplied: { ...payroll, month: monthString } };
  }

  @Patch('attendance/:id')
  async updateAttendance(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
    @NestRequest() req: Request,
  ) {
    const attendanceType = await this.staffService.findAttendanceTypeOrThrow(
      updateAttendanceDto.attendanceType,
    );
    const data = this.staffService.createAttendanceInstance({
      ...updateAttendanceDto,
      attendanceType,
      markedBy: req.user,
    });
    const attendance = await this.staffService.updateAttendance(+id, data);
    return attendance;
  }

  @Patch(':id/weeklyOff')
  async updateWeeklyOff(
    @Param('id') id: string,
    @Body() updateWeeklyOffDto: UpdateWeeklyOffDto,
  ) {
    const staffId = +id;
    const updateForMonth = updateWeeklyOffDto.month;
    const checkWeeklyOff = await this.staffService.findWeeklyOff(
      staffId,
      updateForMonth,
    );
    let data: DeepPartial<StaffWeeklyOff>;
    if (checkWeeklyOff) {
      data = { ...checkWeeklyOff, ...updateWeeklyOffDto };
    } else {
      data = { staff: { id: staffId }, ...updateWeeklyOffDto };
    }
    const weeklyOff = await this.staffService.saveWeeklyOff(data);
    return weeklyOff;
  }

  async updateOnePayroll(staffId: number, updatePayrollDto: UpdatePayrollDto) {
    // const staffId = +id;
    const updateForMonth = updatePayrollDto.month;
    if (!updatePayrollDto.month) {
      const current = this.staffService.getMonthStartAndEnd();
      updatePayrollDto.month = current.monthString;
    }
    let payrollDefault: PayrollDefault;
    const staff = await this.staffService.findOneOrThrow(staffId);
    const checkDefaultPayroll = await this.staffService.findPayrollDefault(
      staff.id,
      updateForMonth,
    );
    if (checkDefaultPayroll) {
      payrollDefault = await this.staffService.savePayrollDefault({
        ...checkDefaultPayroll,
        ...updatePayrollDto,
      });
    } else {
      const specificMonthPayroll = this.getSpecificMonthPayroll(
        staff.payrollDefault,
        updateForMonth,
      );
      delete specificMonthPayroll.id;
      payrollDefault = await this.staffService.savePayrollDefault({
        ...specificMonthPayroll,
        ...updatePayrollDto,
        staff: { id: staff.id },
      });
    }
    let payrollapplied: PayrollApplied;
    // if (_updateForMonth.monthYear <= monthYear) {
    payrollDefault.salary = 0;
    payrollapplied = await this.staffService.createOrUpdatePayrollApplied(
      staff.id,
      updatePayrollDto.month,
      payrollDefault,
    );
    return { payrollDefault, payrollapplied };
  }

  @Patch('payroll/multiple')
  async updateMultiplePayroll(@Body() updatePayrollDto: UpdatePayrollDto) {
    for await (const staffId of updatePayrollDto.staffIds) {
      await this.updateOnePayroll(staffId, updatePayrollDto);
    }
    return {};
  }

  @Patch(':id/payroll')
  async updatePayroll(
    @Param('id') id: string,
    @Body() updatePayrollDto: UpdatePayrollDto,
  ) {
    const staffId = +id;
    const { payrollDefault, payrollapplied } = await this.updateOnePayroll(
      staffId,
      updatePayrollDto,
    );

    // notification
    const staff = await this.staffService.findOne(staffId);
    await this.notificationService.create({
      title: 'Payroll update!',
      type: 'PayrollUpdate',
      description: `Payroll update applied from ${updatePayrollDto.month}`,
      user: staff.user,
    });
    return { payrollDefault, payrollapplied };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    if (updateStaffDto.weekelyOff1 || updateStaffDto.weekelyOff2) {
      const staffId = +id;
      const updateForMonth = updateStaffDto.weeklyOffMonth;
      const checkWeeklyOff = await this.staffService.findWeeklyOff(
        staffId,
        updateForMonth,
      );
      let data: DeepPartial<StaffWeeklyOff>;
      if (checkWeeklyOff) {
        data = {
          ...checkWeeklyOff,
          weeklyOff1: updateStaffDto.weekelyOff1,
          weeklyOff2: updateStaffDto.weekelyOff2,
        };
      } else {
        data = {
          staff: { id: staffId },
          weeklyOff1: updateStaffDto.weekelyOff1,
          weeklyOff2: updateStaffDto.weekelyOff2,
          month: updateStaffDto.weeklyOffMonth,
        };
      }
      const weeklyOff = await this.staffService.saveWeeklyOff(data);
    }
    if (updateStaffDto.organisationId)
      updateStaffDto.organisation = { id: updateStaffDto.organisationId };
    if (updateStaffDto.organisationBranchId)
      updateStaffDto.organisationBranch = {
        id: updateStaffDto.organisationBranchId,
      };
    const updateData = this.staffService.createInstance(updateStaffDto);
    return this.staffService.update(+id, updateData);
  }

  @Delete('attendance/:id')
  removeAttendance(@Param('id') id: string) {
    return this.staffService.removeAttendance(+id);
  }

  @Delete('all')
  removeAll() {
    return this.staffService.removeAll();
  }

  @Delete('all/payroll')
  removeAllPayroll() {
    return this.staffService.removeAllPayroll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }

  async _markAllAttendance(forceRun: boolean = false) {
    if (process.env.LOCAL === 'true' && !forceRun) {
      console.log('Local wont run attendance scheduler');

      return;
    }
    const cronMessage = LogColor.setColor('EVERY_DAY_AT_11PM', LogColor.BgBlue);
    console.log(cronMessage);
    this.logsService.create({
      name: LogTypes.ATTENDANCE,
    });
    const { start, end, weekDay } = this.staffService.getDayStartAndEnd();
    const { monthString } = this.staffService.getMonthStartAndEnd();
    const allAttendanceTypes = await this.staffService.findAllAttendanceTypes();
    const staffList = await this.staffService.findAllWithAttendenceBetween(
      start,
      end,
    );
    const absentType = allAttendanceTypes.find(
      (t) => t.name === attendanceTypes.ABSENT,
    );
    const weeklyOffType = allAttendanceTypes.find(
      (t) => t.name === attendanceTypes.WEEKLY_OFF,
    );
    let attendanceType = absentType;
    for await (const staff of staffList) {
      const checkAttendance = staff.attendance.length !== 0;
      if (checkAttendance) {
        const message = LogColor.setColor(
          `Attendance already done for ${start.toLocaleDateString()} : ${
            staff.name
          }`,
          LogColor.FgBlue,
        );
        console.log(message);
        continue;
      }
      const weeklyOff = this.getSpecificMonthWeeklyOff(
        staff.weeklyOff,
        monthString,
      );
      if (weeklyOff.weeklyOff1 == weekDay || weeklyOff.weeklyOff2 === weekDay) {
        attendanceType = weeklyOffType;
      } else {
        attendanceType = absentType;
      }
      await this.staffService.createAttendance({
        attendanceType,
        staff,
      });
      const message = LogColor.setColor(
        `Attendance done for ${start.toLocaleDateString()} : ${staff.name}`,
        LogColor.BgGreen,
      );
      console.log(message);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async autoAttendance() {
    try {
      await this._markAllAttendance();
    } catch (error) {
      console.log(error);
    }
  }

  // @Cron('1 0 * * *')
  // async updateWeeklyOffTillNow() {
  //   const cronMessage = LogColor.setColor(
  //     'EVERY_DAY_AT_12:01PM',
  //     LogColor.BgBlue,
  //   );
  //   console.log(cronMessage);
  //   this.logsService.create({
  //     name: LogTypes.updateWeeklyOffTillNow,
  //   });
  //   const weekDay = moment().isoWeekday();
  //   const staffList = await this.staffService.findAll();
  //   for await (const staff of staffList) {
  //     if (weekDay === staff.weekelyOff1 || weekDay === staff.weekelyOff2) {
  //       staff.weekelyOffTillNow += 1;
  //     }
  //     await this.staffService.update(staff.id, {
  //       weekelyOffTillNow: staff.weekelyOffTillNow,
  //     });
  //   }
  // }

  // scheduleJob(name: string, date: Date, data: payroll) {
  //   const job = new CronJob(new Date(), () => {
  //     console.warn(`time (${date}) for job ${name} to run!`);
  //     this.staffService.update(data.staff.id, { salary: data.salary });
  //   });
  //   this.schedulerRegistry.addCronJob(name, job);
  //   job.start();
  // }
}
