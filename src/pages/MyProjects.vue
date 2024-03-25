<script setup lang="ts">
import { type Apart } from '@/constants';
import { ref, type Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ProjectViewVue, ProjectCreateVue } from '@/components'
import { fetchApartsByOwner } from '@/functions'

const { id } = storeToRefs(useAuthStore())

const data: Ref<Apart[] | undefined> = ref(undefined)
data.value = await fetchApartsByOwner(id.value)

</script>

<template>
  <Suspense>
    <template #default>
      <main>
        <ProjectViewVue v-for="item in data" :key="item.link" :data="item" />
        <ProjectCreateVue />
      </main>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}
</style>