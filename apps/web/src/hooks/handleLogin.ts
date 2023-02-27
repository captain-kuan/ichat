import { socket, emitter } from "@/utils"
import { useChatsStore } from "@/store"
export function handleLogin() {
    const token = localStorage.getItem('token')
    const { handleMessage } = useChatsStore()
    const callback = (token: string) => {
        socket.init({ token })
        socket.addMessageHandler((msg) => {
            handleMessage(msg)
        })
    }
    if (token) {
        callback(token)
    } else {
        emitter.on("login", () => {
            callback(localStorage.getItem('token'))
        })
    }

}