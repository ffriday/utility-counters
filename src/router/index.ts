import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { MyRoutes } from '@/constants'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const store = useAuthStore()
  const { isLogged } = storeToRefs(store)

  console.log(to.name, to.name === MyRoutes.home)
  if (to.name === MyRoutes.home) return;
  if (to.name !== MyRoutes.login && !isLogged.value) {
    return { name: MyRoutes.login }
  }
})

export default router
