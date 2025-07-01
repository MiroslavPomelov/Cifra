import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'auth-service'
    };
  }

  @Get()
  getHello() {
    return {
      message: 'Auth Service is running',
      endpoints: {
        health: '/health',
        registration: '/auth/registration',
        login: '/auth/login',
        profile: '/auth/profile'
      }
    };
  }
}
