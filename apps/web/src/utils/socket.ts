import { io, Socket } from 'socket.io-client';

let _socket: Socket
export class SignSocket {
    messageHandlers: Set<(data: any) => void>
    constructor(public socketPath: string) {
        this.messageHandlers = new Set()
    }

    init({ token }) {
        if (_socket) return
        _socket = io(this.socketPath, {
            auth: { token},
        });
        return new Promise<void>(resolve => {
            _socket.on('connect', function () {
                resolve()
            });
            _socket.on("message", (data: any) => {
                this.messageHandlers.forEach(handler => {
                    handler(data)
                });
            })
        })
    }
    sendMessage(data: any) {
        _socket.emit("message", data)
    }
    addMessageHandler(handler: (data) => void) {
        this.messageHandlers.add(handler)
    }
    removeMessageHandler(handler: (data) => void) {
        this.messageHandlers.delete(handler)
    }
}

const socket = new SignSocket('ws://localhost:3001/')
export default socket