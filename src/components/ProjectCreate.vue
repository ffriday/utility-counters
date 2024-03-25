<script setup lang="ts">
import { createApart } from '@/functions/fetchData';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ProjectCard } from '.';
import { ref } from 'vue';
import { useForm } from 'vuestic-ui';
import { myHandleError } from '@/functions';

const { id } = storeToRefs(useAuthStore())
const { validate } = useForm("createForm");

const name = ref('Моя квартира')

const create = async () => {
  if (validate()) {
    try {
      await createApart(id.value, name.value)
    } catch (err) {
      myHandleError(err)
    }
  }
}
</script>

<template>
  <ProjectCard>
    <VaCardTitle>Добавить квартиру</VaCardTitle>
    <VaForm ref="createForm" class="apart-input">
      <VaInput v-model="name" label="имя" name="name" :rules="[
        (v) => Boolean(v) || 'Введите название',
        (v) => v.length < 20 || 'Название должно быть меньше 20 символов',
      ]" />
    </VaForm>
    <VaButton @click="create" class="add">Добавить</VaButton>
  </ProjectCard>
</template>

<style scoped>
.apart-input {
  max-width: 90%;
  opacity: 0;
  height: 0;
  transition: height 0.5s ease;
}

.apart-card:hover {
  .apart-input {
    opacity: 1;
    height: 54px;
    transition: 0.5s ease;
  }
}

.add {
  margin-top: 0.5rem;
}
</style>