<script setup lang="ts">
import { countersList, initialCounterParams, type CounterParams, countersListView } from '@/constants';
import { myHandleError, pushCounters } from '@/functions';
import { ref, type Ref } from 'vue';
import PopUp from './PopUp.vue';
import CounterInput from './CounterInput.vue';
import { useForm } from 'vuestic-ui';

const props = defineProps<{ year: number, month: number, isLogged: boolean, id: string, params: CounterParams }>()

const counterParams: Ref<CounterParams> = ref(initialCounterParams)
const isPopupVisible = ref(false)
const isPending = ref(false)
const { validate } = useForm("countersForm");

const setCounters = async () => {
  if (validate()) {
    try {
      isPending.value = true
      await pushCounters(props.id, props.year, props.month, counterParams.value)
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
  <VaCard class="apart-card">
    <VaCardTitle class="apart-card__title">{{ props.year }}.{{ props.month }}</VaCardTitle>
    <VaCardContent v-for="item in countersListView" :key="item.name" class="apart-card-line">
      <VaIcon class="material-icons">{{ item.icon }}</VaIcon>
      <p>{{ item.label }}: {{ props.params[item.name] ?? 0 }} {{  item.measure  }}</p>
    </VaCardContent>
    <VaButton @click="isPopupVisible = true">Добавить</VaButton>
  </VaCard>

  <PopUp :isVisible=isPopupVisible @togglePopUp="isPopupVisible = !isPopupVisible">
    <VaForm ref="countersForm" class="apart-input">
      <CounterInput ref="counterParams" caption="Тарифы" :initialParams="initialCounterParams"
        :inputList="countersList" />
      <VaButton @click="setCounters" class="button">
        <VaInnerLoading v-if="isPending" loading color="secondary" />
        {{ !isPending ? 'Создать' : '' }}
      </VaButton>
    </VaForm>
  </PopUp>
</template>

<style scoped>
.apart-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  min-width: 300px;
  min-height: 200px;
  height: min-content;
  transition: box-shadow 0.3s ease;
  padding: 1rem;
}

.apart-card__title {
  padding: 0;
}

.apart-card:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 10px 0px;
  cursor: default !important;
}

.apart-card-line {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  cursor: pointer;
  transition: 0.2s ease;
  padding-bottom: 10px  ;
  &:hover {
    scale: 1.01;
    transition: 0.2s ease;
  }
}

.apart-input {
  max-width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
}
</style>