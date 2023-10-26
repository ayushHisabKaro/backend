import { Repository } from 'typeorm';
import Otp from './entities/otp';
export declare class OtpService {
    private otpRepository;
    constructor(otpRepository: Repository<Otp>);
    setOtp(phoneNumber: string, otp: string): Promise<import("typeorm").InsertResult>;
    getOtpUser(phoneNumber: string, otp: string): Promise<boolean>;
    deleteOtpUser(phoneNumber: string, otp: string): Promise<import("typeorm").DeleteResult>;
}
