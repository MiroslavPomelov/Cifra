import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [HttpModule, ChatModule]  
})
export class AppModule {}
