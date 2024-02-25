import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const id = ref('')
  const isLogged = computed(() => Boolean(id.value))
  function logIn(newID: string) {
    id.value = newID
  }
  function logOut() {
    id.value = ''
  }

  return { id, isLogged, logIn, logOut }
})
