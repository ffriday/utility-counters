<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '@/main';
import { collection, setDoc } from "firebase/firestore";
import { useErrorStore } from '@/stores/error';
import { pushCounters, getCounter, getCounters } from '@/functions';

const errorStore = useErrorStore()
const { message } = storeToRefs(errorStore)

const authStore = useAuthStore()
const { id, isLogged, isLoading } = storeToRefs(authStore)


const { logIn, logOut } = authStore
const login = async () => {
  if (isLogged.value) {
    logOut()
  } else {
    logIn('test@test.ru', 'qweQWE123!@#');
  }
}

const push = async () => {
  const counters = {
    coldWater: 111,
    hotWater: 222,
    electricity: 12345
  }
  await pushCounters(id.value, 2024, 4, counters)
}

const get = async () => {
  // const data = await getCounter(id.value, 2024, 3)
  const data = await getCounters(id.value, 2024)
  console.log(data)
}
</script>

<template>
  <b>Login</b>
  <div>logged: {{ isLogged }}</div>
  <div>loading: {{ isLoading }}</div>
  <div>error: {{ message }}</div>
  <div>id: {{ id }}</div>
  <button @click="login">TEST</button>
  <button @click="push">push</button>
  <button @click="get">get</button>
</template>

<style scoped></style>
