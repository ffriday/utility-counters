<script setup lang="ts">
import { createApart } from '@/functions/fetchData';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { PopUp, ProjectCard } from '.';
import { ref, type Ref } from 'vue';
import { useForm } from 'vuestic-ui';
import { myHandleError } from '@/functions';
import { initialCounterParams, initialName, type CounterParams } from '@/constants';
import TariffInput from './TariffInput.vue';

const { id } = storeToRefs(useAuthStore())
const { validate } = useForm("createForm");
const name = ref(initialName)

const counterParams: Ref<CounterParams> = ref(initialCounterParams)
const isPopupVisible = ref(false)
const isPending = ref(false)

const create = async () => {
  if (validate()) {
    try {
      isPending.value = true
      await createApart(id.value, name.value, counterParams.value)
      name.value = initialName
      isPopupVisible.value = false
      counterParams.value = initialCounterParams
    } catch (err) {
      myHandleError(err)
    } finally {
      isPending.value = false
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
      <TariffInput ref="counterParams" />
      <VaButton @click="create" class="add">
        <VaInnerLoading v-if="isPending" loading color="secondary" />
        {{ !isPending ? 'Создать' : '' }}
      </VaButton>
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
}

.va-card-title {
  padding-left: 0;
}
</style>