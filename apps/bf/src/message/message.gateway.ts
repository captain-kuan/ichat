import { GroupUser } from '@/group/entities/group-user.entity';
import { ChatType } from '@/types';
import { User } from '@/user/entities/user.entity';
import { MessageEvent } from '@ichat/types';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { Server, Socket } from 'socket.io';
import { Message } from './entities/message.entity';

type OutboundMessage = {
  content: string;
  toId: string;
  sendId: string;
  type: ChatType;
  groupId?: string;
  sendTime: Date;
};

@WebSocketGateway(3001, { cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly userSockets = new Map<string, Set<string>>();
  private readonly socketUsers = new Map<string, string>();

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;

    try {
      const user = this.jwtService.verify(token) as Partial<User>;
      const userId = user?.id ? String(user.id) : '';
      if (!userId) {
        client.disconnect();
        return;
      }

      this.bindSocketToUser(userId, client.id);
      await this.joinUserGroupRooms(client, userId);
    } catch (error) {
      console.log(error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.socketUsers.get(client.id);
    if (!userId) {
      return;
    }

    const sockets = this.userSockets.get(userId);
    if (!sockets) {
      this.socketUsers.delete(client.id);
      return;
    }

    sockets.delete(client.id);
    if (sockets.size === 0) {
      this.userSockets.delete(userId);
    }
    this.socketUsers.delete(client.id);
  }

  @SubscribeMessage(MessageEvent.message)
  async onEvent(client: Socket, payload: any): Promise<Observable<any>> {
    const message = this.normalizeMessagePayload(payload);
    await this.saveMessage(message);
    const delivered = await this.sendMessage(MessageEvent.message, message, {
      senderSocketId: client.id,
    });

    return of({
      event: delivered ? MessageEvent.sendSuccess : MessageEvent.offline,
      data: {
        chatId: 'system',
        sendId: 'system',
        id: '',
        type: ChatType.system,
        toId: message.sendId,
        content: '',
        sendTime: new Date(),
      },
    });
  }

  async sendMessage(
    eventType: string,
    message: {
      content: string;
      toId: string;
      sendId: string;
      type: ChatType;
      groupId?: string;
      sendTime?: Date | string;
    },
    options?: {
      senderSocketId?: string;
    },
  ) {
    const normalized = this.normalizeMessagePayload(message);

    switch (normalized.type) {
      case ChatType.person:
      case ChatType.system:
        return this.sendMessageToUser(eventType, normalized);
      case ChatType.group:
        return this.sendMessageToGroup(eventType, normalized, options);
      default:
        throw Error(`not impl send this ${normalized.type} type message`);
    }
  }

  private bindSocketToUser(userId: string, socketId: string) {
    const sockets = this.userSockets.get(userId) || new Set<string>();
    sockets.add(socketId);
    this.userSockets.set(userId, sockets);
    this.socketUsers.set(socketId, userId);
  }

  private async joinUserGroupRooms(client: Socket, userId: string) {
    const relations = await this.groupUserRepository.find({
      where: {
        userId,
        isActive: true,
      },
      select: ['groupId'],
    });

    relations.forEach((relation) => {
      if (relation.groupId) {
        client.join(this.getGroupRoomName(relation.groupId));
      }
    });
  }

  private sendMessageToUser(msgType: string, content: OutboundMessage) {
    const targetSockets = this.userSockets.get(content.toId);
    if (!targetSockets || targetSockets.size === 0) {
      return Promise.resolve(false);
    }

    targetSockets.forEach((socketId) => {
      this.server.to(socketId).emit(msgType, content);
    });
    return Promise.resolve(true);
  }

  private sendMessageToGroup(
    msgType: string,
    content: OutboundMessage,
    options?: { senderSocketId?: string },
  ) {
    const groupId = content.groupId || content.toId;
    if (!groupId) {
      return Promise.resolve(false);
    }

    const room = this.getGroupRoomName(groupId);
    const roomSockets = this.server.sockets.adapter.rooms.get(room);
    if (!roomSockets || roomSockets.size === 0) {
      return Promise.resolve(false);
    }

    let delivered = false;
    roomSockets.forEach((socketId) => {
      if (socketId === options?.senderSocketId) {
        return;
      }
      this.server.to(socketId).emit(msgType, {
        ...content,
        groupId,
      });
      delivered = true;
    });

    return Promise.resolve(delivered);
  }

  private async saveMessage(message: OutboundMessage) {
    const entity = this.messageRepository.create({
      content: message.content,
      sendId: message.sendId,
      toId: message.toId,
      type: message.type,
      groupId: message.groupId,
      sendTime: message.sendTime,
    });
    await this.messageRepository.save(entity);
    return entity;
  }

  private normalizeMessagePayload(message: {
    content: string;
    toId: string;
    sendId: string;
    type: ChatType;
    groupId?: string;
    sendTime?: Date | string;
  }): OutboundMessage {
    const sendTime = message.sendTime ? new Date(message.sendTime) : new Date();
    return {
      content: message.content,
      toId: String(message.toId),
      sendId: String(message.sendId),
      type: message.type,
      groupId: message.groupId ? String(message.groupId) : undefined,
      sendTime: Number.isNaN(sendTime.getTime()) ? new Date() : sendTime,
    };
  }

  private getGroupRoomName(groupId: string) {
    return `group:${groupId}`;
  }
}
