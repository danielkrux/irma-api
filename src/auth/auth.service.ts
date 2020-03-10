import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { LoginDTO, LoginResponse } from './auth';
import { UsersService } from '../users/users.service';
import { User } from '../users/user';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new Error('Could not find user');

    const valid = await verify(user.password, password);
    if (!valid) throw new Error('Password incorrect');
    
    return {
      accesToken: this.createAccesToken(user),
      user,
    };
  }

  private createAccesToken(user: User) {
    return sign(
      { userId: user.id, email: user.email },
      'sddsfdsfdsfsdfsfsfsfsfsdzxcadCASDC',
      // process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '15m' },
    );
  }

  private createRefreshToken(user: User) {
    return sign(
      { userId: user.id, email: user.email },
      'sddsfdsfdsfsdfsfsfsfsfsdzxcadCASDC',
      // process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '7d' },
    );
  }
}
