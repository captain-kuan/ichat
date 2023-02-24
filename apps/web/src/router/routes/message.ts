import { RouteRecordRaw } from 'vue-router';
export const messageRoute: RouteRecordRaw = {
    path: '/message',
    redirect: '/message/list',
    meta: { isAuth: false },
    children: [
        {
            path: 'list',
            meta: { isAuth: false },
            component: () => import('@/views/message/List.vue'),
        },
        {
            path: 'detail',
            meta: { isAuth: false },
            component: () => import('@/views/message/Detail.vue'),
        },
    ],
};
