<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { MyProjectsVue } from '.';

const { isLogged } = storeToRefs(useAuthStore())


</script>

<template>
<main>
  <h1 v-if="!isLogged">HOME</h1>
  <Suspense v-else>
    <template #default>
      <MyProjectsVue />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</main>
</template>

<style scoped>
main {
  width: 100%;
}
</style>
