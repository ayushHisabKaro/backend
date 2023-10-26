import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      // passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    console.log(
      'payload - ',
      payload,
      new Date(payload.exp * 1000).toLocaleString(),
    );
    const user: User = await this.userService.findOneWithRole(payload.id);
    console.log('user ', user);

    // if (!user || !user.role) {
    //   return null;
    // }
    console.log('JWTauth guard');
    return user;
  }
}
