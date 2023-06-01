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
  users: Map<string, string>;
  constructor(private jwtService: JwtService) {
    this.users = new Map();
  }
  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    try {
      const user: Partial<User> = this.jwtService.verify(token);

      if (!user) {
        client.disconnect();
      } else {
        this.users.set(String(user.id), client.id);
      }
    } catch (error) {
      console.log(error);
      client.disconnect();
    }
  }
  @SubscribeMessage(MessageEvent.message)
  onEvent(client: Socket, payload: any): Observable<any> {
    this.sendMessage(MessageEvent.message, payload);
    const message = {
      formId: 'system',
      sendId: 'system',
      id: '',
      type: 'system',
      toId: payload.sendId,
      content: '',
      sendTime: new Date(),
    };
    return of({
      event: MessageEvent.sendSuccess,
      data: message,
    });
  }
  sendMessage(
    type,
    content: { content: string; toId: string; sendId: string },
  ) {
    const clientId = this.users.get(content.toId);
    if (clientId) {
      this.server.to(clientId).emit(type, { ...content, sendTime: new Date() });
    } else {
      console.log(content.toId + '不在线');
    }
    return content;
  }
}
