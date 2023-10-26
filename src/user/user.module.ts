import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Role from './entities/role.entity';
import Otp from './entities/otp';
import { OtpService } from './otp.service';
import UserLanguage from './entities/UserLanguage';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Otp, UserLanguage])],
  providers: [UserService, OtpService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService, OtpService],
})
export class UserModule {}
