<script setup lang="ts">
import type { Apart } from '@/constants';
import { ref, type Ref } from 'vue';

const props = defineProps(['data'])
const data = ref(props.data) as Ref<Apart>
</script>

<template>
  <VaCard class="apart-card">
    <VaCardTitle>Квартира {{data.name}}</VaCardTitle>
    <VaCardContent v-if="data">
      <p>Доступ по ссылке: {{data.shared ? "Открыт" : "Закрыт"}}</p>
    </VaCardContent>
  </VaCard>
</template>

<style scoped>
.apart-card {
  max-width: 400px;
}
.apart-card:hover {
  box-shadow: 0 5px 0 5px rgba(0, 0, 0, 0.1);
}
</style>