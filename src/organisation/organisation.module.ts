import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Organisation from './entities/organisation.entity';
import OrganisationPartner from './entities/organisationPartner.entity';
import OrganisationBranch from './entities/organisationBranch.entity';
import { UserModule } from '../user/user.module';
import OrganisationShift from './entities/organisationShfit.entity';
import { StaffModule } from '../staff/staff.module';
import { NotificationModule } from '../notification/notification.module';
import OrganisationJoinRequest from './entities/organisationJoinRequest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organisation,
      OrganisationPartner,
      OrganisationBranch,
      OrganisationShift,
      OrganisationJoinRequest,
    ]),
    UserModule,
    StaffModule,
    NotificationModule,
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [OrganisationService],
})
export class OrganisationModule {}
