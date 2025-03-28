<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  files: {
    type: Array,
  },
  uploadedFiles: {
    type: Array,
  },
  chooseCallback: {
    type: Function,
  },
  uploadCallback: {
    type: Function,
  },
  clearCallback: {
    type: Function,
  },
  remoteUrl: {
    type: String,
  },
})
</script>

<template>
  <p class="rounded-md bg-primary p-1 text-sm text-white">
    {{ props.title }}
  </p>
  <div class="flex flex-1 flex-wrap items-center justify-between gap-4">
    <div class="flex w-full justify-between gap-2">
      <!-- 已選擇檔案或有遠端 URL 時，禁用按鈕 -->
      <Button
        @click="props.chooseCallback()"
        icon="pi pi-images"
        severity="secondary"
        label="選擇檔案"
        :disabled="!!(props.files?.length > 0 || props.remoteUrl)"
      />
      <!-- 無檔案或無遠端 URL 時，禁用按鈕 -->
      <Button
        @click="props.clearCallback()"
        icon="pi pi-times"
        rounded
        outlined
        severity="danger"
        :disabled="!(props.files?.length > 0 || props.remoteUrl)"
      />
    </div>
  </div>
</template>

<style scoped></style>
