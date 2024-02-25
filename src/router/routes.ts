import { LogInVue } from '@/components'
import { MyRoutes } from '@/constants'
import { myHomeVue } from '@/pages'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: myHomeVue
  },
  {
    path: `/${MyRoutes.login}`,
    name: MyRoutes.login,
    component: LogInVue
  },
]