import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
  isString,
} from 'class-validator';
import Organisation from 'src/organisation/entities/organisation.entity';
import OrganisationBranch from 'src/organisation/entities/organisationBranch.entity';
import { SalaryIntervals } from 'src/types/entity.attribute.types';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial } from 'typeorm';

export class CreateStaffAdvanceDto {
  @ApiProperty({ example: 1000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  interestRate: number;

  @ApiProperty({ example: '2022-10-01' })
  @IsString()
  startDate: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  sameMonth: boolean;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsOptional()
  totalMonths: number;
}

export class createMonthlyAdvance {
  amount: number;
  month: string;
}
export class CreateStaffDto {
  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [
      {
        amount: 10000,
        interestRate: 4.5,
        startDate: '2022-10-01',
        sameMonth: false,
        totalMonths: 10,
      },
    ],
  })
  @Type(() => CreateStaffAdvanceDto)
  advance: CreateStaffAdvanceDto[];

  @IsOptional()
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  organisationId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  organisationBranchId: number;

  @ApiProperty({ example: 'Test Staff 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: '9090909090' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 30000 })
  @IsNumber()
  salary: number;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  hra: number;

  @ApiProperty({ example: 'month' })
  @IsIn(Object.values(SalaryIntervals))
  salaryInterval: string;

  @ApiProperty({ example: '10:00' })
  @IsString()
  openTime: string;

  @ApiProperty({ example: '19:00' })
  @IsString()
  closeTime: string;

  @ApiProperty({ example: '10:30' })
  @IsString()
  markLateAfter: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  // @Min(1)
  // @Max(7)
  weekelyOff1: number; // ! after incorrect name changed, force update

  @ApiProperty({ example: 2 })
  @IsNumber()
  // @Min(1)
  // @Max(7)
  weekelyOff2: number; // ! after incorrect name changed, force update

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  specialAllowance?: number; // payroll

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  Bonus?: number; // payroll

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  nightAllowance?: number; // payroll

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  overTime?: number; // payroll

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  other?: number; // payroll

  user: DeepPartial<User>;
  organisation: DeepPartial<Organisation>;
  organisationBranch: DeepPartial<OrganisationBranch>;
}

export class ConnectStaffDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  organisationId: number;

  @ApiProperty({ example: '909090' })
  @IsString()
  @Length(6, 6)
  pin: string;
}

export class PayrollUpdateDto {
  @ApiProperty({ example: '2022-12-01' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  salary: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  hra: number;
}

export class GetHomePageStaffDto {
  @ApiProperty({ example: '2022-11-08T18:30:00.000Z' })
  @IsDateString()
  start: string;

  @ApiProperty({ example: '2022-11-09T18:30:00.000Z' })
  @IsDateString()
  end: string;
}

export class CreatePaymentDto {
  @ApiProperty({ example: 1 })
  monthlyAdvanceId: number;

  @ApiProperty({ example: 100 })
  amount: number;
}
