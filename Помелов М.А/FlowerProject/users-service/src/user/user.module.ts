// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ← Это регистрирует репозиторий
  providers: [UserService],
  exports: [TypeOrmModule, UserService], // ← Важно экспортировать TypeOrmModule
})
export class UserModule {}