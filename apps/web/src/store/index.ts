import { createPersistedState } from 'pinia-plugin-persistedstate';
import { App } from 'vue';

export { storeToRefs } from './storeToRefs';
export { useMessageStore } from './message';
export { useChatsStore } from './chats';
export { useContactStore } from './concat';
export { useUserStore } from './user';

export const pinia = createPinia();
pinia.use(
  createPersistedState({
    auto: true,
  }),
);

export default {
  install(app: App) {
    app.use(pinia);
  },
};
