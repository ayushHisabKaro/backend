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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const attendanceType_entity_1 = require("./entities/attendanceType.entity");
const payrollApplied_entity_1 = require("./entities/payrollApplied.entity");
const staff_entity_1 = require("./entities/staff.entity");
const staffAdvance_entity_1 = require("./entities/staffAdvance.entity");
const staffAttendance_entity_1 = require("./entities/staffAttendance.entity");
const staffMonthlyAdvance_1 = require("./entities/staffMonthlyAdvance");
const payrollDefault_entity_1 = require("./entities/payrollDefault.entity");
const staffMonthlyAdvancePayment_1 = require("./entities/staffMonthlyAdvancePayment");
const staffWeeklyOff_entity_1 = require("./entities/staffWeeklyOff.entity");
const utils_1 = require("../common/utils");
let StaffService = class StaffService {
    constructor(staffRepository, staffAdvanceRepository, staffMonthlyAdvanceRepository, staffMonthlyAdvancePaymentRepository, staffAttendanceRepository, attendanceTypeRepository, payrollAppliedRepository, payrollDefaultRepository, staffWeeklyOffRepository) {
        this.staffRepository = staffRepository;
        this.staffAdvanceRepository = staffAdvanceRepository;
        this.staffMonthlyAdvanceRepository = staffMonthlyAdvanceRepository;
        this.staffMonthlyAdvancePaymentRepository = staffMonthlyAdvancePaymentRepository;
        this.staffAttendanceRepository = staffAttendanceRepository;
        this.attendanceTypeRepository = attendanceTypeRepository;
        this.payrollAppliedRepository = payrollAppliedRepository;
        this.payrollDefaultRepository = payrollDefaultRepository;
        this.staffWeeklyOffRepository = staffWeeklyOffRepository;
    }
    create(data) {
        return this.staffRepository.save(data);
    }
    save(data) {
        return this.staffRepository.save(data);
    }
    insert(data) {
        return this.staffRepository.insert(data);
    }
    async createAdvance(data) {
        return await this.staffAdvanceRepository.save(data);
    }
    async createMonthlyAdvance(data) {
        return await this.staffMonthlyAdvanceRepository.save(data);
    }
    async createMonthlyAdvancePayment(data) {
        return await this.staffMonthlyAdvancePaymentRepository.save(data);
    }
    async findAdvanceWithPayment(staffId, month) {
        let advance = this.staffAdvanceRepository
            .createQueryBuilder('staffAdvance')
            .leftJoinAndSelect('staffAdvance.monthlyAdvance', 'monthlyAdvance')
            .leftJoinAndSelect('monthlyAdvance.monthlyAdvancePayment', 'monthlyAdvancePayment')
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
    async findMonthlyAdvanceWithPayment(staffId, month) {
        return await this.staffMonthlyAdvanceRepository
            .createQueryBuilder('monthlyAdvance')
            .leftJoinAndSelect('monthlyAdvance.staffAdvance', 'staffAdvance')
            .leftJoinAndSelect('monthlyAdvance.monthlyAdvancePayment', 'monthlyAdvancePayment')
            .where('staffAdvance.staff = :staffId', {
            staffId,
        })
            .andWhere('monthlyAdvance.month = :month', {
            month,
        })
            .getMany();
    }
    async findOneMonthlyAdvanceWithPayment(staffMonthlyAdvanceId) {
        return await this.staffMonthlyAdvanceRepository
            .createQueryBuilder('staffMonthlyAdvance')
            .leftJoinAndSelect('staffMonthlyAdvance.monthlyAdvancePayment', 'monthlyAdvancePayment')
            .where('staffMonthlyAdvance.id = :staffMonthlyAdvanceId', {
            staffMonthlyAdvanceId,
        })
            .getOne();
    }
    async findOneMonthlyAdvanceWithPaymentWithUser(staffMonthlyAdvanceId) {
        return await this.staffMonthlyAdvanceRepository
            .createQueryBuilder('staffMonthlyAdvance')
            .leftJoinAndSelect('staffMonthlyAdvance.monthlyAdvancePayment', 'monthlyAdvancePayment')
            .leftJoinAndSelect('staffMonthlyAdvance.staffAdvance', 'staffAdvance')
            .leftJoinAndSelect('staffAdvance.staff', 'staff')
            .leftJoinAndSelect('staff.user', 'user')
            .where('staffMonthlyAdvance.id = :staffMonthlyAdvanceId', {
            staffMonthlyAdvanceId,
        })
            .getOne();
    }
    createInstance(data) {
        const staff = this.staffRepository.create(data);
        return staff;
    }
    createAttendanceInstance(data) {
        const attendance = this.staffAttendanceRepository.create(data);
        return attendance;
    }
    async createAttendance(data) {
        const attendance = await this.staffAttendanceRepository.insert(data);
        return attendance;
    }
    async createManyAttendance(data) {
        const attendance = await this.staffAttendanceRepository.insert(data);
        return attendance;
    }
    async updateAttendance(id, data) {
        data.updatedAt = new Date();
        const attendance = await this.staffAttendanceRepository.update(id, data);
        return attendance;
    }
    async updateAdvance(id, data) {
        return await this.staffAdvanceRepository.update(id, data);
    }
    async createAttendanceType(types) {
        const attendanceTypes = types.map((type) => this.attendanceTypeRepository.create({ name: type }));
        return await this.attendanceTypeRepository.save(attendanceTypes);
    }
    async findWeeklyOff(staffId, month) {
        return await this.staffWeeklyOffRepository
            .createQueryBuilder('weeklyOdd')
            .where('weeklyOdd.staff = :staffId', { staffId })
            .andWhere('weeklyOdd.month = :month', { month })
            .getOne();
    }
    async saveWeeklyOff(data) {
        return await this.staffWeeklyOffRepository.save(data);
    }
    async createPayrollDefault(data) {
        return await this.payrollDefaultRepository.save(data);
    }
    async createPayrollApplied(data) {
        return await this.payrollAppliedRepository.save(data);
    }
    async findPayrollApplied(staffId, month) {
        return await this.payrollAppliedRepository
            .createQueryBuilder('payrollApplied')
            .where('payrollApplied.staff = :staffId', { staffId })
            .andWhere('payrollApplied.month = :month', { month })
            .getOne();
    }
    async findPayrollDefault(staffId, month) {
        return await this.payrollDefaultRepository
            .createQueryBuilder('payrollDefault')
            .where('payrollDefault.staff = :staffId', { staffId })
            .andWhere('payrollDefault.month = :month', { month })
            .getOne();
    }
    async findAllPayrollDefault(staffId) {
        return await this.payrollDefaultRepository
            .createQueryBuilder('payrollDefault')
            .where('payrollDefault.staff = :staffId', { staffId })
            .getMany();
    }
    async savePayrollDefault(data) {
        const result = await this.payrollDefaultRepository.save(data);
        return result;
    }
    async savePayrollApplied(data) {
        const result = await this.payrollAppliedRepository.save(data);
        return result;
    }
    async createOrUpdatePayrollApplied(staffId, month, data) {
        let payroll;
        const checkPayroll = await this.findPayrollApplied(staffId, month);
        if (checkPayroll) {
            delete data.month;
            payroll = await this.payrollAppliedRepository.save(Object.assign(Object.assign({}, checkPayroll), data));
        }
        else {
            payroll = await this.payrollAppliedRepository.save(Object.assign(Object.assign({}, data), { staff: { id: staffId } }));
        }
        return payroll;
    }
    async createOrUpdatePayrollDefault(staffId, month, data) {
        let payroll;
        const checkPayroll = await this.findPayrollDefault(staffId, month);
        if (checkPayroll) {
            payroll = await this.payrollDefaultRepository.save(Object.assign(Object.assign({}, checkPayroll), data));
        }
        else {
            payroll = await this.payrollAppliedRepository.save(Object.assign(Object.assign({}, data), { staff: { id: staffId } }));
        }
        return payroll;
    }
    async findByUser(userId) {
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
    async findAllWithAttendenceBetween(start, end) {
        return await this.staffRepository
            .createQueryBuilder('staff')
            .leftJoinAndSelect('staff.user', 'user')
            .leftJoinAndSelect('staff.weeklyOff', 'weeklyOff')
            .leftJoinAndSelect('staff.attendance', 'attendance', 'attendance.createdAt BETWEEN :start AND :end', {
            start,
            end,
        })
            .getMany();
    }
    async findAttendanceType(type) {
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
            throw new common_1.BadRequestException('Invalid attendance type');
        }
        return result;
    }
    async findAttendanceTypeOrThrow(type) {
        const result = await this.attendanceTypeRepository
            .createQueryBuilder('attendanceType')
            .where('attendanceType.name = :type', { type })
            .getOne();
        if (!result) {
            throw new common_1.BadRequestException('Invalid attendance type');
        }
        return result;
    }
    async findManyAttendance(staffId) {
        return await this.staffAttendanceRepository
            .createQueryBuilder('staffAttendance')
            .where('staffAttendance.staff = :staffId', { staffId })
            .getMany();
    }
    async findManyAttendanceByType(name, options) {
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
    async findManyAttendanceBetweenByOrganisation(organisationId, branchId, start, end) {
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
    async findManyAttendanceBetween(staffId, start, end) {
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
    async findOneAttendanceBetween(staffId, start, end) {
        return await this.staffAttendanceRepository
            .createQueryBuilder('staffAttendance')
            .where('staffAttendance.staff = :staffId', { staffId })
            .andWhere('staffAttendance.createdAt BETWEEN :start AND :end', {
            start,
            end,
        })
            .getOne();
    }
    async findByOrganisationBranch(organisationBranch, filter) {
        return await this.staffRepository
            .createQueryBuilder('staff')
            .where('staff.organisationBranch = :organisationBranch', {
            organisationBranch,
        })
            .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
            .leftJoinAndSelect('staff.user', 'user')
            .getMany();
    }
    async findByOrganisationBranchWithAttendance(organisationId, branchId, start, end) {
        const staff = this.staffRepository
            .createQueryBuilder('staff')
            .leftJoinAndSelect('staff.user', 'user')
            .leftJoinAndSelect('staff.weeklyOff', 'weeklyOff')
            .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
            .leftJoinAndSelect('staff.payrollApplied', 'payrollApplied')
            .leftJoinAndSelect('staff.attendance', 'attendance', 'attendance.createdAt BETWEEN :start AND :end', {
            start,
            end,
        })
            .leftJoinAndSelect('attendance.attendanceType', 'attendanceType')
            .leftJoinAndSelect('attendance.markedBy', 'markedBy')
            .where('staff.organisation = :organisationId', { organisationId })
            .andWhere('staff.organisationBranch = :branchId', { branchId });
        const result = await staff.getMany();
        return result;
    }
    async findByOrganisationBranchWithAttendanceReport(organisationId, branchId, start, end) {
        const staff = this.staffRepository
            .createQueryBuilder('staff')
            .leftJoinAndSelect('staff.user', 'user')
            .leftJoinAndSelect('staff.attendance', 'attendance', 'attendance.createdAt BETWEEN :start AND :end', {
            start,
            end,
        })
            .leftJoinAndSelect('attendance.attendanceType', 'attendanceType')
            .leftJoinAndSelect('attendance.markedBy', 'markedBy')
            .where('staff.organisation = :organisationId', { organisationId })
            .andWhere('staff.organisationBranch = :branchId', { branchId });
        const result = await staff.getMany();
        return result;
    }
    async findDocumentsByOrganisationBranch(organisationId, branchId) {
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
    async findOne(id) {
        return await this.staffRepository
            .createQueryBuilder('staff')
            .leftJoinAndSelect('staff.user', 'user')
            .leftJoinAndSelect('staff.advance', 'advance')
            .leftJoinAndSelect('advance.monthlyAdvance', 'monthlyAdvance')
            .where('staff.id = :id', { id })
            .getOne();
    }
    async findOneWithRelations(id, options) {
        let result = this.staffRepository
            .createQueryBuilder('staff')
            .leftJoinAndSelect('staff.organisationBranch', 'organisationBranch')
            .leftJoinAndSelect('staff.weeklyOff', 'weeklyOff')
            .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
            .leftJoinAndSelect('staff.payrollApplied', 'payrollApplied')
            .leftJoinAndSelect('staff.advance', 'advance')
            .leftJoinAndSelect('advance.monthlyAdvance', 'monthlyAdvance')
            .leftJoinAndSelect('monthlyAdvance.monthlyAdvancePayment', 'monthlyAdvancePayment');
        if (options && options.attendance) {
            result.leftJoinAndSelect('staff.attendance', 'attendance', 'attendance.createdAt BETWEEN :start AND :end', {
                start: options.attendance.start,
                end: options.attendance.end,
            });
        }
        else {
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
    async findManyByBranchWithRelations(branchId, options) {
        let result = this.staffRepository
            .createQueryBuilder('staff')
            .leftJoinAndSelect('staff.user', 'user')
            .leftJoinAndSelect('staff.payrollDefault', 'payrollDefault')
            .leftJoinAndSelect('staff.payrollApplied', 'payrollApplied', 'payrollApplied.month = :month', { month: options.month })
            .leftJoinAndSelect('staff.advance', 'advance')
            .leftJoinAndSelect('advance.monthlyAdvance', 'monthlyAdvance')
            .leftJoinAndSelect('monthlyAdvance.monthlyAdvancePayment', 'monthlyAdvancePayment');
        if (options && options.attendance) {
            result.leftJoinAndSelect('staff.attendance', 'attendance', 'attendance.createdAt BETWEEN :start AND :end', {
                start: options.attendance.start,
                end: options.attendance.end,
            });
        }
        else {
            result.leftJoinAndSelect('staff.attendance', 'attendance');
        }
        result.leftJoinAndSelect('attendance.attendanceType', 'attendanceType');
        result.andWhere('staff.organisationBranch = :branchId', { branchId });
        result = await result.getMany();
        return result;
    }
    async findOneOrThrow(id) {
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
            throw new common_1.BadRequestException('Invalid staff');
        }
        return result;
    }
    async findOneByOrganisationAndPin(organisationId, pin) {
        const staff = await this.staffRepository
            .createQueryBuilder('staff')
            .leftJoinAndSelect('staff.user', 'user')
            .where('staff.organisation = :organisationId', { organisationId })
            .andWhere('staff.pin = :pin', { pin })
            .getOne();
        return staff;
    }
    update(id, data) {
        if (!Object.values(data).length)
            return;
        return this.staffRepository.update(id, data);
    }
    remove(id) {
        return this.staffRepository.delete(id);
    }
    async removeAll() {
        return await this.staffRepository.delete({});
    }
    async removeAllAttendance() {
        const attendance = await this.staffAttendanceRepository.delete({});
        return attendance;
    }
    async removeAttendance(id) {
        const attendance = await this.staffAttendanceRepository.delete(id);
        return attendance;
    }
    async removeAllPayroll() {
        const payrollDefault = await this.payrollDefaultRepository.delete({});
        const payrollApplied = await this.payrollAppliedRepository.delete({});
        return { payrollDefault, payrollApplied };
    }
    async generateUniqueOTPByOrganisation(organisationId) {
        let OTP = (0, utils_1.generateRandomCode)();
        const staff = await this.findOneByOrganisationAndPin(organisationId, OTP);
        if (staff) {
            OTP = await this.generateUniqueOTPByOrganisation(organisationId);
        }
        return OTP;
    }
    getDayStartAndEnd(date) {
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
    getMonthStartAndEnd(date) {
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
};
StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(staffAdvance_entity_1.default)),
    __param(2, (0, typeorm_1.InjectRepository)(staffMonthlyAdvance_1.default)),
    __param(3, (0, typeorm_1.InjectRepository)(staffMonthlyAdvancePayment_1.default)),
    __param(4, (0, typeorm_1.InjectRepository)(staffAttendance_entity_1.default)),
    __param(5, (0, typeorm_1.InjectRepository)(attendanceType_entity_1.default)),
    __param(6, (0, typeorm_1.InjectRepository)(payrollApplied_entity_1.default)),
    __param(7, (0, typeorm_1.InjectRepository)(payrollDefault_entity_1.default)),
    __param(8, (0, typeorm_1.InjectRepository)(staffWeeklyOff_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StaffService);
exports.StaffService = StaffService;
//# sourceMappingURL=staff.service.js.map