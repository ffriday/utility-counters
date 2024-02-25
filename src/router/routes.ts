import SignUp from '@/components/SignUp.vue'
import SignIn from '@/components/SignIn.vue'
import { MyRoutes } from '@/constants'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: SignIn
  },
  {
    path: `/${MyRoutes.login}`,
    name: MyRoutes.login,
    component: SignIn
  },
  {
    path: `/${MyRoutes.register}`,
    name: MyRoutes.register,
    component: SignUp,
  }
]