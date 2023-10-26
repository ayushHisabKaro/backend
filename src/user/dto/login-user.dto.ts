import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ default: 'admin_user@gmail.com' })
  email: string;

  @Length(6, 32)
  @ApiProperty({ default: '101010' })
  password: string;
}
