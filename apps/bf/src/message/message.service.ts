import { GroupUser } from '@/group/entities/group-user.entity';
import { ChatType } from '@/types';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const entity = this.messageRepository.create({
      content: createMessageDto.content,
      sendId: createMessageDto.sendId,
      toId: createMessageDto.toId,
      type: createMessageDto.type,
      groupId: createMessageDto.groupId,
      sendTime: createMessageDto.sendTime
        ? new Date(createMessageDto.sendTime)
        : new Date(),
    });
    return this.messageRepository.save(entity);
  }

  async findAll() {
    return this.messageRepository.find({
      order: {
        sendTime: 'DESC',
      },
      take: 200,
    });
  }

  async syncByUser(userId: string, since?: number) {
    const qb = this.messageRepository
      .createQueryBuilder('msg')
      .where('msg.isActive = :isActive', { isActive: true });

    if (since) {
      qb.andWhere('msg.sendTime > :since', {
        since: new Date(since),
      });
    }

    const relations = await this.groupUserRepository.find({
      where: { userId, isActive: true },
      select: ['groupId'],
    });
    const groupIds = relations.map((item) => item.groupId).filter(Boolean);

    qb.andWhere(
      `(
        (msg.type = :personType AND (msg.sendId = :userId OR msg.toId = :userId))
        OR (msg.type = :systemType AND msg.toId = :userId)
        OR (msg.type = :groupType AND msg.groupId IN (:...groupIds))
      )`,
      {
        personType: ChatType.person,
        systemType: ChatType.system,
        groupType: ChatType.group,
        userId,
        groupIds: groupIds.length > 0 ? groupIds : ['__none__'],
      },
    );

    return qb.orderBy('msg.sendTime', 'ASC').getMany();
  }

  findOne(id: string) {
    return this.messageRepository.findOneBy({ id });
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    await this.messageRepository.update(id, updateMessageDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.messageRepository.update(id, { isActive: false });
    return { id };
  }
}
