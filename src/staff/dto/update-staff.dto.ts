import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-staff.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @IsOptional()
  @ApiProperty({ example: '2022-11' })
  @IsString()
  weeklyOffMonth?: string;

  @IsOptional()
  @ApiProperty({ example: '9090909090' })
  @IsString()
  companyMobileNumber?: string;

  @IsOptional()
  @ApiProperty({ example: 'IT' })
  @IsString()
  department?: string;

  @IsOptional()
  @ApiProperty({ example: '2023-04-13' })
  @IsString()
  joiningDate?: string;

  @IsOptional()
  @ApiProperty({ example: 'mobileHandset' })
  @IsString()
  mobileHandset?: string;
  @IsOptional()
  @ApiProperty({ example: 'laptop' })
  @IsString()
  laptop?: string;

  @IsOptional()
  @ApiProperty({ example: 'otherInformation' })
  @IsString()
  otherInformation?: string;
}

export class UpdateWeeklyOffDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  // @Min(1)
  // @Max(7)
  weekelyOff1: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  // @Min(1)
  // @Max(7)
  weekelyOff2: number;

  @ApiProperty({ example: '2022-11' })
  @IsString()
  month: string;
}
