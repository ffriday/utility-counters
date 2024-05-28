<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router';
import { onUnmounted, ref, watch, type Ref } from 'vue';
import { collection, doc, onSnapshot, query, where, type DocumentData } from 'firebase/firestore';
import { db } from '@/main';
import { DBPaths, type Apart, type CounterParams, type CounterData, initialCounterParams, initialMonthData } from '@/constants';
import { myHandleError } from '@/functions';
import { MonthCard } from '@/components';
import type { Unsubscribe } from 'firebase/auth';

const { isLogged, id } = storeToRefs(useAuthStore())
const apartId: string = Array.isArray(useRoute().params.id) ? useRoute().params.id[0] : useRoute().params.id.toString()

const year = ref<number>(new Date().getFullYear())
const isLoading = ref<boolean>(true)
let unsubscribe: Unsubscribe | null = null

const apart: Ref<Apart | undefined> = ref(undefined)
onSnapshot(doc(db, DBPaths.apart, apartId.toString()), (apartSpanshot) => {
  apart.value = apartSpanshot.data() as Apart
}, (err) => {
  myHandleError(err)
})

const data = ref<CounterData[]>(initialMonthData())
const listen = () => {
  const q = query(collection(db, DBPaths.apart, apartId.toString(), "year", year.value.toString(), "month"))
  unsubscribe = onSnapshot(q, (apartSpanshot) => {
    isLoading.value = true
    const rawData: DocumentData[] = []
    apartSpanshot.forEach((doc) => {
      rawData.push({
        ...doc.data(),
        id: Number(doc.id),
      })
    })
    isLoading.value = false
    const counterData = rawData as CounterData[]
    const tempData = initialMonthData()
    counterData.forEach((item) => tempData[item.id - 1].counterParams = item.counterParams)
    data.value = tempData
  }, (err) => {
    myHandleError(err)
  })
}

listen()
watch(year, () => {
  if (unsubscribe) unsubscribe()
  listen()
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
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
    <MonthCard v-for="month in data" :key="month.id" :month="Number(month.id)" :year="year" :isLogged="isLogged"
      :id="apartId" :params="month.counterParams" />
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
