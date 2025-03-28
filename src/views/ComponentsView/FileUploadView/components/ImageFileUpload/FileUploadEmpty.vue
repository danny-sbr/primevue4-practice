<script setup>
const props = defineProps({
  imageUrl: {
    type: String,
  },
})
</script>

<template>
  <div class="flex h-56 flex-col items-center justify-center">
    <div v-if="props.imageUrl">
      <img :src="props.imageUrl" alt="預覽圖片" class="h-auto w-full" />
    </div>
    <div v-else class="flex flex-col items-center justify-center">
      <i class="pi pi-cloud-upload !rounded-full !border-2 !p-8 !text-4xl" />
      <p class="mt-4 text-gray-500">點擊上方按鈕或拖曳檔案至此處上傳</p>
    </div>
  </div>
</template>

<style scoped></style>
