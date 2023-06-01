import { ChatType } from '.';
export interface Message {
  id: string;
  type: ChatType; //消息类型
  formId: string; //消息来源
  sendId: string; //消息发送者
  toId: string; //去向
  content: string; //消息内容
  sendTime: Date; //发送时间
}

export const enum MessageEvent {
  message = 'message',
  addChat = 'addChat',
}
