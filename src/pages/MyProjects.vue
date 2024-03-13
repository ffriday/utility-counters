<script setup lang="ts">
import { DBPaths, type Apart } from '@/constants';
import { myHandleError } from '@/functions';
import { db } from '@/main';
import { collection, getDocs, type DocumentData, query, where } from 'firebase/firestore';
import { ref, type Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import {ProjectViewVue} from '@/components'

const { id } = storeToRefs(useAuthStore())

const fetchData = async () => {
  const apartCollection = collection(db, DBPaths.apart)
  try {
    const apartSpanshot = await getDocs(query(apartCollection, where('owner', '==', id.value)))
    const data: DocumentData[] = []
    apartSpanshot.forEach((doc) => {
      data.push(doc.data())
    })
    return data as Apart[]
  } catch (err) {
    myHandleError(err)
  }
}
const data: Ref<Apart[] | undefined> = ref(undefined)
data.value = await fetchData()

</script>

<template>
  <Suspense>
    <template #default>
      <main>
        <ProjectViewVue v-for="item in data" :key="item.link" :data="item" />
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