import { Controller, Get, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { User, UserRequest } from './decorators/user.decorator';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { ShopSignupDto } from './dto/shop-signup.dto';
import { ShopSigninDto } from './dto/shop-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signin(@Body() signin: SigninDto) {
    return this.authService.login(signin);
  }

 
  @Post('registration')
  async signup(@Body() signup: SignupDto) {
    return this.authService.registration(signup);
  }

  /**
   * Верификация кода и завершение регистрации пользователя.
   */
  @Post('verify')
  async verify(@Body() signup: SignupDto) {
    const { email, code } = signup;
    return this.authService.verifyCodeAndRegister(email, code, signup);
  }

  /**
   * Проверка валидности токена
   */
  @Post('validatetoken')
  async validatetoken(@Headers('authorization') auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.authService.validateToken(token);
  }

  @Post('shops/registration')
  async shopRegistration(@Body() dto: ShopSignupDto) {
    return this.authService.shopRegistration(dto);
  }

  @Post('shops/verify')
  async shopVerify(@Body() dto: ShopSignupDto) {
    const { email, code } = dto;
    return this.authService.shopVerifyCodeAndRegister(email, code, dto);
  }

  @Post('shops/login')
  async shopLogin(@Body() dto: ShopSigninDto) {
    return this.authService.shopLogin(dto);
  }

  /**
   * Получение профиля пользователя (требует авторизации)
   */
  @Get('profile')
  @UseGuards(AuthGuard)
  getProfile(@User() user: UserRequest) {
    return {
      message: 'Profile accessed successfully',
      user: {
        id: user.sub,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };
  }
}
