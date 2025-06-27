import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';

@Module({
  imports: [
    HttpModule, // Для axios-запросов
    JwtModule.register({
      secret: 'your-secret-key', // Замените!
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}