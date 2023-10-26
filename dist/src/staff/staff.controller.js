"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffController = void 0;
const common_1 = require("@nestjs/common");
const staff_service_1 = require("./staff.service");
const create_staff_dto_1 = require("./dto/create-staff.dto");
const update_staff_dto_1 = require("./dto/update-staff.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_guard_1 = require("../auth/role.guard");
const organisation_service_1 = require("../organisation/organisation.service");
const roles_decorator_1 = require("../auth/roles.decorator");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const entity_attribute_types_1 = require("../types/entity.attribute.types");
const schedule_1 = require("@nestjs/schedule");
const LogColour_1 = require("../common/LogColour");
const moment = require("moment");
const logs_service_1 = require("../logs/logs.service");
const response_example_1 = require("../types/response.example");
const dotenv = require("dotenv");
const payroll_dto_1 = require("./dto/payroll.dto");
const utils_1 = require("../common/utils");
const notification_service_1 = require("../notification/notification.service");
dotenv.config();
let StaffController = class StaffController {
    constructor(staffService, organisationService, logsService, notificationService, schedulerRegistry) {
        this.staffService = staffService;
        this.organisationService = organisationService;
        this.logsService = logsService;
        this.notificationService = notificationService;
        this.schedulerRegistry = schedulerRegistry;
    }
    makeMonthlyAdvance(advance) {
        const monthlyAdvanceData = [];
        advance.forEach((sa) => {
            const startMonth = moment(sa.startDate);
            if (sa.sameMonth) {
                const interestAmount = +((sa.amount * sa.interestRate) /
                    100 /
                    12).toFixed(2);
                const amount = +(sa.amount + interestAmount).toFixed(2);
                monthlyAdvanceData.push({
                    amount,
                    month: startMonth.format('YYYY-MM'),
                    staffAdvance: sa,
                });
            }
            else {
                const interestAmount = +((sa.amount * sa.interestRate) /
                    100 /
                    12).toFixed(2);
                const monthlyAmount = +(sa.amount / sa.totalMonths +
                    interestAmount).toFixed(2);
                const totalAmount = monthlyAmount * sa.totalMonths;
                for (let index = 0; index < sa.totalMonths; index++) {
                    const monthString = startMonth.format('YYYY-MM');
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
    async addOneStaff(createStaffDto) {
        const organisation = await this.organisationService.findOneOrThrow(createStaffDto.organisationId);
        let pin;
        if (createStaffDto.userId) {
            createStaffDto.user = { id: createStaffDto.userId };
        }
        else {
            pin = await this.staffService.generateUniqueOTPByOrganisation(createStaffDto.organisationId);
        }
        const advance = await this.staffService.createAdvance(createStaffDto.advance);
        const weeklyOff = await this.staffService.saveWeeklyOff({
            weeklyOff1: createStaffDto.weekelyOff1,
            weeklyOff2: createStaffDto.weekelyOff2,
            month: this.staffService.getMonthStartAndEnd().monthString,
        });
        const monthlyAdvanceData = this.makeMonthlyAdvance(advance);
        const advanceMonthly = await this.staffService.createMonthlyAdvance(monthlyAdvanceData);
        const payrollDefault = await this.staffService.createPayrollDefault({
            salary: createStaffDto.salary,
            month: moment().format('YYYY-MM'),
        });
        const payrollApplied = await this.staffService.createPayrollApplied({
            salary: createStaffDto.salary,
            month: moment().format('YYYY-MM'),
        });
        const staff = await this.staffService.save(Object.assign(Object.assign({}, createStaffDto), { advance,
            organisation, weeklyOff: [weeklyOff], payrollApplied: [payrollApplied], payrollDefault: [payrollDefault], organisationBranch: { id: createStaffDto.organisationBranchId }, pin }));
        if (createStaffDto.userId)
            await this.organisationService.deleteOneOrganisationJoinRequest(staff.organisationBranch.id, staff.user.id);
        return staff;
    }
    async addStaff(createStaffDto) {
        const staff = await this.addOneStaff(createStaffDto);
        return staff;
    }
    async addMultipleStaff(createStaffDtos) {
        var _a, e_1, _b, _c;
        const staffList = [];
        try {
            for (var _d = true, createStaffDtos_1 = __asyncValues(createStaffDtos), createStaffDtos_1_1; createStaffDtos_1_1 = await createStaffDtos_1.next(), _a = createStaffDtos_1_1.done, !_a;) {
                _c = createStaffDtos_1_1.value;
                _d = false;
                try {
                    const createStaffDto = _c;
                    const staff = await this.addOneStaff(createStaffDto);
                    staffList.push(staff);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = createStaffDtos_1.return)) await _b.call(createStaffDtos_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return staffList;
    }
    async create(connectStaffDto, req) {
        const staff = await this.staffService.findOneByOrganisationAndPin(connectStaffDto.organisationId, connectStaffDto.pin);
        if (!staff || staff.user) {
            throw new common_1.BadRequestException('Invalid pin!');
        }
        staff.user = req.user;
        const result = await this.staffService.save(staff);
        return result;
    }
    async salaruUpdateSchedule(id, body) {
        return { result: 'pending' };
    }
    async createDefaultAttendanceType() {
        return await this.staffService.createAttendanceType(Object.values(entity_attribute_types_1.attendanceTypes).map((i) => i));
    }
    async markAllAttendance() {
        return await this._markAllAttendance(true);
    }
    async testAddPayroll() {
        var _a, e_2, _b, _c;
        const staffs = await this.staffService.findAll();
        try {
            for (var _d = true, staffs_1 = __asyncValues(staffs), staffs_1_1; staffs_1_1 = await staffs_1.next(), _a = staffs_1_1.done, !_a;) {
                _c = staffs_1_1.value;
                _d = false;
                try {
                    const s = _c;
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
                finally {
                    _d = true;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = staffs_1.return)) await _b.call(staffs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    async testAttendanceAdd() {
        var _a, e_3, _b, _c;
        await this.staffService.removeAllAttendance();
        let current = moment('2022-12-01');
        let currentDate = current.toDate();
        const attendanceList = [];
        const staffList = await this.staffService.findAll();
        const allAttendanceTypes = await this.staffService.findAllAttendanceTypes();
        const presentType = allAttendanceTypes.find((t) => t.name === entity_attribute_types_1.attendanceTypes.PRESENT);
        const absentType = allAttendanceTypes.find((t) => t.name === entity_attribute_types_1.attendanceTypes.ABSENT);
        const weeklyOffType = allAttendanceTypes.find((t) => t.name === entity_attribute_types_1.attendanceTypes.WEEKLY_OFF);
        while (currentDate < new Date()) {
            const { start, end, weekDay } = this.staffService.getDayStartAndEnd(currentDate);
            const { monthString } = this.staffService.getMonthStartAndEnd(currentDate);
            console.log(start, end, weekDay);
            currentDate = moment(currentDate).add(1, 'day').toDate();
            let attendanceType = absentType;
            try {
                for (var _d = true, staffList_1 = (e_3 = void 0, __asyncValues(staffList)), staffList_1_1; staffList_1_1 = await staffList_1.next(), _a = staffList_1_1.done, !_a;) {
                    _c = staffList_1_1.value;
                    _d = false;
                    try {
                        const staff = _c;
                        if (staff.createdAt > start) {
                            continue;
                        }
                        const checkAttendance = await this.staffService.findOneAttendanceBetween(staff.id, start, end);
                        if (checkAttendance) {
                            const message = LogColour_1.default.setColor(`Attendance already exists for ${start.toLocaleDateString()} : ${staff.user.name}`, LogColour_1.default.FgBlue);
                            console.log(message);
                            continue;
                        }
                        attendanceType = presentType;
                        const weeklyOff = this.getSpecificMonthWeeklyOff(staff.weeklyOff, monthString);
                        if (weeklyOff.weeklyOff1 == weekDay ||
                            weeklyOff.weeklyOff2 === weekDay) {
                            attendanceType = weeklyOffType;
                        }
                        attendanceList.push(this.staffService.createAttendanceInstance({
                            attendanceType,
                            staff,
                            createdAt: start,
                            updatedAt: start,
                        }));
                        const message = LogColour_1.default.setColor(`Attendance done for ${start.toLocaleDateString()} : ${staff.name}`, LogColour_1.default.BgGreen);
                        console.log(message);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = staffList_1.return)) await _b.call(staffList_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        await this.staffService.createManyAttendance(attendanceList);
    }
    async createAttendance(id, createAttendanceDto, req) {
        const { start, end } = this.staffService.getDayStartAndEnd();
        const staff = await this.staffService.findOne(+id);
        const now = new Date();
        const markLateAfter = (0, utils_1.getDateFromTimeString)(staff.markLateAfter);
        const openTime = (0, utils_1.getDateFromTimeString)(staff.openTime);
        const closeTime = (0, utils_1.getDateFromTimeString)(staff.closeTime);
        if (req.user.role.name === entity_attribute_types_1.Roles.EMPLOYEE) {
            console.log(now);
            console.log(openTime);
            console.log(closeTime);
            if (now < openTime || now > closeTime) {
                return {
                    message: 'Not allowed!',
                    code: 'ON_OFFICE_HOURS',
                };
            }
            else if (now > markLateAfter) {
                createAttendanceDto.attendanceType = entity_attribute_types_1.attendanceTypes.LATE_HALF_DAY;
            }
        }
        const attendanceType = await this.staffService.findAttendanceTypeOrThrow(createAttendanceDto.attendanceType);
        const attendanceExists = await this.staffService.findOneAttendanceBetween(+id, start, end);
        let attendance;
        if (attendanceExists) {
            const data = this.staffService.createAttendanceInstance(Object.assign(Object.assign({}, createAttendanceDto), { attendanceType, markedBy: req.user }));
            attendance = await this.staffService.updateAttendance(attendanceExists.id, data);
        }
        else {
            const staff = await this.staffService.findOneOrThrow(+id);
            attendance = await this.staffService.createAttendance(Object.assign(Object.assign({}, createAttendanceDto), { attendanceType,
                staff, markedBy: req.user }));
        }
        return attendance;
    }
    getRemainingPayment(monthlyAdvance) {
        const paymentRequired = monthlyAdvance.amount;
        const paymentDone = monthlyAdvance.monthlyAdvancePayment.reduce((prevValue, currentValue) => prevValue + currentValue.amount, 0);
        return paymentRequired - paymentDone;
    }
    async addAdvance(id, createStaffAdvanceDtos) {
        var _a, e_4, _b, _c;
        const advance = await this.staffService.createAdvance(createStaffAdvanceDtos);
        const monthlyAdvanceData = this.makeMonthlyAdvance(advance);
        const advanceMonthly = await this.staffService.createMonthlyAdvance(monthlyAdvanceData);
        try {
            for (var _d = true, advance_1 = __asyncValues(advance), advance_1_1; advance_1_1 = await advance_1.next(), _a = advance_1_1.done, !_a;) {
                _c = advance_1_1.value;
                _d = false;
                try {
                    const adv = _c;
                    await this.staffService.updateAdvance(adv.id, { staff: { id: +id } });
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = advance_1.return)) await _b.call(advance_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return advance;
    }
    async payAdvance(createPaymentDto) {
        const getPayments = await this.staffService.findOneMonthlyAdvanceWithPayment(createPaymentDto.monthlyAdvanceId);
        const remaimingAmount = this.getRemainingPayment(getPayments);
        if (createPaymentDto.amount > remaimingAmount) {
            throw new common_1.BadRequestException('Payment can not exceed advance amount');
        }
        const payment = await this.staffService.createMonthlyAdvancePayment(Object.assign(Object.assign({}, createPaymentDto), { staffMonthlyAdvance: { id: createPaymentDto.monthlyAdvanceId } }));
        this.staffService
            .findOneMonthlyAdvanceWithPaymentWithUser(createPaymentDto.monthlyAdvanceId)
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
    async getStaffByOrganisationBranch(branchId, sort) {
        const month = this.staffService.getMonthStartAndEnd();
        const staff = await this.staffService.findByOrganisationBranch(+branchId, {
            month: month.monthString,
            sort,
        });
        staff.forEach((s) => {
            const payroll = this.getSpecificMonthPayroll(s.payrollDefault, month.monthString);
            if (payroll) {
                s.salary = payroll.salary;
            }
        });
        if (sort === 'high_to_low_salary') {
            staff.sort((a, b) => b.salary - a.salary);
        }
        else if (sort === 'low_to_high_salary') {
            staff.sort((a, b) => a.salary - b.salary);
        }
        return staff;
    }
    payrollSummaryFormatAndUpdate(staffList, month, sort) {
        let totalPayableSalary = 0;
        let totalAdvance = 0;
        const staffListResponse = staffList.map((staff) => {
            const payroll = this.calculateMonthlyPayrollFromDefault(staff, month.daysInMonth, month.monthString);
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
                payrollApplied: Object.assign(Object.assign({}, payroll), { month: month.monthString }),
            };
        });
        totalAdvance = +totalAdvance.toFixed(2);
        totalPayableSalary = +totalPayableSalary.toFixed(2);
        if (sort === 'high_to_low_salary') {
            staffListResponse.sort((a, b) => b.payrollApplied.salary - a.payrollApplied.salary);
        }
        else if (sort === 'low_to_high_salary') {
            staffListResponse.sort((a, b) => a.payrollApplied.salary - b.payrollApplied.salary);
        }
        return { staffListResponse, totalPayableSalary, totalAdvance };
    }
    async getStaffPayrollByOrganisationBranch(branchId, sort, _start, _end) {
        let thisMonth = this.staffService.getMonthStartAndEnd();
        if (_start && _end) {
            thisMonth = this.staffService.getMonthStartAndEnd(new Date(_end));
        }
        let lastMonth = this.staffService.getMonthStartAndEnd(thisMonth.previousMonth);
        let staffList = await this.staffService.findManyByBranchWithRelations(+branchId, {
            attendance: { start: thisMonth.start, end: thisMonth.end },
            month: thisMonth.monthString,
        });
        let staffListLastMonth = await this.staffService.findManyByBranchWithRelations(+branchId, {
            attendance: { start: lastMonth.start, end: lastMonth.end },
            month: lastMonth.monthString,
        });
        const { staffListResponse, totalPayableSalary, totalAdvance } = this.payrollSummaryFormatAndUpdate(staffList, thisMonth, sort);
        const lastMonthSummary = this.payrollSummaryFormatAndUpdate(staffListLastMonth, lastMonth, sort);
        return {
            staffList: staffListResponse,
            totalPayableSalary,
            totalAdvance,
            lastMonthSummary: Object.assign(Object.assign({}, lastMonthSummary), { staffList: staffListResponse }),
        };
    }
    async getStaffSummaryByOrganisationBranch(organisationId, branchId, _start, _end, filter) {
        let attendance = [];
        let daysInMonth = 0;
        let requiredAttendanceThisMonth = 0;
        let requiredAttendanceThisDay = 0;
        let day;
        if (!_start || !_end) {
            day = this.staffService.getDayStartAndEnd();
        }
        else {
            day = this.staffService.getDayStartAndEnd(new Date(_end));
        }
        const start = day.start;
        const end = day.end;
        console.log(`Attendance Start ${start} End ${end}`);
        daysInMonth = day.daysInMonth;
        const staff = await this.staffService.findByOrganisationBranchWithAttendance(+organisationId, +branchId, start, end);
        const totalWeeklyOff = await this.staffService.findManyAttendanceByType(entity_attribute_types_1.attendanceTypes.WEEKLY_OFF, { branchId: +branchId, end });
        let PRESENT = 0;
        let ABSENT = 0;
        let LATE_HALF_DAY = 0;
        let WEEKLY_OFF = 0;
        let PAID_LEAVE = 0;
        const weeklyOff = { total: 0, spent: totalWeeklyOff.length };
        staff.forEach((i) => {
            weeklyOff.total += this.getCarryForwardCountForOne(i, end).total;
            const monthWeeklyOff = this.getSpecificMonthWeeklyOff(i.weeklyOff, day.monthString);
            const a = i.attendance;
            requiredAttendanceThisMonth += 1;
            requiredAttendanceThisDay += 1;
            const staffData = {
                id: i.id,
                user: i.user,
                name: i.name,
                phoneNumber: i.phoneNumber,
                salaryInterval: i.salaryInterval,
                openTime: i.openTime,
                closeTime: i.closeTime,
                markLateAfter: i.markLateAfter,
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
                a.forEach((j) => {
                    const type = j.attendanceType;
                    if (type.name === 'PRESENT')
                        PRESENT += 1;
                    if (type.name === 'ABSENT')
                        ABSENT += 1;
                    if (type.name === 'LATE_HALF_DAY')
                        LATE_HALF_DAY += 1;
                    if (type.name === 'WEEKLY_OFF')
                        WEEKLY_OFF += 1;
                    if (type.name === 'PAID_LEAVE')
                        PAID_LEAVE += 1;
                    j.staff = staffData;
                    attendance.push(j);
                });
                attendance.sort((a, b) => {
                    if (!a.updatedAt)
                        return 1;
                    if (!b.updatedAt)
                        return -1;
                    return a.updatedAt.getTime() - b.updatedAt.getTime();
                });
            }
            else if (staffCreatedAt <= start) {
                attendance.push(this.staffService.createAttendanceInstance({ staff: staffData }));
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
        if (Object.values(entity_attribute_types_1.attendanceTypes).find((at) => at === filter))
            attendance = attendance.filter((a) => {
                if (a.attendanceType)
                    return a.attendanceType.name === filter;
                else
                    false;
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
    async getStaffReportByOrganisationBranch(organisationId, branchId, _start, _end) {
        let day;
        if (!_start || !_end) {
            day = this.staffService.getDayStartAndEnd();
        }
        else {
            day = {
                start: new Date(_start),
                end: new Date(_end),
            };
        }
        const start = day.start;
        const end = day.end;
        console.log(`Attendance Start ${start} End ${end}`);
        const staff = await this.staffService.findByOrganisationBranchWithAttendanceReport(+organisationId, +branchId, start, end);
        return staff;
    }
    async getStaffDocumentsByOrganisationBranch(organisationId, branchId) {
        let staff = await this.staffService.findDocumentsByOrganisationBranch(+organisationId, +branchId);
        const docs = [];
        staff.map((s) => {
            if (s.user &&
                s.user.resume &&
                s.user.resume.documents &&
                s.user.resume.documents.length) {
                s.user.resume.documents.forEach((d) => {
                    docs.push(Object.assign({ userName: s.user.name || '' }, d));
                });
            }
        });
        return docs;
    }
    async getStaffByOrganisation(organisationId, branchId) {
        const { start, end } = this.staffService.getDayStartAndEnd();
        const staff = await this.staffService.findByOrganisationBranchWithAttendance(+organisationId, +branchId, start, end);
        return staff;
    }
    async findManyAttendanceBetweenByOrganisation(organisationId, branchId) {
        const { start, end } = this.staffService.getDayStartAndEnd();
        const staff = await this.staffService.findManyAttendanceBetweenByOrganisation(+organisationId, +branchId, start, end);
        return staff;
    }
    findAll(req) {
        return this.staffService.findByUser(req.user.id);
    }
    getSpecificMonthPayroll(payroll, monthString) {
        const month = moment(monthString).month();
        const year = moment(monthString).year();
        let salary = payroll[0];
        payroll.forEach((s, i) => {
            const dMonth = moment(s.month).month();
            const dYear = moment(s.month).year();
            if (i < payroll.length - 1) {
                if (monthString === s.month) {
                    salary = s;
                }
            }
            else if (month >= dMonth && year >= dYear) {
                salary = s;
            }
        });
        return salary;
    }
    getSpecificMonthWeeklyOff(weeklyOff, monthString) {
        const month = moment(monthString).month();
        const year = moment(monthString).year();
        let specificWeeklyOff = weeklyOff[0];
        weeklyOff.forEach((s, i) => {
            const dMonth = moment(s.month).month();
            const dYear = moment(s.month).year();
            if (i < weeklyOff.length - 1) {
                if (monthString === s.month) {
                    specificWeeklyOff = s;
                }
            }
            else if (month >= dMonth && year >= dYear) {
                specificWeeklyOff = s;
            }
        });
        return specificWeeklyOff;
    }
    calculateAdvance(advance, monthString) {
        let advanceThisMonth = 0;
        let advancePaidThisMonth = 0;
        let advanceAfterThisMonth = 0;
        let advancePaidAfterThisMonth = 0;
        const mtObj = this.staffService.getMonthStartAndEnd();
        advance.forEach((advance) => {
            advance.monthlyAdvance.forEach((ma) => {
                const maMtObj = this.staffService.getMonthStartAndEnd(new Date(ma.month));
                if (maMtObj.monthYear === mtObj.monthYear) {
                    advanceThisMonth += ma.amount;
                    advancePaidThisMonth += ma.monthlyAdvancePayment.reduce((prev, cur) => prev + cur.amount, 0);
                }
                else if (maMtObj.monthYear > mtObj.monthYear) {
                    advanceAfterThisMonth += ma.amount;
                    advancePaidAfterThisMonth += ma.monthlyAdvancePayment.reduce((prev, cur) => prev + cur.amount, 0);
                }
            });
        });
        const pendingAdvanceThisMonth = +(advanceThisMonth - advancePaidThisMonth).toFixed(2);
        const pendingTotalAdvance = advanceAfterThisMonth;
        return {
            advanceThisMonth,
            advancePaidThisMonth,
            pendingAdvanceThisMonth,
            advanceAfterThisMonth,
            pendingTotalAdvance,
        };
    }
    calculateMonthlyPayrollFromDefault(staff, daysInMonth, monthString) {
        let salary = 0;
        let { advanceThisMonth, advancePaidThisMonth, pendingAdvanceThisMonth, advanceAfterThisMonth, pendingTotalAdvance, } = this.calculateAdvance(staff.advance, monthString);
        let dailySalary = 0;
        let dailyHra = 0;
        const currentPayroll = this.getSpecificMonthPayroll(staff.payrollDefault, monthString);
        const currentSalary = currentPayroll.salary;
        currentPayroll.currentSalary = currentPayroll.salary;
        if (staff.salaryInterval === entity_attribute_types_1.SalaryIntervals.MONTH) {
            dailySalary = currentSalary / daysInMonth;
        }
        else if (staff.salaryInterval === entity_attribute_types_1.SalaryIntervals.DAY) {
            dailySalary = currentSalary;
        }
        else if (staff.salaryInterval === entity_attribute_types_1.SalaryIntervals.WEEK) {
            dailySalary = currentSalary / 7;
        }
        staff.attendance.forEach((i) => {
            const type = i.attendanceType.name;
            if (type === entity_attribute_types_1.attendanceTypes.PRESENT ||
                type === entity_attribute_types_1.attendanceTypes.WEEKLY_OFF ||
                type === entity_attribute_types_1.attendanceTypes.PAID_LEAVE) {
                salary += dailySalary;
            }
            else if (type === entity_attribute_types_1.attendanceTypes.PRESENT_PLUS_FULL_OVERTIME) {
                salary += dailySalary;
                currentPayroll.overTime += dailySalary;
            }
            else if (type === entity_attribute_types_1.attendanceTypes.PRESENT_PLUS_HALF_OVERTIME) {
                salary += dailySalary;
                currentPayroll.overTime += dailySalary / 2;
            }
        });
        currentPayroll.salary = salary;
        currentPayroll.advance = pendingAdvanceThisMonth;
        const addition = currentPayroll.hra +
            currentPayroll.specialAllowance +
            currentPayroll.bonus +
            currentPayroll.nightAllowance +
            currentPayroll.overTime +
            currentPayroll.otherAddition;
        const deduction = currentPayroll.advance +
            currentPayroll.pf +
            currentPayroll.esi +
            currentPayroll.tds +
            currentPayroll.otherDeduction;
        currentPayroll.totalEarnings = currentPayroll.salary + addition;
        currentPayroll.totalDeduction = deduction;
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
    grantedWeeeklyOffTill(staff, till) {
        const current = moment(staff.createdAt);
        const now = till ? till : moment().toDate();
        let grantedWeeeklyOffTillNow = 0;
        while (current.toDate() <= now) {
            const cw = current.isoWeekday();
            const { monthString } = this.staffService.getMonthStartAndEnd(current.toDate());
            const weeklyOff = this.getSpecificMonthWeeklyOff(staff.weeklyOff, monthString);
            if (cw === weeklyOff.weeklyOff1 || cw === weeklyOff.weeklyOff2) {
                grantedWeeeklyOffTillNow++;
            }
            current.add(1, 'day');
        }
        return grantedWeeeklyOffTillNow;
    }
    getRequiredPresentOfThisMonth(staff) {
        let requiredPresent = 0;
        let { start, end, monthString } = this.staffService.getMonthStartAndEnd();
        const weeklyOff = this.getSpecificMonthWeeklyOff(staff.weeklyOff, monthString);
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
    checkRequiredPresentOfThisDay(staff) {
        let { start, monthString } = this.staffService.getDayStartAndEnd();
        const weeklyOff = this.getSpecificMonthWeeklyOff(staff.weeklyOff, monthString);
        const current = moment(start).isoWeekday();
        if (current === weeklyOff.weeklyOff1 || current === weeklyOff.weeklyOff2) {
            return false;
        }
        return true;
    }
    async getAndUpdateWeeklyOffTillNow(staffId) {
        const weeklyOffs = await this.staffService.findManyAttendanceByType(entity_attribute_types_1.attendanceTypes.WEEKLY_OFF, { staffId });
        const spent = weeklyOffs.length;
        return spent;
    }
    getCarryForwardCountForOne(staff, till) {
        const grantedWeeklyOffTillNow = this.grantedWeeeklyOffTill(staff, till);
        const spent = staff.weekelyOffTillNow;
        return { total: grantedWeeklyOffTillNow, spent };
    }
    async getSalary(id) {
        const { start, end, daysInMonth, monthString } = this.staffService.getMonthStartAndEnd();
        const staff = await this.staffService.findOneOrThrow(+id);
        staff.attendance = await this.staffService.findManyAttendanceBetween(staff.id, start, end);
        const salary = this.calculateMonthlyPayrollFromDefault(staff, daysInMonth, monthString);
        return salary;
    }
    async findAttendanceBetween(id) {
        const { start, end } = this.staffService.getDayStartAndEnd();
        const result = await this.staffService.findManyAttendanceBetween(+id, start, end);
        const attendance = result.length > 0 ? result[0] : null;
        return attendance;
    }
    async findAttendanceSummary(id, _start, _end, filter) {
        const staff = await this.staffService.findOneOrThrow(+id);
        let { start, end, daysInMonth } = this.staffService.getMonthStartAndEnd();
        if (_start && _end) {
            start = _start;
            end = _end;
        }
        const weeklyOff = this.getCarryForwardCountForOne(staff, end);
        let attendance = await this.staffService.findManyAttendanceBetween(+id, new Date(start), new Date(end));
        let PRESENT = 0;
        let ABSENT = 0;
        let LATE_HALF_DAY = 0;
        let WEEKLY_OFF = 0;
        let PAID_LEAVE = 0;
        staff.attendance = attendance;
        const requiredAttendanceThisMonth = attendance.length;
        attendance.forEach((a) => {
            const type = a.attendanceType;
            if (type.name === 'PRESENT')
                PRESENT += 1;
            if (type.name === 'ABSENT')
                ABSENT += 1;
            if (type.name === 'LATE_HALF_DAY')
                LATE_HALF_DAY += 1;
            if (type.name === 'WEEKLY_OFF')
                WEEKLY_OFF += 1;
            if (type.name === 'PAID_LEAVE')
                PAID_LEAVE += 1;
        });
        weeklyOff.spent = WEEKLY_OFF;
        weeklyOff.total = requiredAttendanceThisMonth;
        if (Object.values(entity_attribute_types_1.attendanceTypes).find((at) => at === filter))
            attendance = attendance.filter((a) => {
                if (a.attendanceType)
                    return a.attendanceType.name === filter;
                else
                    false;
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
    async findAdvance(id) {
        const { monthString, monthYear, start } = this.staffService.getMonthStartAndEnd();
        const advance = await this.staffService.findAdvanceWithPayment(+id);
        advance.forEach((adv) => {
            adv.monthlyAdvance.forEach((mAdv) => {
                let total = 0;
                const advMonth = this.staffService.getMonthStartAndEnd(moment(mAdv.month).toDate());
                mAdv.paid = false;
                if (advMonth.monthYear < monthYear) {
                    mAdv.paid = true;
                    mAdv.paidAmount = mAdv.amount;
                }
                else {
                    total = mAdv.monthlyAdvancePayment.reduce((prev, next) => prev + next.amount, 0);
                    if (total >= mAdv.amount)
                        mAdv.paid = true;
                }
                mAdv.paidAmount = total;
                if (advMonth.monthYear > monthYear && !adv.nextDue) {
                    adv.nextDue = mAdv.month;
                }
            });
            adv.totalAmount = adv.monthlyAdvance.reduce((prev, next) => prev + next.amount, 0);
            adv.paidAmount = adv.monthlyAdvance.reduce((prev, next) => prev + next.paidAmount, 0);
            adv.pendingAmount = adv.totalAmount - adv.paidAmount;
        });
        return advance;
    }
    async findPayrollApplied(id, month) {
        let payroll = await this.staffService.findPayrollApplied(+id, month);
        if (!payroll) {
            const payrollDefault = await this.staffService.findAllPayrollDefault(+id);
            payroll = this.getSpecificMonthPayroll(payrollDefault, month);
        }
        return payroll;
    }
    async findOne(id, month) {
        const _month = month ? moment(month).toDate() : undefined;
        let { start, end, daysInMonth, monthString } = this.staffService.getMonthStartAndEnd(_month);
        if (_month)
            end = moment(_month).endOf('day').toDate();
        const staff = await this.staffService.findOneWithRelations(+id, {
            attendance: { start, end },
        });
        const payroll = this.calculateMonthlyPayrollFromDefault(staff, daysInMonth, monthString);
        const weeklyoff = this.getSpecificMonthWeeklyOff(staff.weeklyOff, monthString);
        staff.weeklyOff1 = weeklyoff.weeklyOff1;
        staff.weeklyOff2 = weeklyoff.weeklyOff2;
        staff.salary = payroll.currentSalary;
        staff.hra = payroll.hra;
        this.staffService
            .createOrUpdatePayrollApplied(staff.id, monthString, payroll)
            .then((res) => console.log(res));
        return { staff, payrollApplied: Object.assign(Object.assign({}, payroll), { month: monthString }) };
    }
    async updateAttendance(id, updateAttendanceDto, req) {
        const attendanceType = await this.staffService.findAttendanceTypeOrThrow(updateAttendanceDto.attendanceType);
        const data = this.staffService.createAttendanceInstance(Object.assign(Object.assign({}, updateAttendanceDto), { attendanceType, markedBy: req.user }));
        const attendance = await this.staffService.updateAttendance(+id, data);
        return attendance;
    }
    async updateWeeklyOff(id, updateWeeklyOffDto) {
        const staffId = +id;
        const updateForMonth = updateWeeklyOffDto.month;
        const checkWeeklyOff = await this.staffService.findWeeklyOff(staffId, updateForMonth);
        let data;
        if (checkWeeklyOff) {
            data = Object.assign(Object.assign({}, checkWeeklyOff), updateWeeklyOffDto);
        }
        else {
            data = Object.assign({ staff: { id: staffId } }, updateWeeklyOffDto);
        }
        const weeklyOff = await this.staffService.saveWeeklyOff(data);
        return weeklyOff;
    }
    async updateOnePayroll(staffId, updatePayrollDto) {
        const updateForMonth = updatePayrollDto.month;
        if (!updatePayrollDto.month) {
            const current = this.staffService.getMonthStartAndEnd();
            updatePayrollDto.month = current.monthString;
        }
        let payrollDefault;
        const staff = await this.staffService.findOneOrThrow(staffId);
        const checkDefaultPayroll = await this.staffService.findPayrollDefault(staff.id, updateForMonth);
        if (checkDefaultPayroll) {
            payrollDefault = await this.staffService.savePayrollDefault(Object.assign(Object.assign({}, checkDefaultPayroll), updatePayrollDto));
        }
        else {
            const specificMonthPayroll = this.getSpecificMonthPayroll(staff.payrollDefault, updateForMonth);
            delete specificMonthPayroll.id;
            payrollDefault = await this.staffService.savePayrollDefault(Object.assign(Object.assign(Object.assign({}, specificMonthPayroll), updatePayrollDto), { staff: { id: staff.id } }));
        }
        let payrollapplied;
        payrollDefault.salary = 0;
        payrollapplied = await this.staffService.createOrUpdatePayrollApplied(staff.id, updatePayrollDto.month, payrollDefault);
        return { payrollDefault, payrollapplied };
    }
    async updateMultiplePayroll(updatePayrollDto) {
        var _a, e_5, _b, _c;
        try {
            for (var _d = true, _e = __asyncValues(updatePayrollDto.staffIds), _f; _f = await _e.next(), _a = _f.done, !_a;) {
                _c = _f.value;
                _d = false;
                try {
                    const staffId = _c;
                    await this.updateOnePayroll(staffId, updatePayrollDto);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return {};
    }
    async updatePayroll(id, updatePayrollDto) {
        const staffId = +id;
        const { payrollDefault, payrollapplied } = await this.updateOnePayroll(staffId, updatePayrollDto);
        const staff = await this.staffService.findOne(staffId);
        await this.notificationService.create({
            title: 'Payroll update!',
            type: 'PayrollUpdate',
            description: `Payroll update applied from ${updatePayrollDto.month}`,
            user: staff.user,
        });
        return { payrollDefault, payrollapplied };
    }
    async update(id, updateStaffDto) {
        if (updateStaffDto.weekelyOff1 || updateStaffDto.weekelyOff2) {
            const staffId = +id;
            const updateForMonth = updateStaffDto.weeklyOffMonth;
            const checkWeeklyOff = await this.staffService.findWeeklyOff(staffId, updateForMonth);
            let data;
            if (checkWeeklyOff) {
                data = Object.assign(Object.assign({}, checkWeeklyOff), { weeklyOff1: updateStaffDto.weekelyOff1, weeklyOff2: updateStaffDto.weekelyOff2 });
            }
            else {
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
    removeAttendance(id) {
        return this.staffService.removeAttendance(+id);
    }
    removeAll() {
        return this.staffService.removeAll();
    }
    removeAllPayroll() {
        return this.staffService.removeAllPayroll();
    }
    remove(id) {
        return this.staffService.remove(+id);
    }
    async _markAllAttendance(forceRun = false) {
        var _a, e_6, _b, _c;
        if (process.env.LOCAL === 'true' && !forceRun) {
            console.log('Local wont run attendance scheduler');
            return;
        }
        const cronMessage = LogColour_1.default.setColor('EVERY_DAY_AT_11PM', LogColour_1.default.BgBlue);
        console.log(cronMessage);
        this.logsService.create({
            name: entity_attribute_types_1.LogTypes.ATTENDANCE,
        });
        const { start, end, weekDay } = this.staffService.getDayStartAndEnd();
        const { monthString } = this.staffService.getMonthStartAndEnd();
        const allAttendanceTypes = await this.staffService.findAllAttendanceTypes();
        const staffList = await this.staffService.findAllWithAttendenceBetween(start, end);
        const absentType = allAttendanceTypes.find((t) => t.name === entity_attribute_types_1.attendanceTypes.ABSENT);
        const weeklyOffType = allAttendanceTypes.find((t) => t.name === entity_attribute_types_1.attendanceTypes.WEEKLY_OFF);
        let attendanceType = absentType;
        try {
            for (var _d = true, staffList_2 = __asyncValues(staffList), staffList_2_1; staffList_2_1 = await staffList_2.next(), _a = staffList_2_1.done, !_a;) {
                _c = staffList_2_1.value;
                _d = false;
                try {
                    const staff = _c;
                    const checkAttendance = staff.attendance.length !== 0;
                    if (checkAttendance) {
                        const message = LogColour_1.default.setColor(`Attendance already done for ${start.toLocaleDateString()} : ${staff.name}`, LogColour_1.default.FgBlue);
                        console.log(message);
                        continue;
                    }
                    const weeklyOff = this.getSpecificMonthWeeklyOff(staff.weeklyOff, monthString);
                    if (weeklyOff.weeklyOff1 == weekDay || weeklyOff.weeklyOff2 === weekDay) {
                        attendanceType = weeklyOffType;
                    }
                    else {
                        attendanceType = absentType;
                    }
                    await this.staffService.createAttendance({
                        attendanceType,
                        staff,
                    });
                    const message = LogColour_1.default.setColor(`Attendance done for ${start.toLocaleDateString()} : ${staff.name}`, LogColour_1.default.BgGreen);
                    console.log(message);
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = staffList_2.return)) await _b.call(staffList_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
    }
    async autoAttendance() {
        try {
            await this._markAllAttendance();
        }
        catch (error) {
            console.log(error);
        }
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)('organisation'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreateStaffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "addStaff", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)('organisation/multiple'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "addMultipleStaff", null);
__decorate([
    (0, common_1.Post)('connect'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.ConnectStaffDto, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Post)(':id/salary/update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_staff_dto_1.PayrollUpdateDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "salaruUpdateSchedule", null);
__decorate([
    (0, common_1.Post)('defaultAttendanceTypes/add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "createDefaultAttendanceType", null);
__decorate([
    (0, common_1.Post)('markAllAttendance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "markAllAttendance", null);
__decorate([
    (0, common_1.Post)('test/payroll/add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "testAddPayroll", null);
__decorate([
    (0, common_1.Post)('test/attendnace/add'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "testAttendanceAdd", null);
__decorate([
    (0, common_1.Post)(':id/attendance'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_attendance_dto_1.CreateAttendanceDto, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "createAttendance", null);
__decorate([
    (0, common_1.Post)(':id/advance'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "addAdvance", null);
__decorate([
    (0, common_1.Post)('advance/pay'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "payAdvance", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Get)('organisation/branch/:branchId'),
    __param(0, (0, common_1.Param)('branchId')),
    __param(1, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffByOrganisationBranch", null);
__decorate([
    (0, common_1.Get)('organisation/branch/:branchId/payroll/summary'),
    __param(0, (0, common_1.Param)('branchId')),
    __param(1, (0, common_1.Query)('filter')),
    __param(2, (0, common_1.Query)('start')),
    __param(3, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffPayrollByOrganisationBranch", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Get)('organisation/:organisationId/branch/:branchId/summary'),
    __param(0, (0, common_1.Param)('organisationId')),
    __param(1, (0, common_1.Param)('branchId')),
    __param(2, (0, common_1.Query)('start')),
    __param(3, (0, common_1.Query)('end')),
    __param(4, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffSummaryByOrganisationBranch", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Get)('organisation/:organisationId/branch/:branchId/report'),
    __param(0, (0, common_1.Param)('organisationId')),
    __param(1, (0, common_1.Param)('branchId')),
    __param(2, (0, common_1.Query)('start')),
    __param(3, (0, common_1.Query)('end')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffReportByOrganisationBranch", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Get)('organisation/:organisationId/branch/:branchId/documents'),
    __param(0, (0, common_1.Param)('organisationId')),
    __param(1, (0, common_1.Param)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffDocumentsByOrganisationBranch", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Get)('all/organisation/:organisationId/branch/:branchId'),
    __param(0, (0, common_1.Param)('organisationId')),
    __param(1, (0, common_1.Param)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getStaffByOrganisation", null);
__decorate([
    (0, roles_decorator_1.Roles)('BUSINESS'),
    (0, common_1.Get)('organisation/:organisationId/branch/:branchId/attendance/today'),
    __param(0, (0, common_1.Param)('organisationId')),
    __param(1, (0, common_1.Param)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findManyAttendanceBetweenByOrganisation", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/salary'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "getSalary", null);
__decorate([
    (0, common_1.Get)(':id/attendance/today'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findAttendanceBetween", null);
__decorate([
    (0, swagger_1.ApiResponse)({ schema: { example: response_example_1.R_staff_summary } }),
    (0, common_1.Get)(':id/attendance/summary'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('filter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findAttendanceSummary", null);
__decorate([
    (0, common_1.Get)(':id/advance'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findAdvance", null);
__decorate([
    (0, common_1.Get)(':id/payroll/applied/:month'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findPayrollApplied", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('attendance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_attendance_dto_1.UpdateAttendanceDto, Object]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updateAttendance", null);
__decorate([
    (0, common_1.Patch)(':id/weeklyOff'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_staff_dto_1.UpdateWeeklyOffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updateWeeklyOff", null);
__decorate([
    (0, common_1.Patch)('payroll/multiple'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_dto_1.UpdatePayrollDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updateMultiplePayroll", null);
__decorate([
    (0, common_1.Patch)(':id/payroll'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_dto_1.UpdatePayrollDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "updatePayroll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_staff_dto_1.UpdateStaffDto]),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('attendance/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "removeAttendance", null);
__decorate([
    (0, common_1.Delete)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "removeAll", null);
__decorate([
    (0, common_1.Delete)('all/payroll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "removeAllPayroll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StaffController.prototype, "remove", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_11PM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StaffController.prototype, "autoAttendance", null);
StaffController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('staff'),
    (0, common_1.Controller)('staff'),
    __metadata("design:paramtypes", [staff_service_1.StaffService,
        organisation_service_1.OrganisationService,
        logs_service_1.LogsService,
        notification_service_1.NotificationService,
        schedule_1.SchedulerRegistry])
], StaffController);
exports.StaffController = StaffController;
//# sourceMappingURL=staff.controller.js.map