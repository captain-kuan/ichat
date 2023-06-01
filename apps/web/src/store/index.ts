import { createPersistedState } from 'pinia-plugin-persistedstate';
import { App } from 'vue';

export { storeToRefs } from './storeToRefs';
export * from './message';
export * from './chats';
export * from './user';

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
