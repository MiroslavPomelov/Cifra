import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CollectorModule } from 'src/shared/collector/collector.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [CollectorModule]
})
export class UsersModule {}
