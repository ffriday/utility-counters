<script setup lang="ts">
import { tariffList, type CounterParams, initialCounterParams } from '@/constants';
import { ref, type Ref } from 'vue';

const counterParams: Ref<CounterParams> = ref(initialCounterParams)
const tariffInputValidate = (v: string) => !Number.isNaN(Number(v)) && Number(v) > 0 || 'Введите тариф';

defineExpose({ counterParams })
</script>

<template>
  <VaCardTitle>Тарифы</VaCardTitle>
  <VaInput v-for="tariff in tariffList" :key="tariff.name" v-model.number="counterParams[tariff.name]"
    :label="tariff.label" name="tariff" type="number" :rules="[tariffInputValidate]" />
</template>

<style scoped>
</style>