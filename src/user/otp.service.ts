import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Otp from './entities/otp';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}
  async setOtp(phoneNumber: string, otp: string) {
    return await this.otpRepository
      .createQueryBuilder()
      .insert()
      .values({ id: null, phoneNumber, otp })
      .orUpdate(['otp'], ['phoneNumber'])
      .setParameter('otp', otp)
      .execute();
  }
  async getOtpUser(phoneNumber: string, otp: string) {
    return (await this.otpRepository
      .createQueryBuilder('otp')
      .where('otp.phoneNumber = :phoneNumber', { phoneNumber })
      .andWhere('otp.otp = :otp', { otp })
      .getOne())
      ? true
      : false;
  }
  async deleteOtpUser(phoneNumber: string, otp: string) {
    return await this.otpRepository
      .createQueryBuilder('otp')
      .where('phoneNumber = :phoneNumber', { phoneNumber })
      .andWhere('otp = :otp', { otp })
      .delete()
      .execute();
  }
}
