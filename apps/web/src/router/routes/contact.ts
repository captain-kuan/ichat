import { RouteRecordRaw } from 'vue-router';

export const contactRoute: RouteRecordRaw = {
  path: '/contact',
  redirect: '/contact/list',
  meta: { isAuth: false },
  children: [
    {
      path: 'list',
      meta: { isAuth: false, pageType: 'main' },
      component: () => import('@/views/contact/List.vue'),
    },
    {
      path: 'add',
      meta: { isAuth: false, title: '添加好友' },
      component: () => import('@/views/contact/Add.vue'),
    },
    {
      path: 'new-friends',
      meta: { isAuth: false, title: '添加好友' },
      component: () => import('@/views/contact/NewFriends.vue'),
    },
  ],
};
