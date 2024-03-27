<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRoute } from 'vue-router';

const { isLogged } = storeToRefs(useAuthStore())

const route = useRoute()
const apartId = route.params.id

</script>

<template>
LALALA {{ apartId }}
</template>

<style scoped>

</style>
