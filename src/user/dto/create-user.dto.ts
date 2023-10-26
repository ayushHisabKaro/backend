import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  name: string;
}
export class CreateLanguageDto {
  @IsString()
  @ApiProperty({ example: 'English' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'en' })
  code: string;
}

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  phoneNumber: string;
}

export class SendOtpDto {
  @IsString()
  @Length(6, 10)
  @ApiProperty({ example: '9099746341' })
  phoneNumber: string;
}
export class LoginWithOtpDto {
  @IsString()
  @ApiProperty({ example: '9099746341' })
  phoneNumber: string;

  @IsString()
  @Length(4, 4)
  @ApiProperty({ example: '4204' })
  otp: string;

  @IsString()
  @Optional()
  @ApiProperty({ example: 'en' })
  localization: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1.1 })
  appVersion: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'samsung' })
  deviceName: string;
}
