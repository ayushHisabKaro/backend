import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2],
  })
  ids: number[];
  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [1, 2],
  })
  orgRequestIds: number[];
}
