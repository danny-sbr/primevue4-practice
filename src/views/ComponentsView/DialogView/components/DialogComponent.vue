<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const emit = defineEmits(['cancel', 'confirm'])

const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  note: '',
})

const dialogVisible = ref(false)

const confirmHandler = (e) => {
  if (!formData.value.name || !formData.value.email) {
    toast.add({
      severity: 'error',
      summary: '錯誤',
      life: 3000,
      detail: '請填寫必填欄位',
    })
    return
  }
  emit('confirm', formData.value, e)
}

const cancelHandler = (e) => {
  emit('cancel', e)
}

const show = () => {
  dialogVisible.value = true
}

const hide = () => {
  dialogVisible.value = false
}

defineExpose({ show, hide })
</script>

<template>
  <Toast class="w-[80dvw] md:w-96" />
  <Dialog
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    v-model:visible="dialogVisible"
    :style="{ width: '50rem' }"
    header="表單範例"
  >
    <form @submit.prevent="confirmHandler">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12">
          <label class="mb-2 block">
            姓名<span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="formData.name"
            placeholder="請輸入姓名"
            class="w-full"
          />
        </div>

        <div class="col-span-12">
          <label class="mb-2 block">
            電子郵件<span class="text-red-500">*</span>
          </label>
          <InputText
            v-model="formData.email"
            placeholder="請輸入電子郵件"
            class="w-full"
            type="email"
          />
        </div>

        <div class="col-span-12">
          <label class="mb-2 block">電話</label>
          <InputText
            v-model="formData.phone"
            placeholder="請輸入電話"
            class="w-full"
          />
        </div>

        <div class="col-span-12">
          <label class="mb-2 block">地址</label>
          <InputText
            v-model="formData.address"
            placeholder="請輸入地址"
            class="w-full"
          />
        </div>

        <div class="col-span-12">
          <label class="mb-2 block">備註</label>
          <Textarea
            v-model="formData.note"
            rows="5"
            class="w-full resize-none"
            placeholder="請輸入備註"
          />
        </div>

        <div class="col-span-12 flex w-full justify-center gap-6">
          <Button
            label="取消"
            icon="pi pi-times"
            severity="secondary"
            @click="cancelHandler"
          />
          <Button
            label="確認"
            type="submit"
            icon="pi pi-check"
            class="min-w-36"
          />
        </div>
      </div>
    </form>
  </Dialog>
</template>

<style scoped lang="scss">
.p-dialog {
  @apply max-h-[90vh] overflow-auto;
}
</style>
