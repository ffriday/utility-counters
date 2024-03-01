<script setup lang="ts">
import { MyHeaderVue } from './components';

</script>

<template>
  <div>
    <MyHeaderVue/>
    <router-view/>
  </div>
</template>

<style scoped>
  div {
    height: 100%;
    min-height: 100vh;
  }
</style>
