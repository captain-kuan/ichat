import { io, Socket } from 'socket.io-client';
import { Message, MessageEvent } from '@ichat/types';
import { useLoginCallBack } from '@/hooks';

type Handler = (data: Message) => void;
export class SocketClient {
  #messageHandlers: Map<MessageEvent, Set<Handler>>;
  socket: Socket;
  static socketPath: 'ws://localhost:3001';
  static client: SocketClient;
  static connected: true;
  constructor(socketPath: string, token: string) {
    this.#messageHandlers = new Map();
    this.socket = io(socketPath, { auth: { token } });
    this.socket.on('connect', () => {
      console.log('connected');
      SocketClient.connected = true;
      SocketClient.client.addMessageHandle();
    });
  }
  static getClient(): Promise<SocketClient> {
    return new Promise((resolve) => {
      useLoginCallBack((token) => {
        if (!SocketClient.client) {
          SocketClient.client = new SocketClient(
            SocketClient.socketPath,
            token,
          );
        }
        if (SocketClient.connected) {
          return resolve(SocketClient.client);
        }
        SocketClient.client.socket.on('connect', () => {
          resolve(SocketClient.client);
        });
      });
    });
  }
  private addMessageHandle() {
    const events = [MessageEvent.message, MessageEvent.addFriend];
    for (const event of events) {
      this.socket.on(event, (data) => {
        const handlers = this.#messageHandlers.get(event);
        if (handlers) {
          handlers.forEach((handler) => {
            handler(data);
          });
        }
      });
    }
  }
  public emit(type: MessageEvent, data: Omit<Message, 'id' | 'sendTime'>) {
    this.socket.emit(type, data);
  }
  on(type: MessageEvent, handler: Handler) {
    const handlers = this.#messageHandlers.get(type);
    if (handlers) {
      handlers.add(handler);
    } else {
      const hs = new Set<Handler>();
      hs.add(handler);
      this.#messageHandlers.set(type, hs);
    }
  }
  unsubscribe(type: MessageEvent, handler: Handler) {
    const handlers = this.#messageHandlers.get(type);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}
