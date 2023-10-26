import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateOrganisationPartner {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsNumber()
  @IsOptional()
  userId?: number;
}

export class CreateOrganisationShift {
  @ApiProperty({ example: '10:00' })
  @IsString()
  openTime: string;

  @ApiProperty({ example: '18:00' })
  @IsString()
  closeTime: string;

  @ApiProperty({ example: '10:30' })
  @IsString()
  markLateAfter: string;
}

export class CreateOrganisationBranch {
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 'Test Branch' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Test address city, state 543210' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'gujarat' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'surat' })
  @IsString()
  city: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  pinCode: string;

  @ApiProperty({ example: 'bhimrad canal' })
  @IsString()
  landmark: string;

  code?: string;
}

export class CreateOrganisationDto {
  @ApiProperty({ example: 'Organisation 1' })
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'https://www.realserve.com.au/wp-content/uploads/Realserve-Sample-of-a-Gross-Floor-Area-Plan-for-Commercial-Property-building-1.jpg',
  })
  @IsUrl()
  @IsOptional()
  imageUrl: string;

  // @ApiProperty({ example: 1 })
  // @IsNumber()
  // createdByUserID: number;

  @ApiProperty({ example: 'Test address city, state 543210' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'gujarat' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: 'surat' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsOptional()
  pinCode?: string;

  @ApiProperty({ example: 'bhimrad canal' })
  @IsString()
  @IsOptional()
  landmark?: string;

  @ApiProperty({ example: 7 })
  @IsNumber()
  @IsOptional()
  weekelyOff1?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  weekelyOff2?: number;

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [
      {
        openTime: '10:30',
        closeTime: '10:30',
        markLateAfter: '10:30',
      },
    ],
  })
  @Type(() => CreateOrganisationShift)
  shifts: CreateOrganisationShift[];

  @ApiProperty({ example: 'Information Technology' })
  @IsString()
  @IsOptional()
  industrySector?: string;

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [
      {
        name: 'Main Branch',
        address: 'Test address city, state 543210',
        state: 'gujarat',
        city: 'surat',
        landmark: 'bhimrad canal',
      },
    ],
  })
  @Type(() => CreateOrganisationBranch)
  branch: CreateOrganisationBranch[];

  @ApiProperty({ example: 'WERTYUIOP' })
  @IsString()
  @IsOptional()
  gstNumber?: string;

  @ApiProperty({
    example:
      'https://img.indiafilings.com/learn/wp-content/uploads/2017/07/12010421/GST-Registration-Certificate-Sample-Annexure-A.png',
  })
  @IsUrl()
  @IsOptional()
  gstFileUrl?: string;

  @ApiProperty({ example: 'BORPJ1523G' })
  @IsString()
  @IsOptional()
  panNumber?: string;

  @ApiProperty({
    example:
      'https://upload.wikimedia.org/wikipedia/commons/3/31/A_sample_of_Permanent_Account_Number_%28PAN%29_Card.jpg',
  })
  @IsUrl()
  @IsOptional()
  panFileUrl?: string;

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [
      { name: 'Partner 1', phoneNumber: '9090909091' },
      { name: 'Partner 2', phoneNumber: '9090909092' },
    ],
  })
  @Type(() => CreateOrganisationPartner)
  partners: CreateOrganisationPartner[];
}

export class CreateOrganisationJoinRequest {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: '123456' })
  @IsString()
  organisationBranchCode: string;
}
