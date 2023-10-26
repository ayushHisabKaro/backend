import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { OtpService } from './otp.service';
import { AuthRequest } from '../types/AuthRequest';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    private readonly otpService;
    constructor(userService: UserService, otpService: OtpService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(req: AuthRequest, updateUserDto: UpdateUserDto): Promise<User>;
    remove(req: AuthRequest): Promise<import("typeorm").DeleteResult>;
    removeById(id: string): Promise<import("typeorm").DeleteResult>;
}
