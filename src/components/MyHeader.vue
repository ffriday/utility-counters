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
        <router-link to="/">СЧЕТЧИКИ</router-link>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem v-if="store.isLogged && breakpoint.xs" class="hidden sm:block">
        <VaIcon name="dashboard" />
      </VaNavbarItem>
      <VaNavbarItem v-else v-for="item in menuItems" :key="item" class="hidden sm:block">
        <router-link :to="item.link" class="link">{{ item.title }}</router-link>
      </VaNavbarItem>
    </template>
  </VaNavbar>
  <!-- <VaSidebar v-if="store.isLogged && breakpoint.xs">
    <VaSidebarItem class="sidebarMenu">
      <VaSidebarItemContent v-for="item in menuItems" :key="item" class="hidden sm:block">
        <VaSidebarItemTitle>
          <router-link :to="item.link" class="link">{{ item.title }}</router-link>
        </VaSidebarItemTitle>
      </VaSidebarItemContent>
    </VaSidebarItem>
  </VaSidebar> -->
</template>

<style scoped>
.logo {
  font-weight: 600;
  font-size: 1.5rem;

  a {
    text-decoration: none;
    color: inherit;
  }
}

.link {
  text-decoration: none;
  color: inherit;
}

.sidebarMenu {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
}
</style>
