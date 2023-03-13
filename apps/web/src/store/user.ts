import { User } from "@ichat/types"
import { login as _login, LoginParams } from "@/apis"
import { useChatsStore } from "@/store"
import { emitter } from "@/utils"
export const useUserStore = defineStore("user", () => {
    const { handleMessage } = useChatsStore()
    const user = ref<User>({ id: "", name: "", avatar: "" })
    const login = async (params: LoginParams) => {
        const { code, data } = await _login(params)
        if (code === 0) {
            localStorage.setItem('token', data.access_token);
            emitter.emit("login")
        }
    }
    return { user, login }
})