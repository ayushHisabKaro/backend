import { StaffService } from './staff.service';
import { ConnectStaffDto, CreatePaymentDto, CreateStaffAdvanceDto, CreateStaffDto, PayrollUpdateDto } from './dto/create-staff.dto';
import { UpdateStaffDto, UpdateWeeklyOffDto } from './dto/update-staff.dto';
import { AuthRequest } from '../types/AuthRequest';
import { OrganisationService } from '../organisation/organisation.service';
import Staff from './entities/staff.entity';
import { CreateAttendanceDto, UpdateAttendanceDto } from './dto/create-attendance.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import StaffAttendance from './entities/staffAttendance.entity';
import { LogsService } from 'src/logs/logs.service';
import PayrollApplied from './entities/payrollApplied.entity';
import { AttendanceSummaryOrganisation, AttendanceSummaryStaff, MonthDetails, PayrollAppliedResponse, PayrollSummaryResponse, StaffAdvanceWithPaid, StaffResponse, StaffWithCurrentPayroll } from '../types/responseData.types';
import { Request } from 'express';
import StaffMonthlyAdvance from './entities/staffMonthlyAdvance';
import { DeepPartial, InsertResult, UpdateResult } from 'typeorm';
import StaffAdvance from './entities/staffAdvance.entity';
import PayrollDefault from './entities/payrollDefault.entity';
import { UpdatePayrollDto } from './dto/payroll.dto';
import AttendanceType from './entities/attendanceType.entity';
import StaffMonthlyAdvancePayment from './entities/staffMonthlyAdvancePayment';
import { staffShortByTypes } from '../types/requestData.types';
import StaffWeeklyOff from './entities/staffWeeklyOff.entity';
import { NotificationService } from '../notification/notification.service';
export declare class StaffController {
    private readonly staffService;
    private readonly organisationService;
    private readonly logsService;
    private readonly notificationService;
    private schedulerRegistry;
    constructor(staffService: StaffService, organisationService: OrganisationService, logsService: LogsService, notificationService: NotificationService, schedulerRegistry: SchedulerRegistry);
    makeMonthlyAdvance(advance: StaffAdvance[]): DeepPartial<StaffMonthlyAdvance>[];
    addOneStaff(createStaffDto: CreateStaffDto): Promise<DeepPartial<Staff> & Staff>;
    addStaff(createStaffDto: CreateStaffDto): Promise<DeepPartial<Staff> & Staff>;
    addMultipleStaff(createStaffDtos: CreateStaffDto[]): Promise<Staff[]>;
    create(connectStaffDto: ConnectStaffDto, req: AuthRequest): Promise<DeepPartial<Staff> & Staff>;
    salaruUpdateSchedule(id: string, body: PayrollUpdateDto): Promise<{
        result: string;
    }>;
    createDefaultAttendanceType(): Promise<AttendanceType[]>;
    markAllAttendance(): Promise<void>;
    testAddPayroll(): Promise<void>;
    testAttendanceAdd(): Promise<void>;
    createAttendance(id: string, createAttendanceDto: CreateAttendanceDto, req: AuthRequest): Promise<UpdateResult | InsertResult | {
        message: string;
        code: string;
    }>;
    getRemainingPayment(monthlyAdvance: StaffMonthlyAdvance): number;
    addAdvance(id: string, createStaffAdvanceDtos: CreateStaffAdvanceDto[]): Promise<(DeepPartial<StaffAdvance> & StaffAdvance)[]>;
    payAdvance(createPaymentDto: CreatePaymentDto): Promise<DeepPartial<StaffMonthlyAdvancePayment> & StaffMonthlyAdvancePayment>;
    getStaffByOrganisationBranch(branchId: string, sort: staffShortByTypes): Promise<StaffResponse[]>;
    payrollSummaryFormatAndUpdate(staffList: Staff[], month: MonthDetails, sort: staffShortByTypes): {
        staffListResponse: {
            staff: StaffResponse;
            payrollApplied: {
                month: string;
                id: number;
                staff: Staff;
                salary: number;
                hra: number;
                specialAllowance: number;
                bonus: number;
                nightAllowance: number;
                overTime: number;
                otherAddition: number;
                pf: number;
                esi: number;
                tds: number;
                otherDeduction: number;
                createdAt: Date;
                updatedAt: Date;
                currentSalary?: number;
                advance?: number;
                totalEarnings?: number;
                totalDeduction?: number;
                netAmount?: number;
                advanceDetails?: {
                    advanceAfterThisMonth?: number;
                    pendingTotalAdvance?: number;
                    advanceThisMonth?: number;
                    advancePaidThisMonth?: number;
                };
            };
        }[];
        totalPayableSalary: number;
        totalAdvance: number;
    };
    getStaffPayrollByOrganisationBranch(branchId: string, sort: staffShortByTypes, _start: string, _end: string): Promise<PayrollSummaryResponse>;
    getStaffSummaryByOrganisationBranch(organisationId: string, branchId: string, _start: string, _end: string, filter: string): Promise<AttendanceSummaryOrganisation>;
    getStaffReportByOrganisationBranch(organisationId: string, branchId: string, _start: string, _end: string): Promise<StaffWithCurrentPayroll[]>;
    getStaffDocumentsByOrganisationBranch(organisationId: string, branchId: string): Promise<StaffWithCurrentPayroll[]>;
    getStaffByOrganisation(organisationId: string, branchId: string): Promise<Staff[]>;
    findManyAttendanceBetweenByOrganisation(organisationId: string, branchId: string): Promise<StaffAttendance[]>;
    findAll(req: AuthRequest): Promise<Staff[]>;
    getSpecificMonthPayroll(payroll: PayrollDefault[] | PayrollApplied[], monthString: string): PayrollAppliedResponse;
    getSpecificMonthWeeklyOff(weeklyOff: StaffWeeklyOff[], monthString: string): StaffWeeklyOff;
    calculateAdvance(advance: StaffAdvance[], monthString: string): {
        advanceThisMonth: number;
        advancePaidThisMonth: number;
        pendingAdvanceThisMonth: number;
        advanceAfterThisMonth: number;
        pendingTotalAdvance: number;
    };
    calculateMonthlyPayrollFromDefault(staff: Staff, daysInMonth: number, monthString: string): PayrollAppliedResponse;
    grantedWeeeklyOffTill(staff: Staff, till: Date): number;
    getRequiredPresentOfThisMonth(staff: Staff): number;
    checkRequiredPresentOfThisDay(staff: Staff): boolean;
    getAndUpdateWeeklyOffTillNow(staffId: number): Promise<number>;
    getCarryForwardCountForOne(staff: Staff, till: Date): {
        total: number;
        spent: number;
    };
    getSalary(id: string): Promise<PayrollApplied>;
    findAttendanceBetween(id: string): Promise<StaffAttendance>;
    findAttendanceSummary(id: string, _start: string, _end: string, filter: string): Promise<AttendanceSummaryStaff>;
    findAdvance(id: string): Promise<StaffAdvanceWithPaid[]>;
    findPayrollApplied(id: string, month: string): Promise<PayrollApplied>;
    findOne(id: string, month: string): Promise<{
        staff: StaffResponse;
        payrollApplied: PayrollAppliedResponse;
    }>;
    updateAttendance(id: string, updateAttendanceDto: UpdateAttendanceDto, req: Request): Promise<UpdateResult>;
    updateWeeklyOff(id: string, updateWeeklyOffDto: UpdateWeeklyOffDto): Promise<DeepPartial<StaffWeeklyOff> & StaffWeeklyOff>;
    updateOnePayroll(staffId: number, updatePayrollDto: UpdatePayrollDto): Promise<{
        payrollDefault: PayrollDefault;
        payrollapplied: PayrollApplied;
    }>;
    updateMultiplePayroll(updatePayrollDto: UpdatePayrollDto): Promise<{}>;
    updatePayroll(id: string, updatePayrollDto: UpdatePayrollDto): Promise<{
        payrollDefault: PayrollDefault;
        payrollapplied: PayrollApplied;
    }>;
    update(id: string, updateStaffDto: UpdateStaffDto): Promise<UpdateResult>;
    removeAttendance(id: string): Promise<import("typeorm").DeleteResult>;
    removeAll(): Promise<import("typeorm").DeleteResult>;
    removeAllPayroll(): Promise<{
        payrollDefault: import("typeorm").DeleteResult;
        payrollApplied: import("typeorm").DeleteResult;
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    _markAllAttendance(forceRun?: boolean): Promise<void>;
    autoAttendance(): Promise<void>;
}
