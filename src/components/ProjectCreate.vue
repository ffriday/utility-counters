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
const initialCounterParams: CounterParams = {
  electricity: 0,
  coldWater: 0,
  hotWater: 0,
  drainage: 0,
}
const counterParams: Ref<CounterParams> = ref(initialCounterParams)
const isPopupVisible = ref(false)
const isPending = ref(false)

const create = async () => {
  if (validate()) {
    try {
      isPending.value = true
      console.log(isPending.value)
      await createApart(id.value, name.value, counterParams.value)
      name.value = initialName
      isPopupVisible.value = false
      counterParams.value=initialCounterParams
    } catch (err) {
      myHandleError(err)
    } finally {
      isPending.value = false
      console.log(isPending.value)
    }
  }
}

const tariffInputValidate = (v: string) => !Number.isNaN(Number(v)) && Number(v) > 0 || 'Введите тариф';
type TariffItem = {
  label: string;
  name: keyof CounterParams;
};

const tariffList: TariffItem[] = [
  { label: 'Электричество, р/кВт⋅ч', name: 'electricity' },
  { label: 'Холодная вода, р/м3', name: 'coldWater' },
  { label: 'Горячая вода, р/м3', name: 'hotWater' },
  { label: 'Водоотведение, р', name: 'drainage' },
];
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
      <VaInput v-for="tariff in tariffList" :key="tariff.name" v-model="counterParams[tariff.name]"
        :label="tariff.label" name="tariff" type="number" :rules="[tariffInputValidate]" />
      <VaButton @click="create" class="add">Создать</VaButton>
    </VaForm>
  </PopUp>
  <ProjectCard>
    <VaCardTitle>Добавить квартиру</VaCardTitle>
    <VaButton @click="isPopupVisible = true" class="add" :disabled="isPending">Добавить</VaButton>
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

.va-card-title {
  padding-left: 0;
}
</style>