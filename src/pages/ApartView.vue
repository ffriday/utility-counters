<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router';
import { ref, type Ref } from 'vue';
import { collection, doc, onSnapshot, query, where, type DocumentData } from 'firebase/firestore';
import { db } from '@/main';
import { DBPaths, type Apart } from '@/constants';
import { myHandleError } from '@/functions';

const { isLogged } = storeToRefs(useAuthStore())
const apartId = useRoute().params.id

const { id } = storeToRefs(useAuthStore())
const isLoading = ref(true)

const apart: Ref<Apart | undefined> = ref(undefined)
onSnapshot(doc(db, DBPaths.apart, apartId.toString()), (apartSpanshot) => {
  apart.value = apartSpanshot.data() as Apart
}, (err) => {
  myHandleError(err)
})

const data = ref({})
const q = query(collection(db, DBPaths.apart, apartId.toString(), "2024"))
onSnapshot(q, (apartSpanshot) => {
  const rawData: DocumentData[] = []
  apartSpanshot.forEach((doc) => {
    rawData.push({
      ...doc.data(),
    })
  })
  console.log(rawData)
}, (err) => {
  myHandleError(err)
})

</script>

<template>
  <h5 v-if="apart" class="va-h5">{{ apart.name }}</h5>
  <main>
  </main>
</template>

<style scoped>
h5 {
  margin: 1rem;
}

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
