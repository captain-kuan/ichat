import { Chat } from "@ichat/types";
import request from "@/utils/request";

export function getChatDetails(chatId: string) {
    return request.get<Chat>('/chat', { data: chatId })
}