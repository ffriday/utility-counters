<script setup lang="ts">
</script>

<template>
  <VaCard class="apart-card">
    <slot></slot>
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
  min-width: 300px;
  min-height: 200px;
  transition: box-shadow 0.3s ease;
}

.apart-card:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 10px 0px;
  cursor: default !important;
}
</style>