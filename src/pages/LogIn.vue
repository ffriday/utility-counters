<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue';
import { useForm } from "vuestic-ui";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const { validate: validateLogin } = useForm("loginForm");
const { validate: validateRegister } = useForm("registerForm");

const authStore = useAuthStore()
const { logIn, logOut, register } = authStore
const { isLogged, isLoading } = storeToRefs(authStore)

const isRegister = route.query.register === "true"
const activeTab = ref(isRegister ? 1 : 0)

const loginData = reactive({
  login: "",
  password: "",
});
const registerData = reactive({
  login: "",
  password: "",
  confirmPassword: "",
});

const login = async () => {
  if (validateLogin()) {
    await logIn(loginData.login, loginData.password)
    if (isLogged.value) router.push("/")
  }
}

const reg = async () => {
  if (validateRegister()) {
    await register(registerData.login, registerData.password)
    if (isLogged.value) router.push("/")
  }
}

//TEST
const loginTest = async () => {
  if (isLogged.value) {
    await logOut()
  } else {
    await logIn('test@test.ru', 'qweQWE123!@#');
    if (isLogged.value) router.push("/")
  }
}

import { MessageType, useInfoStore } from '@/stores/info';
const infoStore = useInfoStore()
const errorTest = async () => {
  infoStore.showMessage('LALALA', MessageType.error)
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

      <VaForm v-if="activeTab === 0" ref="loginForm" class="form">
        <VaInput v-model="loginData.login" label="e-mail" name="Login" :rules="[
          (v) => Boolean(v) || 'Введите почту',
          (v) => v.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) || 'Не верный формат почты'
        ]" />
        <VaInput v-model="loginData.password" label="Пароль" type="password" name="Password" :rules="[
          (v) => Boolean(v) || 'Введите пароль',
          (v) => v.length > 8 || 'Пароль должен быть не менее 8 символов',
          (v) => v.match(/(.*[a-z].*[A-Z])|(.*[A-Z].*[a-z])/) || 'Пароль должен сдержать прописную и строчную букву',
          (v) => v.match(/(?=.*\d)/) || 'Пароль должен сдержать цифру',
        ]" />
        <VaButton :disabled="isLoading" @click="login">Войти</VaButton>
      </VaForm>

      <VaForm v-else ref="registerForm" class="form">
        <VaInput v-model="registerData.login" label="e-mail" name="Login" :rules="[
          (v) => Boolean(v) || 'Введите почту',
          (v) => v.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) || 'Не верный формат почты'
        ]" />
        <VaInput v-model="registerData.password" label="Пароль" type="password" name="Password" :rules="[
          (v) => Boolean(v) || 'Введите пароль',
          (v) => v.length > 8 || 'Пароль должен быть не менее 8 символов',
          (v) => v.match(/(.*[a-z].*[A-Z])|(.*[A-Z].*[a-z])/) || 'Пароль должен сдержать прописную и строчную букву',
          (v) => v.match(/(?=.*\d)/) || 'Пароль должен сдержать цифру',
        ]" />
        <VaInput v-model="registerData.confirmPassword" label="Подтверждение пароля" type="password"
          name="confirmPassword" :rules="[
            (v) => Boolean(v) || 'Подтвердите пароль',
            (v) => v === registerData.password || 'Пароли не совпадают',
          ]" />
        <VaButton :disabled="isLoading" @click="reg">Регистрация</VaButton>
      </VaForm>

      <button @click="loginTest">TEST LOGIN</button>
      <button @click="errorTest">TEST ERROR</button>
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

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-form {
  max-width: 500px;
  width: 90%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
