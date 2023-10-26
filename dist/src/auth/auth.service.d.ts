import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { OtpService } from 'src/user/otp.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private otpService;
    constructor(userService: UserService, jwtService: JwtService, otpService: OtpService);
    createJwtUser(user: User): {
        user: User;
        access_token: string;
        referesh_token: string;
    };
    createJWTBody(user: User): {
        id: number;
    };
}
