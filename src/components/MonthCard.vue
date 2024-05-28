<script setup lang="ts">
import { pushCounters } from '@/functions';

// import type { CounterParams } from '@/constants';

const props = defineProps<{ year: number, month: number, isLogged: boolean, id: string }>()

const setCounters = async () => {
  console.log('test')
  await pushCounters(props.id, props.year, props.month, {
    electricity: 1,
    coldWater: 2,
    hotWater: 3,
    drainage: 4
  })
}
</script>

<template>
  <VaCard class="apart-card">
    <VaCardTitle>{{ props.year }}.{{ props.month }}</VaCardTitle>
    {{ props.id }}
    <!-- <VaCardContent v-if="counters" class="apart-card-line" >
      <p>Нет данных</p>
    </VaCardContent> -->
    <VaButton @click="setCounters">Добавить</VaButton>
  </VaCard>
</template>

<style scoped>
.apart-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  min-width: 300px;
  min-height: 200px;
  transition: box-shadow 0.3s ease;
}

.apart-card:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 10px 0px;
  cursor: default !important;
}
</style>