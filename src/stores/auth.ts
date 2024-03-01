import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/main'
import { useErrorStore } from './error'
import { myHandleError } from '@/functions'

export const useAuthStore = defineStore('auth', () => {
  const id = ref('')
  const isLoading = ref(false)
  const isLogged = computed(() => Boolean(id.value))

  async function logIn(email: string, password: string) {
    isLoading.value = true
    const response = await sendAuthRequest(email, password, signInWithEmailAndPassword, 'Пользователь не найден')
    if (response) id.value = response
    isLoading.value = false
  }

  async function register(email: string, password: string) {
    isLoading.value = true
    const response = await sendAuthRequest(email, password, createUserWithEmailAndPassword, 'Пользователь не найден')
    if (response) id.value = response
    isLoading.value = false
  }

  async function logOut() {
    isLoading.value = true
    await signOut(auth)
    id.value = ''
    isLoading.value = false
  }

  return { id, isLogged, isLoading, logIn, logOut, register }
})

const sendAuthRequest = async (
  email: string,
  password: string,
  method: typeof createUserWithEmailAndPassword | typeof signInWithEmailAndPassword,
  errorMessage: string): Promise<string | null | undefined> => {

  const errorStore = useErrorStore()
  try {
    const response = await method(auth, email, password);
    if (response) {
      return response.user.uid
    } else {
      errorStore.throwError(errorMessage)
      return null
    }
  } catch (err) {
    myHandleError(err);
  }
}