/// <reference types="passport" />
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LogsService } from './logs/logs.service';
import { AuthRequest } from './types/AuthRequest';
import { CreateLanguageDto, CreateRoleDto, LoginWithOtpDto, SendOtpDto } from './user/dto/create-user.dto';
import { User } from './user/entities/user.entity';
import { OtpService } from './user/otp.service';
import { UserService } from './user/user.service';
import { OrganisationService } from './organisation/organisation.service';
export declare class AppController {
    private authService;
    private userService;
    private organisationService;
    private otpService;
    private appService;
    private logsService;
    constructor(authService: AuthService, userService: UserService, organisationService: OrganisationService, otpService: OtpService, appService: AppService, logsService: LogsService);
    createJWTBody(user: User): {
        email: string;
        id: number;
    };
    sendTextLocalOtp(phoneNumber: string, otp: string): Promise<void>;
    sendOtp(body: SendOtpDto, request: Request): Promise<{
        success: boolean;
        message: string;
    }>;
    loginWithOtp(loginWithOtpDto: LoginWithOtpDto): Promise<{
        isNewUser: boolean;
        user: User;
        access_token: string;
        referesh_token: string;
    }>;
    loginWithOutOtp(loginWithOtpDto: LoginWithOtpDto): Promise<{
        isNewUser: boolean;
        user: User;
        access_token: string;
        referesh_token: string;
    }>;
    addDefaultData(): Promise<void>;
    createRole(createRoleDto: CreateRoleDto): Promise<import("./user/entities/role.entity").default>;
    getRoles(): Promise<import("./user/entities/role.entity").default[]>;
    createLanguage(createRoleDto: CreateLanguageDto): Promise<import("typeorm").DeepPartial<import("./user/entities/UserLanguage").default> & import("./user/entities/UserLanguage").default>;
    me(req: AuthRequest): Promise<Express.User & User>;
    setLastActive(req: AuthRequest): Promise<Express.User & User>;
    report(req: AuthRequest, name: 'user' | 'org', res: Response): Promise<any[]>;
    root(): string;
}
