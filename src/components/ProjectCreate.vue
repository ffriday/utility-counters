<script setup lang="ts">
import { createApart } from '@/functions/fetchData';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { PopUp, ProjectCard } from '.';
import { ref, type Ref } from 'vue';
import { useForm } from 'vuestic-ui';
import { myHandleError } from '@/functions';
import type { CounterParams } from '@/constants';

const { id } = storeToRefs(useAuthStore())
const { validate } = useForm("createForm");

const initialName = 'Моя квартира'
const name = ref(initialName)
const counterParams: Ref<CounterParams> = ref({
  electricity: 0,
  coldWater: 0,
  hotWater: 0,
  drainage: 0,
})
const isPopupVisible = ref(false)

const create = async () => {
  if (validate()) {
    try {
      await createApart(id.value, name.value, counterParams.value)
      name.value = initialName
      isPopupVisible.value = false
    } catch (err) {
      myHandleError(err)
    }
  }
}
</script>

<template>
  <PopUp :isVisible=isPopupVisible @togglePopUp="isPopupVisible = !isPopupVisible">
    <VaForm ref="createForm" class="apart-input">
      <VaCardTitle>Название</VaCardTitle>
      <VaInput v-model="name" label="имя" name="name" type="text" :rules="[
    (v) => Boolean(v) || 'Введите название',
    (v) => v.length < 20 || 'Название должно быть меньше 20 символов',
  ]" />
      <VaCardTitle>Тарифы</VaCardTitle>
      <VaInput v-model="counterParams.electricity" label="электричество, кВт⋅ч" name="electricity" type="number" :rules="[
    (v) => !Number.isNaN(Number(v)) && Number(v) >= 0 || 'Введите тариф',
  ]" />
      <VaInput v-model="counterParams.coldWater" label="Холодная вода, м3" name="coldWater" type="number" :rules="[
    (v) => !Number.isNaN(Number(v)) && Number(v) >= 0 || 'Введите тариф',
  ]" />
      <VaInput v-model="counterParams.hotWater" label="Горячая вода, м3" name="hotWater" type="number" :rules="[
    (v) => !Number.isNaN(Number(v)) && Number(v) >= 0 || 'Введите тариф',
  ]" />
      <VaInput v-model="counterParams.drainage" label="Водоотведение, м3" name="drainage" type="number" :rules="[
    (v) => !Number.isNaN(Number(v)) && Number(v) >= 0 || 'Введите тариф',
  ]" />
      <VaButton @click="create" class="add">Создать</VaButton>
    </VaForm>
  </PopUp>
  <ProjectCard>
    <VaCardTitle>Добавить квартиру</VaCardTitle>
    <VaButton @click="isPopupVisible = true" class="add">Добавить</VaButton>
  </ProjectCard>
</template>

<style scoped>
.apart-input {
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.add {
  margin-top: 0.5rem;
}
</style>