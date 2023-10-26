import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { roleType } from 'src/types/entity.attribute.types';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<roleType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('Role Guard required role ', roles);

    // if (!roles) {
    //   return false;
    // }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log('Role guard ', user);

    if (roles && !roles.includes(user.role.name)) {
      throw new ForbiddenException('Unauthorized Access');
    }
    return true;
  }
}
