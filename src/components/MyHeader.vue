<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useInfoStore } from '@/stores/info';
import { useTheme, navLinks } from '@/functions';
import { useBreakpoint, useToast } from "vuestic-ui";
import { computed, ref, watch, type Ref } from 'vue';
import { storeToRefs } from 'pinia';

const store = useAuthStore()
const { headerColors } = useTheme()
const infoStore = useInfoStore()
const { isVisible, message, messageType } = storeToRefs(infoStore)
const breakpoint = useBreakpoint()
const { init, close } = useToast()
const menuItems = computed(() => navLinks(store.isLogged))

watch(isVisible, () => {
  const toastId: Ref<null | string> = ref(null)
  if (isVisible.value) {
    toastId.value = init({
      message: message.value,
      offsetY: 10,
      color: messageType.value,
    })
  } else if (toastId.value) {
    close(toastId.value)
  }
})


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
        <router-link :to="{name: item.link}" class="link">{{ item.title }}</router-link>
      </VaNavbarItem>
    </template>
  </VaNavbar>
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
