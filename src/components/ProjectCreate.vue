<script setup lang="ts">
import { createApart } from '@/functions/fetchData';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ProjectCard } from '.';
import { ref } from 'vue';

const { id } = storeToRefs(useAuthStore())

const name = ref('Моя квартира')

const create = async () => {
  await createApart(id.value, name.value)
}
</script>

<template>
  <ProjectCard>
    <p>Добавить квартиру</p>
    <VaInput v-model="name" label="имя" name="name" class="apart-input" :rules="[
      (v) => Boolean(v) || 'Введите название',
      (v) => v.length < 20 || 'Название должно быть меньше 20 символов',
    ]" />
    <VaButton @click="create">Добавить</VaButton>
  </ProjectCard>
</template>

<style scoped>
  .apart-input {
    max-width: 90%;
  }
</style>