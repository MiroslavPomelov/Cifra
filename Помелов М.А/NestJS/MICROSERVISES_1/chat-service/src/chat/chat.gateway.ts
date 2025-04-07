import { UnauthorizedException } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '*' //Разрешаем подключение с любого источника
  },
  namespace: '/chat'
})
export class ChatGateway {
  @WebSocketServer()
    server: Server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      const data: Response = await fetch(`http://products-service:3002/products/search?searchWord=${message}`);

      if (!data.ok) {
             throw new UnauthorizedException(`Failed to fetch product with word: ${message}`);
      }
      
      client.emit('message', data.json())
    }
    catch (error) {
      console.error('Error fetching products:', error);
      throw new UnauthorizedException(`Unable to verify products with word: ${message}`);
    }       
  }  
}