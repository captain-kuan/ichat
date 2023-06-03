import { User } from '@/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Observable, of } from 'rxjs';
import { MessageEvent } from '@ichat/types';

@WebSocketGateway(3001, { cors: true })
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  chats: Map<string, string>;
  constructor(private jwtService: JwtService) {
    this.chats = new Map();
  }
  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    try {
      const user: Partial<User> = this.jwtService.verify(token);

      if (!user) {
        client.disconnect();
      } else {
        this.chats.set(String(user.id), client.id);
      }
    } catch (error) {
      console.log(error);
      client.disconnect();
    }
  }
  @SubscribeMessage(MessageEvent.message)
  async onEvent(client: Socket, payload: any): Promise<Observable<any>> {
    const flag = await this.sendMessage(MessageEvent.message, payload);

    const message = {
      chatId: 'system',
      sendId: 'system',
      id: '',
      type: 'system',
      toId: payload.sendId,
      content: '',
      sendTime: new Date(),
    };
    return of({
      event: flag ? MessageEvent.sendSuccess : MessageEvent.offline,
      data: message,
    });
  }
  sendMessage(
    type,
    content: { content: string; toId: string; sendId: string },
  ) {
    return new Promise((resolve) => {
      const clientId = this.chats.get(content.toId);
      if (clientId) {
        this.server
          .to(clientId)
          .emit(type, { ...content, sendTime: new Date() }, () => {
            resolve(true);
          });
      } else {
        resolve(false);
      }
    });
  }
}
