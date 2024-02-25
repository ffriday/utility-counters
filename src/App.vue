<script setup lang="ts">
import { MyHeaderVue } from './components';
import { useTheme } from './functions';

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div>
    <MyHeaderVue/>
    <router-view @toggle-theme="toggleTheme"></router-view>
  </div>
</template>

<style>
* {
  --font-color: v-bind(theme.color);
  --back-color: v-bind(theme.background);
}

h1, h2, h3, h4, h5 {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

body>div {
  width: 100%;
  height: 100%;
  color: var(--font-color);
  background-color: var(--back-color);
}
</style>
