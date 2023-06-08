import { io, Socket } from 'socket.io-client';
import { Message, MessageEvent } from '@ichat/types';

type Handler = (data: Message) => void;
let client: SocketClient;
export class SocketClient {
  #messageHandlers: Map<MessageEvent, Set<Handler>>;
  socket: Socket;
  static connected: boolean;
  constructor(token: string) {
    this.#messageHandlers = new Map();
    this.socket = io('ws://localhost:3001', { auth: { token } });
    this.socket.on('connect', () => {
      console.log('connected');
      SocketClient.connected = true;
    });
  }
  static getClient(token): Promise<SocketClient> {
    return new Promise((resolve) => {
        if (!client) {
          client = new SocketClient(token);
        }
        if (SocketClient.connected) {
          return resolve(client);
        }
        client.socket.on('connect', () => {
          resolve(client);
        });
      
    });
  }
  emit(type: MessageEvent, data: Omit<Message, 'id' | 'sendTime'>) {
    this.socket.emit(type, { ...data, sendTime: new Date() });
  }
  on(type: MessageEvent, handler: Handler) {
    this.socket.on(type, handler);
  }
}
  
