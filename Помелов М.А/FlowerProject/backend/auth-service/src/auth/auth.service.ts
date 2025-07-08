import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtPayload, TokenValidationResult, AuthResponse } from '../interfaces';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationCode } from './entities/verificationcode.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(VerificationCode)
    private verificationRepo: Repository<VerificationCode>,
    private readonly mailerService: MailerService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async login(signin: SigninDto): Promise<AuthResponse> {
    try {
      this.logger.log(`Попытка входа для пользователя: ${signin.email}`);

      const user = await this.authenticateUser(signin);
      const accessToken = this.generateToken(user);

      this.logger.log(`Успешный вход пользователя: ${user.email}`);
      return {
        message: 'Authorization successful!',
        accessToken,
        user
      };
    } catch (error) {
      this.logger.error(`Ошибка входа для ${signin.email}: ${error.message}`);
      this.handleAuthError(error);
    }
  }

  async registration(signup: SignupDto): Promise<AuthResponse> {
    try {
      this.logger.log(`Попытка регистрации пользователя: ${signup.email}`);

      const user = await this.createUser(signup);
      const accessToken = this.generateToken(user);

      this.logger.log(`Успешная регистрация пользователя: ${user.email}`);
      return {
        message: 'Registration successful!',
        accessToken,
        user
      };
    } catch (error) {
      this.logger.error(`Ошибка регистрации для ${signup.email}: ${error.message}`);
      this.handleAuthError(error);
    }
  }

  async validateToken(token: string): Promise<TokenValidationResult> {
    if (!token) {
      this.logger.warn('Попытка валидации без токена');
      return {
        valid: false,
        error: 'Access token is required'
      };
    }

    try {
      this.logger.debug(`Валидация токена: ${token.substring(0, 20)}...`);

      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        { secret: this.configService.get('ENV_KEY') }
      );

      this.logger.debug(`Токен валиден для пользователя: ${payload.email}`);
      return {
        valid: true,
        user: {
          sub: payload.sub,
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName
        }
      };
    } catch (error) {
      this.logger.error(`Ошибка валидации токена: ${error.message}`);
      return {
        valid: false,
        error: 'Invalid token'
      };
    }
  }

  private async authenticateUser(signin: SigninDto) {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        `${this.getUsersServiceUrl()}/users/signin`,
        signin,
        { headers: this.getServiceHeaders() }
      )
    );
    return response.data;
  }

  private async createUser(signup: SignupDto) {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        `${this.getUsersServiceUrl()}/users`,
        signup,
        { headers: this.getServiceHeaders() }
      )
    );
    return response.data;
  }

  private generateToken(user: any): string {
    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('ENV_KEY'),
      expiresIn: '1h'
    });
  }

  private getUsersServiceUrl(): string {
    return this.configService.get('USERS_SERVICE_URL') || 'http://users-service:3000';
  }

  private getServiceHeaders() {
    return {
      'Content-Type': 'application/json',
      'envservicetoken': this.configService.get('ENV_TOKEN'),
    };
  }

  private handleAuthError(error: any): never {
    if (error.response?.status === 404) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (error.response?.status === 409) {
      throw new BadRequestException('User with this email already exists');
    }
    if (error.response?.status === 400) {
      throw new BadRequestException('Invalid input data');
    }
    if (error.response?.status === 401) {
      throw new UnauthorizedException('Invalid token');
    }
    throw new BadRequestException(`Authentication failed: ${error.message}`);
  }




  //ОТПРАВКА ПОЧТОВОГО КОДА НА EMAIL

  //ОТПРАВКА
  async sendVerificationCode(email: string) {
    // Генерируем 6-значный код
    const code = crypto.randomInt(100000, 999999).toString();
    this.logger.warn(`КОД - ${code}`);

    // Сохраняем код в БД
    await this.verificationRepo.save({ email, code });

    // Отправляем email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Код подтверждения',
      text: `Ваш код: ${code}`,
    });

    return { message: 'Код отправлен на email' };
  }

  //ПРОВЕРКА
  async verifyCodeAndRegister(email: string, code: string, signup: SignupDto): Promise<AuthResponse> {
    // Находим последний код для этого email
    const verification = await this.verificationRepo.findOne({
      where: { email },
      order: { createdAt: 'DESC' },
    });

    if (!verification || verification.code !== code) {
      throw new Error('Неверный код');
    }

    // Удаляем использованный код
    await this.verificationRepo.delete({ email });

    // Регистрируем пользователя (здесь ваша логика)
    try {
      this.logger.log(`Попытка регистрации пользователя: ${signup.email}`);

      const user = await this.createUser(signup);
      const accessToken = this.generateToken(user);

      this.logger.log(`Успешная регистрация пользователя: ${user.email}`);
      return {
        message: 'Registration successful!',
        accessToken,
        user
      };
    } catch (error) {
      this.logger.error(`Ошибка регистрации для ${signup.email}: ${error.message}`);
      this.handleAuthError(error);
    }
  }
}
