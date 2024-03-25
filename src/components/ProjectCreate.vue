<script setup lang="ts">

const go = () => {
  console.log("go")
}
</script>

<template>
  <VaCard class="apart-card" @click="go">
    <p>Добавить квартиру</p>
    <VaIcon class="material-icons">
      add
    </VaIcon>
  </VaCard>
</template>

<style scoped>
.apart-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  min-width: 200px;
  transition: box-shadow 0.3s ease;
}

.apart-card:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 10px 0px;
  cursor: pointer;
}
</style>