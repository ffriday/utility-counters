<script setup lang="ts">
import { MyRoutes, type ApartDoc, DBPaths } from '@/constants';
import { myHandleError } from '@/functions';
import { db } from '@/main';
import { deleteDoc, doc } from 'firebase/firestore';
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import { ProjectCard } from '.';

const router = useRouter()

const props = defineProps(['data'])
const data = ref(props.data) as Ref<ApartDoc>

const open = () => {
  router.push(`${MyRoutes.apart}/${data.value.id}`)
}

const remove = async () => {
  try {
    await deleteDoc(doc(db, DBPaths.apart, data.value.id))
  } catch (err) {
    myHandleError(err)
  }
}
</script>

<template>
  <ProjectCard>
    <VaCardTitle>{{ data.name }}</VaCardTitle>
    <VaCardContent v-if="data" class="apart-card-line" @click="open">
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
    <VaCardContent v-if="data" class="apart-card-line" @click="remove">
      <p>Удалить:</p>
      <VaIcon class="material-icons">
        delete
      </VaIcon>
    </VaCardContent>
  </ProjectCard>
</template>

<style scoped>
.apart-card-line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    scale: 1.01;
    transition: 0.2s ease;
  }
}
</style>