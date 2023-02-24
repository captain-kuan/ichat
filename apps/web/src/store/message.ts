export const useMessageStore = defineStore('message', () => {
    interface Conversation {
        type: string;
        id: string;
    }
    
    const conversations = reactive<Conversation[]>([]);
    return { conversations };
});
