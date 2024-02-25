<script setup lang="ts">
import { useTheme } from './functions';

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div>
    <header>HEADER</header>
    <router-view @toggle-theme="toggleTheme"></router-view>
  </div>
</template>

<style>
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
  background-color: v-bind('theme.background');
  color: v-bind('theme.color');
}
</style>
