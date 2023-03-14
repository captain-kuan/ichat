import 'lib-flexible';
import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import { createPinia } from 'pinia';
import { createPersistedState } from "pinia-plugin-persistedstate"
import './assets/styles/index.scss';
import { handleLogin } from "@/hooks"

const pinia = createPinia();
pinia.use(createPersistedState({
    auto: true
}))
const app = createApp(App)
app.use(pinia).use(router).mount('#app');
handleLogin()