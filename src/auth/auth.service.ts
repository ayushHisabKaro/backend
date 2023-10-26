import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { compare } from 'bcrypt';
import { OtpService } from 'src/user/otp.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  // async validateUser(email: string, pass: string): Promise<any | null> {
  //   const user = await this.userService.findOnewithEmailWithPassword(email);
  //   console.log(pass, user);

  //   if (user && (await compare(pass, user.password))) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password, ...result } = user;
  //     console.log('JWT body ', this.createJWTBody(user));
  //     return {
  //       user: result,
  //       access_token: this.jwtService.sign(this.createJWTBody(user)),
  //       referesh_token: this.jwtService.sign(this.createJWTBody(user), {
  //         expiresIn: '30 days',
  //       }),
  //     };
  //   }
  //   return null;
  // }

  createJwtUser(user: User) {
    return {
      user,
      access_token: this.jwtService.sign(this.createJWTBody(user)),
      referesh_token: this.jwtService.sign(this.createJWTBody(user), {
        expiresIn: '30 days',
      }),
    };
  }

  createJWTBody(user: User) {
    return { id: user.id };
  }
}
