import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async signin(@Body() signinDto: SigninDto) {
    const user = await this.authService.validateUser(signinDto.email, signinDto.password);
    return this.authService.login(user);
  }

  @Post('registration')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.validateUser(signupDto.email, signupDto.password);
    return this.authService.login(user);
  }
}