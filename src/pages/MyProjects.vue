<script setup lang="ts">
import { DBPaths } from '@/constants';
import { ref, type Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ProjectViewVue, ProjectCreateVue, ProjectCard } from '@/components'
import { collection, onSnapshot, query, where, type DocumentData } from 'firebase/firestore';
import { db } from '@/main';
import { myHandleError } from '@/functions';

const { id } = storeToRefs(useAuthStore())

const data: Ref<DocumentData[]> = ref([])
const q = query(collection(db, DBPaths.apart), where("owner", "==", id.value))
onSnapshot(q, (apartSpanshot) => {
  data.value = []
  apartSpanshot.forEach((doc) => {
    data.value.push({
      ...doc.data(),
      id: doc.id
    })
  })
}, (err) => {
  myHandleError(err)
})

</script>

<template>
  <main>
    <ProjectCard v-if="!data.length">
      <p>Загрузка</p>
      <VaIcon class="material-icons" spin>
        cached
      </VaIcon>
    </ProjectCard>
    <ProjectViewVue v-for="item in data" :key="item.id" :data="item" />
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