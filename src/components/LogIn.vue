<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useErrorStore } from '@/stores/error';
import { ref, watch } from 'vue';

const errorStore = useErrorStore()
const { message } = storeToRefs(errorStore)

const authStore = useAuthStore()
const { logIn, logOut } = authStore
const { id, isLogged, isLoading } = storeToRefs(authStore)
const activeTab = ref(0)
watch(activeTab, (newVal, oldVal) => {
  // Выполните здесь действия, которые должны произойти при изменении activeTab
  console.log('Значение активного таба изменилось:', newVal, oldVal);

  // Пример: Изменение другого элемента
  // Допустим, у вас есть другой элемент с ref "someElement"
  // this.$refs.someElement.someAction(newVal); // Замените это действие на то, что вам нужно
});


const login = async () => {
  if (isLogged.value) {
    logOut()
  } else {
    logIn('test@test.ru', 'qweQWE123!@#');
  }
}
</script>

<template>
  <main>
    <VaCard class="login-form">
      <VaTabs v-model="activeTab">
        <template #tabs>
          <VaTab>Логин</VaTab>
          <VaTab>Регистрация</VaTab>
        </template>
      </VaTabs>
      <div>logged: {{ isLogged }}</div>
      <div>loading: {{ isLoading }}</div>
      <div>error: {{ message }}</div>
      <div>id: {{ id }}</div>
      <button @click="login">LOGIN</button>
    </VaCard>
  </main>
</template>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  height: 100%;
}
.login-form {
  max-width: 500px;
  width: 90%;
  padding: 20px;
}
</style>
