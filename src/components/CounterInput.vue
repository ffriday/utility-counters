<script setup lang="ts">
import { type CounterParams, type TariffItem } from '@/constants';
import { ref, type Ref } from 'vue';

const props = defineProps<{ caption: string, initialParams: CounterParams, inputList: TariffItem[] }>()
const counterParams: Ref<CounterParams> = ref(props.initialParams)
const tariffInputValidate = (v: string) => !Number.isNaN(Number(v)) && Number(v) > 0 || 'Введите тариф';

defineExpose({ counterParams })
</script>

<template>
  <VaCardTitle>{{ props.caption }}</VaCardTitle>
  <VaInput v-for="item in props.inputList" :key="item.name" v-model.number="counterParams[item.name]"
    :label="item.label" name="counters" type="number" :rules="[tariffInputValidate]" />
</template>

<style scoped>
</style>