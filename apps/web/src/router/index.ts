import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import IndexVue from '@/layouts/Index.vue';
import { useGuard } from './guard';

const router = createRouter({
  routes: [
    {
      path: '/',
      component: IndexVue,
      redirect: '/chat',
      children: [
        ...routes,
        {
          path: '/settings',
          meta: { isAuth: false, pageType: 'main' },
          component: () => import('@/views/common/Settings.vue'),
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
      ],
    },
  ],
  history: createWebHistory(),
});

useGuard(router);

export default router;
