<script setup>
import { ref } from 'vue'
import DialogComponent from './components/DialogComponent.vue'

const dialogComponent = ref()

const showDialog = () => {
  dialogComponent.value?.show()
}

const handleConfirm = (formData, event) => {
  console.log('表單資料：', formData)
  // 在這裡處理表單提交邏輯
}

const handleCancel = (event) => {
  dialogComponent.value?.hide()

  console.log('取消操作')
  // 在這裡處理取消操作邏輯
}
</script>

<template>
  <div class="flex flex-col items-center gap-4 p-4">
    <div class="mb-4 text-2xl font-bold">對話框元件展示</div>

    <div class="flex flex-col items-center gap-4">
      <p class="text-gray-600">點擊下方按鈕開啟對話框</p>

      <Button
        label="開啟對話框"
        icon="pi pi-external-link"
        @click="showDialog"
      />
    </div>

    <DialogComponent
      ref="dialogComponent"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>
