import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
const router = createRouter({
    routes: [
        {
            path: '/',
            redirect: '/message',
        },
        ...routes,
        {
            path: '/settings',
            meta: { isAuth: false },
            component: () => import('@/views/Settings.vue'),
        },
        {
            path: '/login',
            name: 'Login',
            meta: { isAuth: false },
            component: () => import('@/views/auth/Login.vue'),
        },
        {
            path: '/register',
            component: () => import('@/views/auth/Register.vue'),
        },

        {
            path: '/games',
            meta: { isAuth: false },
            component: () => import('@/views/Games.vue'),
        },

        {
            path: '/face',
            meta: { isAuth: true },
            component: () => import('@/views/Face.vue'),
        },
    ],
    history: createWebHistory(),
});

export default router;
