import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({ 
  imports: [ HttpModule ],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
