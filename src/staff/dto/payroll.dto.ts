import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePayrollDto {
  @ApiProperty({ example: [1, 2, 3, 4, 5] })
  @IsOptional()
  @IsArray()
  staffIds: number[];

  @ApiProperty({ example: 1000 })
  @IsOptional()
  @IsNumber()
  salary: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  hra: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  specialAllowance: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  bonus: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  nightAllowance: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  overTime: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  otherAddition: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  pf: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  esi: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  tds: number;

  @ApiProperty({ example: 100 })
  @IsOptional()
  @IsNumber()
  otherDeduction: number;

  @ApiProperty({ example: '2022-11' })
  @IsString()
  month: string;
}
