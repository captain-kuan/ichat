import 'lib-flexible';
import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import { createPinia } from 'pinia';
import './assets/styles/index.scss';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:3001/', {
    auth: { token: localStorage.getItem('token') },
});

socket.on('connect', function () {
    console.log('链接成功');
    // 发射
    socket.emit('message', {
        name: 'ajanuw',
    });

    // 发射
    socket.emit('message', {
        name: 'alone',
    });
});

// 监听
socket.on('message', (data) => {
    console.log(data.msg);
});
socket.on('disconnect', () => {
    console.log('disconnect');
});
const store = createPinia();
createApp(App).use(store).use(router).mount('#app');
