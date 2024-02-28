import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
  const message = ref('')
  const isError = computed(() => Boolean(message.value))
  function throwError(errorMessage: string, timeout: number = 5000) {
    message.value = errorMessage;
    window.setTimeout(removeError, timeout)
  }
  function removeError() {
    message.value = ''
  }

  return { message, isError, throwError, removeError }
})
