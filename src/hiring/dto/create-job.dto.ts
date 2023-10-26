import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SalaryIntervals } from '../../types/entity.attribute.types';

export class CreateJobRequiredSkill {
  @IsString()
  name: string;
}
export class CreateJobExperienceRequired {
  @IsString()
  name: string;
}
export class CreateJobOtherLanguage {
  @IsString()
  name: string;
}

export class CreateJobDto {
  @ApiProperty({ example: 'Mid-level UX Designer' })
  @IsString()
  title: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  organisationId: number;

  @ApiProperty({ example: 11 })
  @IsNumber()
  organisationBranchId: number;

  @ApiProperty({ example: 'Test address city, state 543210' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'gujarat' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'surat' })
  @IsString()
  city: string;

  @ApiProperty({ example: 123456 })
  @IsString()
  pinCode: string;

  @ApiProperty({ example: 'bhimrad canal' })
  @IsString()
  landmark: string;

  @IsOptional()
  @ApiProperty({ example: 10000 })
  @IsNumber()
  minSalary: number;

  @ApiProperty({ example: SalaryIntervals.MONTH })
  @IsIn(Object.values(SalaryIntervals))
  minSalaryInterval: string;

  @IsOptional()
  @ApiProperty({ example: 30000 })
  @IsNumber()
  maxSalary: number;

  @ApiProperty({ example: SalaryIntervals.MONTH })
  @IsIn(Object.values(SalaryIntervals))
  maxSalaryInterval: string;

  @IsOptional()
  @ApiProperty({ example: 1000 })
  @IsNumber()
  minIncentive: number;

  @ApiProperty({ example: SalaryIntervals.MONTH })
  @IsIn(Object.values(SalaryIntervals))
  minIncentiveInterval: string;

  @IsOptional()
  @ApiProperty({ example: 3000 })
  @IsNumber()
  maxIncentive: number;

  @ApiProperty({ example: '10:30' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '10:30' })
  @IsString()
  endTime: string;

  @ApiProperty({ example: SalaryIntervals.MONTH })
  @IsIn(Object.values(SalaryIntervals))
  maxIncentiveInterval: string;

  @ApiProperty({ example: 'Full Time' })
  jobTimingType: string;

  @ApiProperty({ example: '2022-10-01' })
  applyBeforeDate: Date;

  @ApiProperty({
    example:
      "Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye? We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you? We're looking for a like-minded",
  })
  description: string;

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [{ name: 'Photoshop' }, { name: 'Illustrator' }],
  })
  @Type(() => CreateJobRequiredSkill)
  requiredSkills: CreateJobRequiredSkill[];

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [{ name: 'Experienced' }],
  })
  @Type(() => CreateJobExperienceRequired)
  experienceRequired: CreateJobExperienceRequired[];

  @ApiProperty({ example: 'Halka Engllish' })
  englishLevel: string;

  @ApiProperty({ example: '9090909090' })
  phoneNumber: string;

  @ApiProperty({ example: 'some discription' })
  comment: string;

  @ApiProperty({ example: 'jobEmail@gmail.com' })
  emailAddress: string;

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [{ name: 'Hindi' }, { name: 'Gujarati' }],
  })
  @Type(() => CreateJobOtherLanguage)
  otherLanguages: CreateJobOtherLanguage[];
}

export class UpdateJobDto extends PartialType(CreateJobDto) {}
