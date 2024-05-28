<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router';
import { ref, type Ref } from 'vue';
import { collection, doc, onSnapshot, query, where, type DocumentData } from 'firebase/firestore';
import { db } from '@/main';
import { DBPaths, type Apart } from '@/constants';
import { myHandleError } from '@/functions';
import { MonthCard } from '@/components';

const { isLogged, id } = storeToRefs(useAuthStore())
const apartId: string = Array.isArray(useRoute().params.id) ? useRoute().params.id[0] : useRoute().params.id.toString()

const months = Array.from({ length: 12 }, (_, i) => i + 1)
const year = ref<number>(new Date().getFullYear())
// const isLoading = ref<boolean>(true)

const apart: Ref<Apart | undefined> = ref(undefined)
onSnapshot(doc(db, DBPaths.apart, apartId.toString()), (apartSpanshot) => {
  apart.value = apartSpanshot.data() as Apart
}, (err) => {
  myHandleError(err)
})

// const data = ref({})
// const q = query(collection(db, DBPaths.apart, apartId.toString(), "year", year.value.toString(), "month"))
// onSnapshot(q, (apartSpanshot) => {
//   const rawData: DocumentData[] = []
//   apartSpanshot.forEach((doc) => {
//     rawData.push({
//       ...doc.data(),
//       id: doc.id,
//     })
//   })
//   console.log(data.value)
// }, (err) => {
//   myHandleError(err)
// })

</script>

<template>
  <div>
    <div class="apart-header">
    <h4 v-if="apart" class="va-h5">{{ apart.name }}</h4>
    <h4 v-if="apart" class="va-h5">Баланс: {{ apart.balance }}</h4>
  </div>
  <div class="apart-header">
    <VaIcon class="material-icons" size="2rem" @click="year--">arrow_back</VaIcon>
    <h4 v-if="apart" class="year va-h5">{{ year }}</h4>
    <VaIcon class="material-icons" size="2rem" @click="year++">arrow_forward</VaIcon>
  </div>
  </div>
  <main>
    <MonthCard v-for="month in months" :key="month" :month="month" :year="year" :isLogged="isLogged" :id="apartId"/>
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

.apart-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.year {
  margin: 0;
}
</style>
