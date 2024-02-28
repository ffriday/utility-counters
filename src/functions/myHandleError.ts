import { useErrorStore } from '../stores/error'

export const myHandleError = (err: unknown) => {
  const errorStore = useErrorStore()
  if (err instanceof Error) {
    errorStore.throwError(err.message)
  } else {
    console.error("Unknown error:", err);
  }
}