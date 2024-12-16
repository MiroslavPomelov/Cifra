import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersmoduleModule } from './usersmodule/usersmodule.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { CollectorService } from './shared/collector/collector.service';
import { CollectorModule } from './shared/collector/collector.module';

@Module({
  imports: [UsersmoduleModule, TasksModule, UsersModule, CollectorModule],
  controllers: [AppController],
  providers: [AppService, CollectorService],
})
export class AppModule {}
