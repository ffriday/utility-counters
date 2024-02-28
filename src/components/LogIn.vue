<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const { id, isLogged, isLoading } = storeToRefs(authStore)

// import { doc, getDoc } from "firebase/firestore";
// import { collection, setDoc } from "firebase/firestore"; 

const { logIn, logOut } = authStore
const login = async () => {
  // const response = await signInWithEmailAndPassword(auth, 'test@test.ru', 'qweQWE123!@#')
  // console.log(response)
  // // const citiesRef = collection(db, "test");
  // // await setDoc(doc(citiesRef), {
  // //   name: "San Francisco"});
  // const docRef = doc(db, "test", "name");
  // const docSnap = await getDoc(docRef);
  // console.log(docSnap)
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  if (isLogged.value) {
    logOut()
  } else {
    logIn('test@test.ru', 'qweQWE123!@#');
  }
}
</script>

<template>
  <b>Login</b>
  <div>logged: {{ isLogged }}</div>
  <div>loading: {{ isLoading }}</div>
  <div>id: {{ id }}</div>
  <button @click="login">TEST</button>
</template>

<style scoped></style>
