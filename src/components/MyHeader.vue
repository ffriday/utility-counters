<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useTheme, navLinks } from '@/functions';
import { useBreakpoint } from "vuestic-ui";
import { computed } from 'vue';

const store = useAuthStore()
const { headerColors } = useTheme()
const breakpoint = useBreakpoint()
const menuItems = computed(() => navLinks(store.isLogged))
</script>

<template>
  <VaNavbar v-bind="headerColors" class="mb-3">
    <template #left>
      <VaNavbarItem class="logo">
        СЧЕТЧИКИ
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem v-for="item in menuItems" :key="item" class="hidden sm:block">
        {{ item.title }}
      </VaNavbarItem>
      <VaNavbarItem v-if="store.isLogged && breakpoint.xs" class="hidden sm:block">
        <VaIcon name="dashboard" />
      </VaNavbarItem>
    </template>
  </VaNavbar>
  <VaSidebar v-if="store.isLogged && breakpoint.xs">
    <VaSidebarItem class="sidebarMenu">
      <VaSidebarItemContent>
        <VaSidebarItemTitle>ДОБАВИТЬ ПОКАЗАНИЯ</VaSidebarItemTitle>
      </VaSidebarItemContent>
      <VaSidebarItemContent>
        <VaSidebarItemTitle>АРХИВ</VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
  </VaSidebar>
</template>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;
}

.sidebarMenu {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
}
</style>
