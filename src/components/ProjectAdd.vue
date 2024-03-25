<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useForm } from 'vuestic-ui';

const { validate } = useForm("apartForm");


const isLoading = ref(false)
const apartData = reactive({
  text: '',
  isShared: false,
})

const add = () => {
  const v = validate()
  console.log(v)
  console.log(apartData)
}
</script>

<template>
  <VaCard class="apart-card">
    <VaCardTitle>Добавить квартиру</VaCardTitle>
    <VaCardContent>
      <VaForm ref="apartForm" class="form">
        <VaInput v-model="apartData.text" label="имя" name="name" :rules="[
          (v) => Boolean(v) || 'Введите название',
          (v) => v.length < 20 || 'Название должно быть меньше 20 символов',
        ]" />
        <VaSwitch v-model="apartData.isShared" true-label="Доступ по ссылке открыт" false-label="Доступ по ссылке закрыт" />
        <VaButton :disabled="isLoading" @click="add">Войти</VaButton>
      </VaForm>
    </VaCardContent>
  </VaCard>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px
}

.apart-card {
  max-width: 400px;
}
</style>