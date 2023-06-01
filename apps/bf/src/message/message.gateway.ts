import { AuthService } from '@/auth/auth.service';
import { User } from '@/user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
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
    return of({
      event: MessageEvent.message,
      data: {
        payload,
        msg: `hello ${payload.sendId}!`,
      },
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
