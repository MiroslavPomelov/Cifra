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
      this.logger.log(`Attempt enter for user: ${signin.email}`);
      const user = await this.authenticateUser(signin);
      const accessToken = this.generateToken(user);
      this.logger.log(`Succesful enter user: ${user.email}`);
      return {
        message: 'Authorization successful!',
        accessToken,
        user
      };
    } catch (error) {
      this.logger.error(`Error enter ${signin.email}: ${error.message}`);
      this.handleAuthError(error);
    }
  }

  async registration(signup: SignupDto): Promise<{ message: string }> {
    await this.generateAndSendVerificationCode(signup.email);
    return { message: 'Verification code has send on your email' };
  }

  async validateToken(token: string): Promise<TokenValidationResult> {
    if (!token) {
      this.logger.warn('Attempt validation token');
      return {
        valid: false,
        error: 'Access token is required'
      };
    }
    try {
      this.logger.debug(`Validation Token: ${token.substring(0, 20)}...`);
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        { secret: this.configService.get('ENV_KEY') }
      );
      this.logger.debug(`Token is valid for user: ${payload.email}`);
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
      this.logger.error(`Error validation Token: ${error.message}`);
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

  private async createUser(userData: any) {
    const response: AxiosResponse = await firstValueFrom(
      this.httpService.post(
        `${this.getUsersServiceUrl()}/users`,
        userData,
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
    const statusMap: Record<number, () => Error> = {
      404: () => new UnauthorizedException('Invalid credentials'),
      409: () => new BadRequestException('User with this email already exists'),
      400: () => new BadRequestException('Invalid input data'),
      401: () => new UnauthorizedException('Invalid token'),
    };
    const status = error.response?.status;
    if (status && statusMap[status]) {
      throw statusMap[status]();
    }
    throw new BadRequestException(`Authentication failed: ${error.message}`);
  }

// Отправка кода на email
  private async generateAndSendVerificationCode(email: string) {
    const code = crypto.randomInt(100000, 999999).toString();
    this.logger.warn(`КОД - ${code}`);
    await this.verificationRepo.save({ email, code });
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Код для регистрации',
        html: `<h2>Добро пожаловать в Flower-shop!</h2><p>Ваш код подтверждения: <b>${code}</b></p>`
      });
      this.logger.log(`Письмо успешно отправлено на ${email}`);
    } catch (error) {
      this.logger.error(`Ошибка при отправке письма на ${email}: ${error.message}`, error.stack);
      throw new Error('Ошибка при отправке письма: ' + error.message);
    }
  }

  async verifyCodeAndRegister(email: string, code: string, signup: SignupDto): Promise<AuthResponse> {
    const verification = await this.verificationRepo.findOne({
      where: { email },
      order: { createdAt: 'DESC' },
    });
    if (!verification || verification.code !== code) {
      throw new Error('Error verification code');
    }
    await this.verificationRepo.delete({ email });
    const { code: _, ...signupWithoutCode } = signup;
    try {
      this.logger.log(`Attempt registration for: ${signup.email}`);
      const user = await this.createUser({ ...signupWithoutCode, isActive: true });
      const accessToken = this.generateToken(user);
      this.logger.log(`Successful registration user: ${user.email}`);
      return {
        message: 'Registration successful!',
        accessToken,
        user
      };
    } catch (error) {
      this.logger.error(`Registration Error for: ${signup.email}: ${error.message}`);
      this.handleAuthError(error);
    }
  }
}
