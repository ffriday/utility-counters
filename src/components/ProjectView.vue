<script setup lang="ts">
import { MyRoutes, type Apart } from '@/constants';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps(['data'])
const data = ref(props.data) as Ref<Apart>

const go = () => {
  router.push(`${MyRoutes.apart}/${data.value.link}`)
}
</script>

<template>
  <VaCard class="apart-card" @click="go">
    <VaCardTitle class="apart-card-title">Квартира {{ data.name }}</VaCardTitle>
    <VaCardContent v-if="data" class="apart-card-line">
      <p>Открыть:</p>
      <VaIcon class="material-icons">
        open_in_full
      </VaIcon>
    </VaCardContent>
    <VaCardContent v-if="data" class="apart-card-line">
      <p>Доступ по ссылке:</p>
      <VaIcon class="material-icons" v-if="data.shared" color="primary">
        link
      </VaIcon>
      <VaIcon class="material-icons" v-else color="secondary">
        link_off
      </VaIcon>
    </VaCardContent>
    <VaCardContent v-if="data" class="apart-card-line">
      <p>Копировать ссылку:</p>
      <VaIcon class="material-icons">
        share
      </VaIcon>
    </VaCardContent>
    <VaCardContent v-if="data" class="apart-card-line">
      <p>Удалить:</p>
      <VaIcon class="material-icons">
        delete
      </VaIcon>
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

.apart-card-line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>