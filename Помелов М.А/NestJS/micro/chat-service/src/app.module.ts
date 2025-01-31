import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [],
  providers: [ChatGateway],
})
export class AppModule {}
