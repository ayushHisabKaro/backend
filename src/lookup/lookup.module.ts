import { Module } from '@nestjs/common';
import { LookupService } from './lookup.service';
import { LookupController, LookupControllerV2 } from './lookup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Lookup from './entities/lookup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lookup])],
  controllers: [LookupController, LookupControllerV2],
  providers: [LookupService],
})
export class LookupModule {}
