<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const store = useAuthStore()
const { id, isLogged } = storeToRefs(store)
const { logIn, logOut } = store
const login = () => {
  if (isLogged.value) {
    logOut()
  } else {
    logIn('test');
  }
}
</script>

<template>
  Login
  <div>logged: {{ isLogged }}</div>
  <div>id: {{ id }}</div>
  <button @click="login">TEST</button>
</template>

<style scoped></style>
