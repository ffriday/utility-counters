import { LogInVue } from '@/components'
import { MyRoutes } from '@/constants'
import { myHomeVue, NotFoundVue } from '@/pages'

export const routes = [
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