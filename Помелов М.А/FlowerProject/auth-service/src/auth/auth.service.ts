import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async login(signin: SigninDto): Promise<{message: string; accessToken?: string}> {
    try {
      this.logger.log(`Попытка входа для пользователя: ${signin.email}`);
      
      const validToken = this.configService.get('ENV_TOKEN');
      const secretKey = this.configService.get('ENV_KEY');
      const usersServiceUrl = this.configService.get('USERS_SERVICE_URL') || 'http://users-service:3000';

      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(
          `${usersServiceUrl}/users/signin`,
          signin,
          {
            headers: {
              'Content-Type': 'application/json',
              'envservicetoken': validToken,
            },
          },
        ),
      );

      const user = response.data;
      if (user) {
        const payload = {
          sub: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        };
        const accessToken = this.jwtService.sign(payload, { secret: secretKey, expiresIn: '1h' });
        
        this.logger.log(`Успешный вход пользователя: ${user.email}`);
        return { 
          message: 'Authorization successful!',
          accessToken
        };
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      this.logger.error(`Ошибка входа для ${signin.email}: ${error.message}`);
      
      if (error.response?.status === 404) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (error.response?.status === 400) {
        throw new BadRequestException('Invalid input data');
      }
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Invalid token');
      }
      throw new BadRequestException(`Login failed: ${error.message}`);
    }
  }

  async registration(signup: SignupDto): Promise<{message: string; accessToken?: string}> {
    try {
      this.logger.log(`Попытка регистрации пользователя: ${signup.email}`);
      
      const validToken = this.configService.get('ENV_TOKEN');
      const secretKey = this.configService.get('ENV_KEY');
      const usersServiceUrl = this.configService.get('USERS_SERVICE_URL') || 'http://users-service:3000';

      // Преобразуем SignupDto в формат, ожидаемый CreateUserDto
      const userData = {
        email: signup.email,
        password: signup.password,
        firstName: signup.firstName,
        lastName: signup.lastName,
        birthDate: signup.birthDate,
        phone: signup.phone,
        city: signup.city,
        personalData: signup.personalData
      };

      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(
          `${usersServiceUrl}/users`,
          userData,
          {
            headers: {
              'Content-Type': 'application/json',
              'envservicetoken': validToken,
            },
          },
        ),
      );

      const user = response.data;
      if (user) {
        const payload = {
          sub: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        };
        const accessToken = this.jwtService.sign(payload, { secret: secretKey, expiresIn: '1h' });
        
        this.logger.log(`Успешная регистрация пользователя: ${user.email}`);
        return { 
          message: 'Registration successful!',
          accessToken
        };
      } else {
        throw new BadRequestException('Registration failed');
      }
    } catch (error) {
      this.logger.error(`Ошибка регистрации для ${signup.email}: ${error.message}`);
      
      if (error.response?.status === 409) {
        throw new BadRequestException('User with this email already exists');
      }
      if (error.response?.status === 400) {
        throw new BadRequestException('Invalid input data');
      }
      if (error.response?.status === 401) {
        throw new UnauthorizedException('Invalid token');
      }
      throw new BadRequestException(`Registration failed: ${error.message}`);
    }
  }
}
