import { PartialType } from '@nestjs/swagger';
import { CreateHiringDto } from './create-hiring.dto';

export class UpdateHiringDto extends PartialType(CreateHiringDto) {}
