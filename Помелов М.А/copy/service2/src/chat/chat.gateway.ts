import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { response } from 'express';
import { Server, Socket } from 'socket.io';
import { Product } from 'src/products/entities/product.entity';

@WebSocketGateway({
  cors: { // Настройка CORS
    origin: '*' // Разрешаем подключение с любого источника
  }
})
export class ChatGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket): Promise<void> {
    this.server.emit('message', message) // Отправляем сообщение всем подписанным пользователям

    let data: Response = await fetch(`http://products_service:3002/products/search?=searchWord=${message}`);
    client.emit('message', data.json())


  }
}