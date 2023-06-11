import { Router } from 'vue-router';

function authGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    next();
  });
}

export function useGuard(router: Router) {
  authGuard(router);
}
