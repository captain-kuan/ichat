import { ChatType } from './chat';
export interface BasicMessage {
  id: string;
  type: ChatType; //消息类型
  sendId: string; //消息发送者
  toId: string; //去向
  content: string; //消息内容
  sendTime: Date; //发送时间
}

export interface PersonMessage extends BasicMessage {
  type: ChatType.person;
}
export interface SystemMessage extends BasicMessage {
  type: ChatType.system;
  chatId: 'system'; //消息来源
  sendId: 'system'; //消息发送者
}
export interface GroupMessage extends BasicMessage {
  type: ChatType.group;
  groupId: string; //消息来源
}
export type Message = PersonMessage | GroupMessage | SystemMessage;
export const enum MessageEvent {
  message = 'message',
  addChat = 'addChat',
  sendSuccess = 'sendSuccess',
  offline = 'offline',
}
