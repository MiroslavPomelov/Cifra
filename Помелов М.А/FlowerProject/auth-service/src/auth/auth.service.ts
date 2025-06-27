import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://localhost:3001/users?username=${username}`),
      );

      const user = response.data; 
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // 2. Проверка пароля (bcrypt)
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      // 3. Возвращаем пользователя без пароля
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}