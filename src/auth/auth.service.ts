import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await argon2.verify(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user._doc.username, sub: user._doc._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async loginWithGoogle(email: string) {
    const result = await this.usersService.createOrFindGoogleUser(email);
    const tokenLogin = await this.login(result);
    return {
      url: `${process.env.REDIRECT_GOOGLE_LOGIN_URL}?t=${Buffer.from(
        tokenLogin.access_token,
      ).toString('base64')}`,
    };
  }
}
