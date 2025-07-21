import { Injectable, UnauthorizedException, BadRequestException, Logger, Inject } from '@nestjs/common';
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
import { ShopSignupDto } from './dto/shop-signup.dto';
import { ShopSigninDto } from './dto/shop-signin.dto';
// import { Cache } from 'cache-manager';
const { createClient } = require('redis');

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private redisClient;

  constructor(
    @InjectRepository(VerificationCode)
    private verificationRepo: Repository<VerificationCode>,
    private readonly mailerService: MailerService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    // @Inject('CACHE_MANAGER')
    // private cacheManager: Cache,
  ) {
    this.logger.log(`[DEBUG] ENV_TOKEN used for interservice auth: ${this.configService.get('ENV_TOKEN')}`);
    this.redisClient = createClient({
      url: `redis://${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`
    });
    this.redisClient.connect().then(() => {
      this.logger.log('[DEBUG] Connected to Redis via node-redis');
    }).catch((err) => {
      this.logger.error('[DEBUG] Redis connection error: ' + err.message);
    });
  }

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
    // Проверка существования пользователя
    const userExists = await this.checkUserExistsByEmail(signup.email);
    if (userExists) {
      throw new BadRequestException('Пользователь с таким email уже существует');
    }
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
        { secret: this.configService.get('JWT_SECRET') }
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
      secret: this.configService.get('JWT_SECRET'),
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
    const cooldownKey = `email_cooldown:${email}`;
    const codeKey = `verification:code:${email}`;

    // Проверка cooldown через node-redis
    const isCooldown = await this.redisClient.get(cooldownKey);
    if (isCooldown) {
      throw new BadRequestException('Повторный код можно запросить только через 1 минуту');
    }
    await this.redisClient.set(cooldownKey, 1, { EX: 60 });

    // Проверка, не отправлен ли уже код (например, если пользователь не ввёл старый)
    let code: string | undefined;
    code = await this.redisClient.get(codeKey);
    if (code) {
      this.logger.warn(`Код подтверждения для ${email} уже отправлен недавно (кэш)`);
      return;
    }
    code = crypto.randomInt(100000, 999999).toString();
    this.logger.warn(`КОД - ${code}`);
    await this.verificationRepo.save({ email, code });
    await this.redisClient.set(codeKey, code, { EX: 180 }); // 3 минуты

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Код для регистрации',
        html: `<h2>Добро пожаловать в Flower-shop!</h2><p>Ваш код подтверждения: <b>${code}</b></p>`
      });
      this.logger.log(`Письмо успешно отправлено на ваш ${email}`);
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
    try {
      await this.redisClient.del(`verification:code:${email}`);
    } catch (error) {
      this.logger.warn(`Redis del error for verification:code:${email}: ${error.message}`);
    }
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

  // Проверка существования пользователя по email через users-service
  private async checkUserExistsByEmail(email: string): Promise<boolean> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(
          `${this.getUsersServiceUrl()}/users`,
          { headers: this.getServiceHeaders() }
        )
      );
      // users-service возвращает массив пользователей
      const users = response.data;
      return Array.isArray(users) && users.some((u: any) => u.email === email);
    } catch (error) {
      // Если сервис недоступен или другая ошибка, логируем и считаем, что пользователя нет
      this.logger.error(`Ошибка при проверке пользователя по email: ${email}: ${error.message}`);
      return false;
    }
  }



  async shopLogin(dto: ShopSigninDto): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(
          `${this.configService.get('SHOP_SERVICE_URL') || 'http://shop-service:3000'}/shops/login`,
          dto,
          { headers: this.getServiceHeaders() }
        )
      );
      const { shop } = response.data;
      // Генерируем accessToken в auth-service
      const payload = { sub: shop.id, email: shop.email, role: 'shop' };
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      });
      return {
        message: 'Shop login successful',
        accessToken,
        shop: {
          id: shop.id,
          email: shop.email,
          name: shop.name,
          address: shop.address
        }
      };
    } catch (error) {
      this.logger.error(`Shop login error: ${error.message}`);
      this.handleAuthError(error);
    }
  }

  async shopRegistration(dto: ShopSignupDto): Promise<{ message: string }> {
    // Проверка существования магазина
    const shopExists = await this.checkShopExistsByEmail(dto.email);
    if (shopExists) {
      throw new BadRequestException('Магазин с таким email уже существует');
    }
    await this.generateAndSendShopVerificationCode(dto.email);
    return { message: 'Verification code has been sent to your email' };
  }

  async shopVerifyCodeAndRegister(email: string, code: string, signup: ShopSignupDto): Promise<any> {
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
      this.logger.log(`Attempt shop registration for: ${signup.email}`);
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.configService.get('SHOP_SERVICE_URL') || 'http://shop-service:3000'}/shops/registration`,
          signupWithoutCode,
          { headers: this.getServiceHeaders() }
        )
      );
      const { accessToken, shop } = response.data;
      this.logger.log(`Successful shop registration: ${shop.email}`);
      return {
        message: 'Shop registration successful!',
        accessToken,
        shop: {
          id: shop.id,
          email: shop.email,
          name: shop.name,
          address: shop.address
        }
      };
    } catch (error) {
      this.logger.error(`Shop registration error for: ${signup.email}: ${error.message}`);
      this.handleAuthError(error);
    }
  }

  private async checkShopExistsByEmail(email: string): Promise<boolean> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(
          `${this.configService.get('SHOP_SERVICE_URL') || 'http://shop-service:3000'}/shops`,
          { headers: this.getServiceHeaders() }
        )
      );
      const shops = response.data;
      return Array.isArray(shops) && shops.some((s: any) => s.email === email);
    } catch (error) {
      this.logger.error(`Ошибка при проверке магазина по email: ${email}: ${error.message}`);
      return false;
    }
  }

  private async generateAndSendShopVerificationCode(email: string) {
    const cooldownKey = `shop_email_cooldown:${email}`;
    const codeKey = `shop_verification:code:${email}`;

    // Проверка cooldown через node-redis
    const isCooldown = await this.redisClient.get(cooldownKey);
    if (isCooldown) {
      throw new BadRequestException('Повторный код для магазина можно запросить только через 1 минуту');
    }
    await this.redisClient.set(cooldownKey, 1, { EX: 60 });

    // Проверка, не отправлен ли уже код
    let code = await this.redisClient.get(codeKey);
    if (code) {
      this.logger.warn(`Код подтверждения для магазина ${email} уже отправлен недавно (кэш)`);
      return;
    }
    code = crypto.randomInt(100000, 999999).toString();
    this.logger.warn(`КОД ДЛЯ МАГАЗИНА - ${code}`);
    await this.verificationRepo.save({ email, code });
    await this.redisClient.set(codeKey, code, { EX: 180 }); // 3 минуты

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Код для регистрации магазина',
        html: `<h2>Добро пожаловать в Flower-shop!</h2><p>Ваш код подтверждения для регистрации магазина: <b>${code}</b></p>`
      });
      this.logger.log(`Письмо успешно отправлено на ${email}`);
    } catch (error) {
      this.logger.error(`Ошибка при отправке письма на ${email}: ${error.message}`, error.stack);
      throw new Error('Ошибка при отправке письма: ' + error.message);
    }
  }
}
