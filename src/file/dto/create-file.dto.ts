import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFileDto {}

export class DeleteFileDto {
  @ApiProperty()
  @IsString()
  key: string;
}

export const MULTIPLE_FILES_API_BODY = {
  schema: {
    type: 'object',
    properties: {
      // comment: { type: 'string' },
      // outletId: { type: 'integer' },
      files: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
};
