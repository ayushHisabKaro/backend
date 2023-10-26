import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    role: string;
    email: string;
    name: string;
    alternatePhoneNumber: string;
    imageUrl: string;
    localization: string;
}
export {};
