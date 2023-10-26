import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLookupDto {
  @ApiProperty({ example: 'ANDROID_VERSION' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1.0 })
  @IsNumber()
  value: number;
}
