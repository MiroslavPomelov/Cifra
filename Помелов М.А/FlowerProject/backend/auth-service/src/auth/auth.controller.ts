import { Controller, Get, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { User, UserRequest } from './decorators/user.decorator';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

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

  @Post('validatetoken')
  async validatetoken(@Headers('authorization') auth: string) {
    const token = auth?.replace('Bearer ', '');
    return this.authService.validateToken(token);
  }


  //КОД НА ПОЧТУ
  @Post('send-code')
  async sendCode(@Body('email') email: string) {
    return this.authService.sendVerificationCode(email);
  }

  @Post('verify')
  async verify(
    @Body('email') email: string,
    @Body('code') code: string,
     @Body() signup: SignupDto
  ) {
    return this.authService.verifyCodeAndRegister(email, code, signup);
  }

  //Проверка на польз
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
