import { RouteRecordRaw } from 'vue-router';

export const contactRoute: RouteRecordRaw = {
  path: '/contact',
  redirect: '/contact/list',
  meta: { isAuth: false },
  children: [
    {
      path: 'list',
      meta: { isAuth: true, pageType: 'main' },
      component: () => import('@/views/contact/List.vue'),
    },
    {
      path: 'add',
      meta: { isAuth: true, title: '添加好友' },
      component: () => import('@/views/contact/Add.vue'),
    },
    {
      path: 'new-friends',
      meta: { isAuth: true, title: '添加好友' },
      component: () => import('@/views/contact/NewFriends.vue'),
    },
    {
      path: 'join-group',
      meta: { isAuth: true, title: '发起群聊' },
      component: () => import('@/views/contact/JoinGroup.vue'),
    },
  ],
};
