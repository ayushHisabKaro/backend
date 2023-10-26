import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import { Roles } from '../../types/entity.attribute.types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @ApiProperty({ example: 'BUSINESS' })
  @IsIn(Object.values(Roles))
  role: string;

  @IsOptional()
  @ApiProperty({ example: 'businessAdmin@gmail.com' })
  @IsString()
  email: string;

  @IsOptional()
  @ApiProperty({ example: 'Jon Doe' })
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty({ example: '9191919191' })
  @IsString()
  alternatePhoneNumber: string;

  @IsOptional()
  @ApiProperty({ example: 'http://image.jpeg' })
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @ApiProperty({ example: 'en' })
  @IsString()
  localization: string;
}
