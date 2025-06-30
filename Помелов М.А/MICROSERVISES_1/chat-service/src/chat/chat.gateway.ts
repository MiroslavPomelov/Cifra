import { UnauthorizedException } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*' //Разрешаем подключение с любого источника
  },
  namespace: '/chat'
})
export class ChatGateway {
    constructor(    
    private readonly httpService: HttpService
    , private readonly chatService: ChatService) {}

  @WebSocketServer()
    server: Server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): Promise<void> {
    try{
    const response: AxiosResponse = await this.chatService.findInProductsDb(message);
      
    client.emit('message', response.data);
    }
    catch (error) {
      console.error('Error finding products:', error);
      throw new UnauthorizedException(`Unable to verify products with word: ${message}`);
    }       
  }  
}