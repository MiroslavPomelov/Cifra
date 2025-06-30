import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { User, UserRequest } from './decorators/user.decorator';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  signin(@Body() signin: SigninDto) {
    return this.authService.login(signin);
  }

  @Post('registration')
  signup(@Body() signup: SignupDto) {
    return this.authService.registration(signup);
  }

  @Post('validatetoken')
  validatetoken(@Body() token: string) {
    return this.authService.validateToken(token);
  }

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
