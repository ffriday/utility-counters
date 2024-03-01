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
  const authStore = useAuthStore()
  const { logOut } = authStore
  const { isLogged } = storeToRefs(authStore)

  if (to.name === MyRoutes.home) return;
  if (to.name === MyRoutes.logout) {
    logOut();
    router.push('/')
    return;
  }
  if (to.name !== MyRoutes.login && !isLogged.value) {
    return { name: MyRoutes.login }
  }
  if (to.name === MyRoutes.login && isLogged.value) {
    return { name: '/' }
  }
})

export default router
