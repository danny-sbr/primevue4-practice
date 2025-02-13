<script setup>
const value = ref(null)
</script>
<template>
  <h2 class="mb-8 text-3xl font-bold">IftaLabel</h2>
  <IftaLabel>
    <InputText id="username" v-model="value" />
    <label for="username">Username</label>
  </IftaLabel>
</template>
<style scoped></style>
