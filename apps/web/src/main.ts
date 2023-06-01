import 'lib-flexible';
import './assets/styles/index.css';
import 'vant/es/toast/style';
import 'vant/es/notify/style';
import 'vant/es/dialog/style';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';

const app = createApp(App);
app.use(store).use(router).mount('#app');

