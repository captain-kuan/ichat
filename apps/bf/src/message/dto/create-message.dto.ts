import { ChatType } from '@/types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  toId: string;

  @IsString()
  @IsNotEmpty()
  sendId: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(ChatType)
  type: ChatType;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  sendTime?: Date | string;
}
