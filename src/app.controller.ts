import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request as RequestDecorator,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
const axios = require('axios');
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './auth/roles.decorator';
import { LogsService } from './logs/logs.service';
import { AuthRequest } from './types/AuthRequest';
import { LogTypes } from './types/entity.attribute.types';
import { R_sendOtpResponse } from './types/response.example';
import {
  CreateLanguageDto,
  CreateRoleDto,
  LoginWithOtpDto,
  SendOtpDto,
} from './user/dto/create-user.dto';
import { User } from './user/entities/user.entity';
import { OtpService } from './user/otp.service';
import { UserService } from './user/user.service';
import { OrganisationService } from './organisation/organisation.service';
import { json2csv } from 'json-2-csv';
import { CreateOrganisationPartner } from './organisation/dto/create-organisation.dto';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private organisationService: OrganisationService,
    private otpService: OtpService,
    private appService: AppService,
    private logsService: LogsService,
  ) {}

  createJWTBody(user: User) {
    return { email: user.email, id: user.id };
  }

  async sendTextLocalOtp(phoneNumber: string, otp: string) {
    const apiKey = 'NTg2NjRkNDk2ZDVhMzc3NjM3NjM2NDQ5NGQ0OTQ1NjQ=';
    const sender = 'HSBKRO';
    const number = '91' + phoneNumber;
    let applicationName = 'application name';

    const message = encodeURIComponent(
      `Dear Customer,
${otp} is your one time password (OTP). Please enter the OTP to proceed.

Thank you,
Team HisabKaro`,
    );
    var url =
      'http://api.textlocal.in/send/?' +
      'apiKey=' +
      apiKey +
      '&sender=' +
      sender +
      '&numbers=' +
      number +
      '&message=' +
      message;
    console.log(url);

    await axios
      .post(url)
      .then(function (response) {
        console.log('TEXTLOCAL response ', response.data);
      })
      .catch(function (error) {
        console.log('TEXTLOCAL error ', error.message);
      });
  }

  @Throttle(1, 10)
  @ApiResponse({ schema: { example: R_sendOtpResponse } })
  @Post('auth/sendOtp')
  async sendOtp(
    @Body() body: SendOtpDto,
    @RequestDecorator() request: Request,
  ) {
    const liveOtp = process.env.LIVE_OTP === 'true';
    const _otp = liveOtp ? this.appService.generateOTP() : '4204';
    // send otp here
    if (liveOtp) await this.sendTextLocalOtp(body.phoneNumber, _otp);
    const otp = await this.otpService.setOtp(body.phoneNumber, _otp);
    const value = [
      request.ips.join('/'),
      request.ip,
      request.header('x-forwarded-for'),
      body.phoneNumber,
    ].join(',');
    this.logsService.create({ name: LogTypes.OTP, value });
    console.log(otp, _otp);

    return { success: true, message: 'Otp sent!' };
  }
  @Post('auth/loginWithOtp')
  async loginWithOtp(@Body() loginWithOtpDto: LoginWithOtpDto) {
    const { phoneNumber, otp, appVersion, deviceName } = loginWithOtpDto;

    const valid = await this.otpService.getOtpUser(phoneNumber, otp);
    if (!valid) {
      throw new BadRequestException(`Invalid OTP!`);
    }
    await this.otpService.deleteOtpUser(phoneNumber, otp);
    let isNewUser = false;
    let user = await this.userService.findByBothPhoneNumberWithRelations(
      phoneNumber,
    );
    if (!user) {
      const language = await this.userService.findLanguageByCodeOrThrow(
        loginWithOtpDto.localization,
      );
      // if (await this.userService.findOneByBothPhoneNumbers(loginWithOtpDto.phoneNumber)) {
      //   throw new BadRequestException('Phone number already exists.');
      // }
      const userData = this.userService.create({
        phoneNumber,
        language,
        appVersion,
        deviceName,
      });
      user = await this.userService.save(userData);

      await this.organisationService.checkOrgPartnerByUser(user);
    } else {
      this.userService.update(user.id, { appVersion, deviceName });
    }
    if (!user.name || !user.role) {
      isNewUser = true;
    }

    // CHECK PHONE NUMBER FOR ORG PARTNER OR STAFF AND SEND NOTIFICATION

    const authUser = this.authService.createJwtUser(user);

    return {
      ...authUser,
      isNewUser,
    };
  }

  @Post('auth/loginWithoutOtp')
  async loginWithOutOtp(@Body() loginWithOtpDto: LoginWithOtpDto) {
    const { phoneNumber, otp } = loginWithOtpDto;

    let isNewUser = false;
    let user = await this.userService.findByBothPhoneNumberWithRelations(
      phoneNumber,
    );
    if (!user) {
      throw new BadRequestException(`Invalid USER!`);
    }

    // CHECK PHONE NUMBER FOR ORG PARTNER OR STAFF AND SEND NOTIFICATION

    const authUser = this.authService.createJwtUser(user);

    return {
      ...authUser,
      isNewUser,
    };
  }

  @Post('defaultDate')
  addDefaultData() {
    return this.appService.addDefaultData();
  }

  @Post('role')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.userService.createRole(createRoleDto);
  }

  @Get('role')
  getRoles() {
    return this.userService.findAllRoles();
  }

  @Post('language')
  createLanguage(@Body() createRoleDto: CreateLanguageDto) {
    return this.userService.createLanguage(createRoleDto);
  }

  @ApiBearerAuth()
  @Roles('BUSINESS')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@RequestDecorator() req: AuthRequest) {
    console.log('REQUEST user ', req.user);

    return req.user;
  }
  @ApiBearerAuth()
  // @Roles('BUSINESS')
  @UseGuards(JwtAuthGuard)
  @Get('log/appOpened')
  async setLastActive(@RequestDecorator() req: AuthRequest) {
    console.log('REQUEST user ', req.user);
    this.userService.update(req.user.id, { lastActive: new Date() });
    return req.user;
  }

  @Get('report/:name')
  async report(
    @RequestDecorator() req: AuthRequest,
    @Param('name') name: 'user' | 'org',
    @Response() res: Response,
  ) {
    console.log('REQUEST user ', req.user);
    let result = [];
    if (name === 'user') {
      result = await this.appService.getUserReport();
    } else if (name === 'org') {
      result = await this.appService.getOrgReport();
    }
    const data = await json2csv(result);
    // console.log(data);
    // @ts-ignore
    res.attachment(`data-${name}.csv`);
    // @ts-ignore
    res.set('Content-Type', 'application/octet-stream');
    // @ts-ignore
    res.status(200).send(data);
    return result;
  }

  @Get()
  root() {
    return 'Hello World';
  }
}
