import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { MessageGateway } from './message.gateway';
@Injectable()
export class MessageService {
    @WebSocketServer()
    server: Server;

    constructor(private messageGateway: MessageGateway) {}
    create(createMessageDto: CreateMessageDto) {
        this.messageGateway.server.emit('message', {
            msg: `hello public msg!`,
        });
        return 'This action adds a new message';
    }

    findAll() {
        return `This action returns all message`;
    }

    findOne(id: number) {
        return `This action returns a #${id} message`;
    }

    update(id: number, updateMessageDto: UpdateMessageDto) {
        return `This action updates a #${id} message`;
    }

    remove(id: number) {
        return `This action removes a #${id} message`;
    }
}
