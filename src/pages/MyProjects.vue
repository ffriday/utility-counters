<script setup lang="ts">
import { DBPaths, type ApartDoc } from '@/constants';
import { onUnmounted, ref, type Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ProjectViewVue, ProjectCreateVue, ProjectCard } from '@/components'
import { collection, onSnapshot, query, where, type DocumentData } from 'firebase/firestore';
import { db } from '@/main';
import { myHandleError } from '@/functions';

const { id } = storeToRefs(useAuthStore())
const isLoading = ref(true)
let unsubscribe = null

const data: Ref<ApartDoc[]> = ref([])
const q = query(collection(db, DBPaths.apart), where("owner", "==", id.value))
unsubscribe = onSnapshot(q, (apartSpanshot) => {
  const rawData: DocumentData[] = []
  apartSpanshot.forEach((doc) => {
    rawData.push({
      ...doc.data(),
      id: doc.id,
      key: `${doc.id}-${doc.data().shared}`
    })
  })
  data.value = rawData as ApartDoc[]
  isLoading.value = false
}, (err) => {
  myHandleError(err)
})
onUnmounted(() => unsubscribe())

</script>

<template>
  <main>
    <ProjectCard v-if="isLoading">
      <p>Загрузка</p>
      <VaIcon class="material-icons" spin>
        cached
      </VaIcon>
    </ProjectCard>
    <ProjectViewVue v-for="item in data" :key="item.key" :data="item" />
    <ProjectCreateVue />
  </main>
</template>

<style scoped>
main {
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
}
</style>