<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { MyProjectsVue } from '.';

const { isLogged } = storeToRefs(useAuthStore())


</script>

<template>
<div>
  <h1 v-if="!isLogged">HOME</h1>
  <Suspense v-else>
    <template #default>
      <MyProjectsVue />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</div>
</template>

<style scoped>
div {
  width: 100%;
  height: calc(100vh - 72px);
  min-height: calc(100vh - 72px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
