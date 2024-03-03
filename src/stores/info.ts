import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export enum MessageType {
  info = 'primary',
  error = 'danger',
}

export const useInfoStore = defineStore('info', () => {
  const message = ref('')
  const messageType = ref(MessageType.info)
  const isVisible = computed(() => Boolean(message.value))
  function showMessage(errorMessage: string, type: MessageType = MessageType.info, timeout: number = 5000) {
    message.value = errorMessage
    messageType.value = type
    window.setTimeout(removeMessage, timeout)
  }
  function removeMessage() {
    message.value = ''
    messageType.value = MessageType.info
  }

  return { message, messageType, isVisible, showMessage, removeMessage }
})
