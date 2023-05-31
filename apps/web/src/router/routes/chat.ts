import { RouteRecordRaw } from 'vue-router';
export const messageRoute: RouteRecordRaw = {
    path: '/chat',
    redirect: '/chat/list',
    meta: { isAuth: false },
    children: [
        {
            path: 'list',
            meta: { isAuth: false },
            component: () => import('@/views/chat/List.vue'),
        },
        {
            path: 'room/:id?',
            meta: { isAuth: false },
            component: () => import('@/views/chat/Chat.vue'),
        },
    ],
};
