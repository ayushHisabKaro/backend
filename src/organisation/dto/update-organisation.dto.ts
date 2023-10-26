import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrganisationDto } from './create-organisation.dto';

export class UpdateOrganisationBranch {
  @IsNumber()
  @IsOptional()
  id?: number;

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

  @ApiProperty({ example: 123456 })
  @IsString()
  pinCode: string;

  @ApiProperty({ example: 'bhimrad canal' })
  @IsString()
  landmark: string;
}

export class updateOrganisationShift {
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

export class UpdateOrganisationPartner {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsNumber()
  @IsOptional()
  userId?: number;
}

export class UpdateOrganisationDto extends PartialType(CreateOrganisationDto) {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [
      {
        id: 1,
        name: 'Main Branch',
        address: 'Test address city, state 543210',
        state: 'gujarat',
        city: 'surat',
        pinCode: '123456',
        landmark: 'bhimrad canal',
      },
    ],
  })
  @Type(() => UpdateOrganisationBranch)
  branch?: UpdateOrganisationBranch[];

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    example: [
      { name: 'Partner 1', phoneNumber: '9090909091' },
      { name: 'Partner 2', phoneNumber: '9090909092' },
    ],
  })
  @Type(() => UpdateOrganisationPartner)
  partners?: UpdateOrganisationPartner[];

  code?: string;
}
