<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const store = useAuthStore()
const { id, isLogged } = storeToRefs(store)
const { logIn, logOut } = store
defineEmits(['toggle-theme'])
const login = () => {
  if (isLogged.value) {
    logOut()
  } else {
    logIn('test');
  }
}
</script>

<template>
  <b>Login</b>
  <div>logged: {{ isLogged }}</div>
  <div>id: {{ id }}</div>
  <button @click="login">TEST</button>
  <button @click="$emit('toggle-theme')">THEME</button>
</template>

<style scoped></style>
