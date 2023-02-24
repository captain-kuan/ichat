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
import { Server } from 'socket.io';
import { Observable, of } from 'rxjs';
@WebSocketGateway(3001, { cors: true })
export class MessageGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;
    constructor(private jwtService: JwtService) {}
    async handleConnection(client: any) {
        const token = client.handshake.auth.token;
        try {
            const user: Partial<User> = this.jwtService.verify(token);
            if (!user) {
                client.disconnect();
            }
        } catch (error) {
            client.disconnect();
        }
    }
    @SubscribeMessage('message')
    onEvent(client: any, payload: any): Observable<any> {

        return of({
            event: 'message',
            data: {
                msg: `hello ${payload.name}!`,
            },
        });
    }

    sendMessage() {}
}
