import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  attendanceTypes,
  attendanceType,
} from 'src/types/entity.attribute.types';

export class CreateAttendanceDto {
  @IsOptional()
  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=435&q=80',
  })
  @IsString()
  photoUrl: string;

  @IsOptional()
  @ApiProperty({ example: 21.141681 })
  @IsLatitude()
  lat: number;

  @IsOptional()
  @ApiProperty({ example: 72.783598 })
  @IsLongitude()
  lng: number;

  @IsOptional()
  @ApiProperty({ example: 'surat' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'PRESENT' })
  @IsIn(Object.values(attendanceTypes).map((i) => i))
  attendanceType: attendanceType;
}

export class UpdateAttendanceDto {
  @ApiProperty({ example: 'PRESENT' })
  @IsIn(Object.values(attendanceTypes).map((i) => i))
  attendanceType: attendanceType;
}

export class GetAttendanceDto {
  @ApiProperty({ example: 1 })
  @IsString()
  staffId: number;

  @ApiProperty({ example: '2022-11-08T18:30:00.000Z' })
  @IsDateString()
  start: string;

  @ApiProperty({ example: '2022-11-09T18:30:00.000Z' })
  @IsDateString()
  end: string;
}
