<script setup>
const value = ref(null)
</script>
<template>
  <h2 class="mb-8 text-3xl font-bold">FloatLabel</h2>
  <FloatLabel variant="over">
    <InputText id="username" v-model="value" :invalid="!value" />
    <label for="username">Username</label>
  </FloatLabel>
</template>
