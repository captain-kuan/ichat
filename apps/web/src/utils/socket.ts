import { io, Socket } from 'socket.io-client';

export enum MessageType {
  connect = '1',
  message = '2',
}
interface Handler {
  (data: any): void;
}
let _socket: Socket;
export class SignSocket {
  messageHandlers: Map<MessageType, Set<Handler>>;
  constructor(public socketPath: string) {
    this.messageHandlers = new Map();
  }

  init({ token }) {
    if (_socket) return;
    _socket = io(this.socketPath, {
      auth: { token },
    });
    return new Promise<void>((resolve) => {
      _socket.on(MessageType.connect, function () {
        resolve();
      });
      _socket.on(MessageType.message, (data: any) => {
        const handlers = this.messageHandlers.get(MessageType.message);
        if (handlers) {
          handlers.forEach((handler) => {
            handler(data);
          });
        }
      });
    });
  }
  sendMessage(data: any) {
    _socket.emit('message', data);
  }
  addMessageHandler(type: MessageType, handler: Handler) {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.add(handler);
    } else {
      const hs = new Set<Handler>();
      hs.add(handler);
      this.messageHandlers.set(type, hs);
    }
  }
  removeMessageHandler(type: MessageType, handler: Handler) {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}

const socket = new SignSocket('ws://localhost:3001/');
export default socket;
