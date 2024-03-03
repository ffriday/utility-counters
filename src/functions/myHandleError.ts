import { MessageType, useInfoStore } from '../stores/info'

export const myHandleError = (err: unknown) => {
  const errorStore = useInfoStore()
  if (err instanceof Error) {
    errorStore.showMessage(err.message, MessageType.error)
  } else {
    console.error("Unknown error:", err);
  }
}