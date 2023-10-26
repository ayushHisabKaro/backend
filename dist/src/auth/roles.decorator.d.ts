import { roleType } from 'src/types/entity.attribute.types';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: roleType[]) => import("@nestjs/common").CustomDecorator<string>;
