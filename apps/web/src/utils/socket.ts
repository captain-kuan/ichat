import { Message, MessageEvent } from '@ichat/types';
import { io, Socket } from 'socket.io-client';

interface Handler {
  (data: any): void;
}
let _socket: Socket;
export class SignSocket {
  messageHandlers: Map<MessageEvent, Set<Handler>>;
  constructor(public socketPath: string) {
    this.messageHandlers = new Map();
  }

  init({ token }) {
    if (_socket) return;
    _socket = io(this.socketPath, {
      auth: { token },
    });
    return new Promise<void>((resolve) => {
      _socket.on('connect', function () {
        resolve();
      });
      for (const event in MessageEvent) {
        _socket.on(event, (data) => {
          this.handleMessage(event as MessageEvent, data);
        });
      }
    });
  }
  handleMessage(type: MessageEvent, data: any) {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.forEach((handler) => {
        handler(data);
      });
    }
  }
  sendMessage(data: Omit<Message, 'id' | 'sendTime'>) {
    _socket.emit('message', data);
  }
  addMessageHandler(type: MessageEvent, handler: Handler) {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.add(handler);
    } else {
      const hs = new Set<Handler>();
      hs.add(handler);
      this.messageHandlers.set(type, hs);
    }
  }
  removeMessageHandler(type: MessageEvent, handler: Handler) {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}

const socket = new SignSocket('ws://localhost:3001/');
export default socket;
