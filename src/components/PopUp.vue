<script setup lang="ts">
const props = defineProps(['isVisible'])
</script>

<template>
  <div class="overlay" v-if="props.isVisible" @click="$emit('togglePopUp')">
    <div class="box" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  max-width: 500px;
  width: 90%;
  padding: 20px;
  background-color: white;
  border-radius: var(--va-card-border-radius);
}
</style>