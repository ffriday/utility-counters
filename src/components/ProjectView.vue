<script setup lang="ts">
import type { Apart } from '@/constants';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps(['data'])
const data = ref(props.data) as Ref<Apart>

const go = () => {
  router.push(data.value.link)
}
</script>

<template>
  <VaCard class="apart-card" @click="go">
    <VaCardTitle>Квартира {{ data.name }}</VaCardTitle>
    <VaCardContent v-if="data">
      <p>Доступ по ссылке: {{ data.shared ? "Открыт" : "Закрыт" }}</p>
    </VaCardContent>
  </VaCard>
</template>

<style scoped>
.apart-card {
  max-width: 400px;
  transition: box-shadow 0.3s ease;
}

.apart-card:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 10px 0px;
  cursor: pointer;
}
</style>