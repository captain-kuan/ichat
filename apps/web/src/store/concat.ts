import { Chat, ChatType, GroupChat, Message, PersonChat } from '@ichat/types';

export const useContactStore = defineStore('chats', () => {
  const contact = shallowRef<PersonChat[]>([]);
  const groups = reactive<GroupChat[]>([]);
  const getGroupDetail = ()=>{
    
  }
  const getContact = () => {
    contact.value = [
      {
        id: '123',
        avatar: '',
        type: ChatType.person,
        name: 'test',
      },
    ];
  };
  return { getContact, contact, groups };
});
