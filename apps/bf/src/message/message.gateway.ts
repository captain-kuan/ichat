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
@WebSocketGateway(3001, { cors: true })
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;
  users: Map<string, string>
  constructor(private jwtService: JwtService) {
    this.users = new Map()
    
  }
  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    try {
      const user: Partial<User> = this.jwtService.verify(token);

      if (!user) {
        client.disconnect();
      } else {
        this.users.set(String(user.id), client.id)
      }
    } catch (error) {
      console.log(error);
      client.disconnect();
    }
  }
  @SubscribeMessage('message')
  onEvent(client: Socket, payload: any): Observable<any> {
    const clientId = this.users.get(String(payload.toId))
    if (clientId) {
      client.to(clientId).emit('message', {...payload,sendTime:new Date()})
    } else {
      console.log(payload.toId + '不在线');

    }
    return of({
      event: 'message',
      data: {
        payload,
        msg: `hello ${payload.sendId}!`,
      },
    });
  }

  sendMessage() {
    return '';
  }
}
