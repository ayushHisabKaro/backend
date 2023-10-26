import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import {
  SalaryIntervals,
  SalaryIntervalsType,
} from '../../types/entity.attribute.types';

export class CreateResumeLanguage {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;
}

export class CreateResumeEducationDto {
  @ApiProperty({ example: 'GTU' })
  @IsString()
  education: string;

  @ApiProperty({ example: '2021' })
  @IsOptional()
  @IsString()
  from: string;

  @ApiProperty({ example: '2022' })
  @IsOptional()
  @IsString()
  to: string;
}

export class CreateResumeSkills {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;
}

export class CreateResumeDocument {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;
  @IsUrl()
  url: string;
}

export class CreateResumeWorkExperience {
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ example: 'FullStack Developer' })
  @IsString()
  jobTitle: string;

  @ApiProperty({ example: 'Zognest' })
  @IsString()
  company: string;

  @ApiProperty({ example: 'Information Technology' })
  @IsString()
  sector: string;

  @ApiProperty({ example: '2021-09-01T09:00.00.000Z' })
  @IsString()
  from: Date;

  @ApiProperty({ example: '2022-09-30T09:00.00.000Z' })
  @IsString()
  to: Date;
}

export class CreateResumeDto {
  @ApiProperty({ example: '9090909090' })
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @ApiProperty({ example: 'employeeTest@gmail.com' })
  @IsString()
  email: string;

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
  @IsOptional()
  pinCode: string;

  @ApiProperty({ example: 'bhimrad canal' })
  @IsString()
  landmark: string;

  @IsOptional()
  @ApiProperty({ example: 900000 })
  @IsNumber()
  currentSalary: number;

  @IsOptional()
  @ApiProperty({ example: SalaryIntervals.MONTH })
  @IsIn(Object.values(SalaryIntervals))
  currentSalaryInterval: SalaryIntervalsType;

  @ApiProperty({ example: true })
  @IsBoolean()
  currentSalaryVisibility: boolean;

  @IsOptional()
  @ApiProperty({ example: 'Tagda' })
  @IsString()
  englishLevel: string;

  @IsArray()
  @ValidateNested()
  @ApiProperty({ example: [{ name: 'english' }] })
  @Type(() => CreateResumeLanguage)
  otherLanguages: CreateResumeLanguage[];

  @IsArray()
  @ValidateNested()
  @ApiProperty({ example: [{ name: 'coding' }] })
  @Type(() => CreateResumeSkills)
  skills: CreateResumeSkills[];

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [{ name: 'Experience Certificate', url: 'https://file.pdf' }],
  })
  @Type(() => CreateResumeDocument)
  documents: CreateResumeDocument[];

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [
      {
        jobTitle: 'FullStack Developer',
        company: 'Zognest',
        sector: 'Information Technology',
        from: '2021-09-01T09:00.00.000Z',
        to: '2022-09-30T09:00.00.000Z',
      },
    ],
  })
  @Type(() => CreateResumeWorkExperience)
  workExperience: CreateResumeWorkExperience[];

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [
      {
        education: 'GTU',
        from: '2022',
        to: '2023',
      },
    ],
  })
  @Type(() => CreateResumeEducationDto)
  education: CreateResumeEducationDto[];

  @IsOptional()
  @ApiProperty({ example: 'BE Computer' })
  @IsString()
  highestEducation: string;
}
