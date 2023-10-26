export declare class CreateRoleDto {
    name: string;
}
export declare class CreateLanguageDto {
    name: string;
    code: string;
}
export declare class CreateUserDto {
    phoneNumber: string;
}
export declare class SendOtpDto {
    phoneNumber: string;
}
export declare class LoginWithOtpDto {
    phoneNumber: string;
    otp: string;
    localization: string;
    appVersion: number;
    deviceName: string;
}
