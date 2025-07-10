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
    await this.mailerService.sendMail({
      to: email,
      subject: 'Код подтверждения для регистрации на площадке Flowe-shop',
       html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width">
            <style>
                body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; color: #333; }
                .container { max-width: 600px; margin: 0 auto; }
                .header { background: linear-gradient(to right, #fff5f7, #ffebee); padding: 30px 0; text-align: center; }
                .content { padding: 30px; background: white; }
                .code { 
                    background: linear-gradient(to right, #fff5f7, #ffebee); 
                    padding: 18px; 
                    margin: 25px 0; 
                    text-align: center; 
                    font-size: 28px; 
                    letter-spacing: 3px; 
                    color: #d23669; 
                    font-weight: bold; 
                    border-radius: 8px; 
                    border: 1px dashed #f8bbd0;
                }
                .footer { background: #fff5f7; padding: 20px; text-align: center; font-size: 12px; color: #d23669; }
                .btn { 
                    display: inline-block; 
                    background: linear-gradient(to right, #ff8a9f, #d23669); 
                    color: white; 
                    padding: 12px 30px; 
                    border-radius: 30px; 
                    text-decoration: none; 
                    font-weight: 500; 
                    letter-spacing: 0.5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="https://plus.unsplash.com/premium_photo-1664298572491-fbb6a3212a45?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                         alt="flower-shop" 
                         style="max-width: 80%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                </div>
                
                <div class="content">
                    <h1 style="color: #d23669; font-weight: 300; margin-top: 0; font-size: 24px;">Добро пожаловать в Flower-shop!</h1>
                    
                    <p style="color: #555; font-size: 16px; line-height: 1.6;">Для завершения регистрации используйте этот код подтверждения:</p>
                    
                    <div class="code">${code}</div>
                    
                    <p style="color: #888; font-size: 14px; border-left: 3px solid #f8bbd0; padding-left: 12px;">
                        Код действителен в течение 10 минут. Никому не сообщайте этот код.
                    </p>
                    
                    <div style="margin: 30px 0; text-align: center;">
                        <a href="https://flower-shop.com" class="btn">Перейти в магазин</a>
                    </div>
                </div>
                
                <div class="footer">
                    <p style="margin: 0;">© ${new Date().getFullYear()} Flower-shop. Все права защищены.</p>
                    <p style="margin: 8px 0 0; font-size: 11px; color: #ff8a9f;">С любовью создано для вас</p>
                </div>
            </div>
        </body>
        </html>
        `,
    });
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
