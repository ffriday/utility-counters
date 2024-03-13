import { MyRoutes } from '@/constants'
import { myHomeVue, NotFoundVue, LogInVue } from '@/pages'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: MyRoutes.home,
    component: myHomeVue
  },
  {
    path: `/${MyRoutes.login}`,
    name: MyRoutes.login,
    component: LogInVue
  },
  {
    path: `/${MyRoutes.logout}`,
    name: MyRoutes.logout,
    component: myHomeVue
  },
  {
    path: '/:pathMatch(.*)*',
    name: MyRoutes.notFound,
    component: NotFoundVue
  }
]