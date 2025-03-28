<script setup>
const props = defineProps({
  files: {
    /** @type {import('vue').PropType<(File & { objectURL?: string })[]>} */
    type: Array,
    default: () => [],
  },
  uploadedFiles: {
    /** @type {import('vue').PropType<(File & { objectURL?: string })[]>} */
    type: Array,
    default: () => [],
  },
  removeUploadedFileCallback: {
    type: Function,
  },
  removeFileCallback: {
    type: Function,
  },
  progress: {
    type: Number,
    default: 0,
  },
  formatSize: {
    type: Function,
  },
})
</script>

<template>
  <div class="flex flex-col gap-8 pt-4">
    <div v-if="props.files.length > 0">
      <!-- 這裡雖然有限定只上傳一張圖片，但因為是透過 v-for 來顯示，所以可以顯示多張圖片 -->
      <div
        v-for="(file, index) of props.files"
        :key="file.name + file.type + file.size"
        class="flex w-full flex-col items-center gap-4 object-contain border-surface rounded-border"
      >
        <div class="h-60 w-full">
          <img
            role="presentation"
            :alt="file.name"
            :src="file.objectURL"
            class="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>

    <div v-if="props.uploadedFiles.length > 0">
      <h5>已完成上傳</h5>
      <div class="flex flex-wrap gap-4">
        <div
          v-for="(file, index) of props.uploadedFiles"
          :key="file.name + file.type + file.size"
          class="flex flex-col items-center gap-4 border p-8 border-surface rounded-border"
        >
          <div>
            <img
              role="presentation"
              :alt="file.name"
              :src="file.objectURL"
              width="100"
              height="50"
            />
          </div>
          <span
            class="max-w-60 overflow-hidden text-ellipsis whitespace-nowrap font-semibold"
            >{{ file.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
