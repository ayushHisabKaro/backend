import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { OtpService } from './otp.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRequest } from '../types/AuthRequest';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeepPartial } from 'typeorm';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly otpService: OtpService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOneWithRelations(+id);
  }

  @Patch('')
  async update(
    @Request() req: AuthRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const role = updateUserDto.role
      ? await this.userService.findRoleByName(updateUserDto.role)
      : req.user.role;
    if (updateUserDto.email)
      await this.userService.findOneByEmailExceptAndThrow(
        updateUserDto.email,
        req.user.id,
      );
    if (updateUserDto.phoneNumber)
      await this.userService.findOneByBothPhoneNumbersExceptAndThrow(
        updateUserDto.phoneNumber,
        req.user.id,
      );
    if (updateUserDto.alternatePhoneNumber)
      await this.userService.findOneByBothPhoneNumbersExceptAndThrow(
        updateUserDto.alternatePhoneNumber,
        req.user.id,
      );
    const updateData: User = this.userService.create({
      ...req.user,
      ...updateUserDto,
      role,
      id: req.user.id,
    });
    delete updateData.organisations;
    delete updateData.jobsApplied;
    delete updateData.jobsBookmarked;
    delete updateData.jobsShortlisted;
    //await this.userService.findEmailExceptUser(updateData.email, req.user.id);
    return this.userService.save(updateData);
  }

  @Delete('')
  remove(@Request() req: AuthRequest) {
    return this.userService.remove(+req.user.id);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
