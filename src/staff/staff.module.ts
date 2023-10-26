import { forwardRef, Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Staff from './entities/staff.entity';
import StaffAttendance from './entities/staffAttendance.entity';
import StaffAdvance from './entities/staffAdvance.entity';
import AttendanceType from './entities/attendanceType.entity';
import { NotificationModule } from '../notification/notification.module';
import { OrganisationModule } from 'src/organisation/organisation.module';
import { LogsModule } from '../logs/logs.module';
import PayrollApplied from './entities/payrollApplied.entity';
import StaffMonthlyAdvance from './entities/staffMonthlyAdvance';
import PayrollDefault from './entities/payrollDefault.entity';
import StaffMonthlyAdvancePayment from './entities/staffMonthlyAdvancePayment';
import StaffWeeklyOff from './entities/staffWeeklyOff.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Staff,
      StaffAttendance,
      AttendanceType,
      StaffAdvance,
      PayrollApplied,
      PayrollDefault,
      StaffMonthlyAdvance,
      StaffMonthlyAdvancePayment,
      StaffWeeklyOff,
    ]),
    NotificationModule,
    LogsModule,
    forwardRef(() => OrganisationModule),
  ],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [TypeOrmModule, StaffService],
})
export class StaffModule {}
