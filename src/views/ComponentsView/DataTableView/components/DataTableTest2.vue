<script setup>
// TODO: 欄位寬度
// TODO: 選擇全部
const tableData = ref([
  {
    id: 1,
    name: '張小明',
    email: 'zhang.ming@example.com',
    department: '資訊部',
    phone: '0912-345-678',
    status: '在職',
  },
  {
    id: 2,
    name: '李小華',
    email: 'li.hua@example.com',
    department: '業務部',
    phone: '0923-456-789',
    status: '在職',
  },
  {
    id: 3,
    name: '王小美',
    email: 'wang.mei@example.com',
    department: '人事部',
    phone: '0934-567-890',
    status: '休假',
  },
  {
    id: 4,
    name: '陳小強',
    email: 'chen.qiang@example.com',
    department: '財務部',
    phone: '0945-678-901',
    status: '在職',
  },
  {
    id: 5,
    name: '林小芳',
    email: 'lin.fang@example.com',
    department: '行銷部',
    phone: '0956-789-012',
    status: '離職',
  },
])

const originalColumns = [
  { field: 'name', header: 'Name' },
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone' },
  { field: 'status', header: 'Status' },
  { field: 'department', header: 'Department' },
  { field: 'id', header: 'ID' },
]

const originalSelectedOptions = originalColumns.map((col) => {
  return {
    isShow: false,
    width: 100,
    label: col.header,
    value: col.field,
  }
})

const selectedOptions = ref([])

const displayColumns = ref(originalSelectedOptions)

const onColumnReorder = (event) => {
  // 複製一份 displayColumns 陣列
  const newOrderColumns = [...displayColumns.value]

  // 先移除拖拉的欄位，由於 splice 會回傳被移除的元素所組成的陣列，之後解構即可得到移除的元素
  const [draggedColumn] = newOrderColumns.splice(event.dragIndex, 1)

  // 將移除的欄位插入到新位置
  newOrderColumns.splice(event.dropIndex, 0, draggedColumn)

  // 更新 orderColumns
  displayColumns.value = newOrderColumns
}

const updateSelectedOptions = (val) => {
  // 用於暫存當前變更的選項
  let currentSelectedOptions = []

  // 判斷是否為全選操作（選中項目數量等於所有可選項目數量）
  const isSelectAll = val.length === originalSelectedOptions.length

  // 判斷是否為全部取消選擇操作（選中項目數量為 0）
  const isDeselectAll = val.length === 0

  // 處理全選的情況
  if (isSelectAll) {
    // 將所有原始選項設為當前選中的選項
    currentSelectedOptions = originalSelectedOptions

    // 將所有欄位的顯示狀態設為 true（顯示）
    displayColumns.value = displayColumns.value.map((col) => {
      col.isShow = true
      return col
    })
  }
  // 處理全部取消選擇的情況
  else if (isDeselectAll) {
    // 清空當前選中的選項
    currentSelectedOptions = []

    // 將所有欄位的顯示狀態設為 false（隱藏）
    displayColumns.value = displayColumns.value.map((col) => {
      col.isShow = false
      return col
    })
  }
  // 處理個別選項的增減（非全選/全取消的情況）
  else {
    // 如果新的選項數量大於之前的選項數量，表示有新增選項
    if (val.length > selectedOptions.value.length) {
      // 找出新增的選項（在新陣列中但不在舊陣列中的項目）
      currentSelectedOptions = val.filter(
        (item) =>
          !selectedOptions.value.some(
            (selectedItem) => selectedItem.value === item.value,
          ),
      )
    }
    // 如果新的選項數量小於之前的選項數量，表示有移除選項
    else if (val.length < selectedOptions.value.length) {
      // 找出被移除的選項（在舊陣列中但不在新陣列中的項目）
      currentSelectedOptions = selectedOptions.value.filter(
        (item) =>
          !val.some((selectedItem) => selectedItem.value === item.value),
      )
    }

    // 取得變更選項的值
    const currentSelectedOptionsValue = currentSelectedOptions[0].value

    // 取得該選項目前的顯示狀態
    const currentSelectedOptionsIsShow = currentSelectedOptions[0].isShow

    // 更新對應欄位的顯示狀態（切換顯示/隱藏）
    displayColumns.value = displayColumns.value.map((col) => {
      if (col.value === currentSelectedOptionsValue) {
        // 如果是目標欄位，則切換其顯示狀態
        col.isShow = !currentSelectedOptionsIsShow
      }
      return col
    })
  }

  // 更新選中的選項狀態
  selectedOptions.value = val
}

/** @type {string} */
const STORAGE_KEY = 'dataTable_customColumn_settings'

const saveSettings = () => {
  // 將響應式陣列轉換為原始陣列
  const rawColumns = toRaw(displayColumns.value)

  // 深度轉換每個欄位物件，移除所有響應式包裝
  const storageColumns = rawColumns.map((item) => toRaw(item))

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageColumns))
}

const resetSettings = () => {
  console.log('resetSettings')
}

onMounted(() => {
  if (localStorage.getItem(STORAGE_KEY)) {
    const storedSettings = localStorage.getItem(STORAGE_KEY)
    const loadedColumns = JSON.parse(storedSettings)
    displayColumns.value = loadedColumns
  }
})
</script>
<template>
  {{ console.log('template displayColumns', displayColumns) }}

  {{ console.log('template selectedOptions', selectedOptions) }}
  <DataTable
    :value="tableData"
    show-gridlines
    striped-rows
    reorderable-columns
    @column-reorder="onColumnReorder"
  >
    <template #header>
      <div class="flex flex-wrap items-end gap-4">
        <div class="min-w-80 flex-1">
          <label class="mb-2 block font-semibold text-gray-700">
            選擇要顯示的欄位：
          </label>

          <MultiSelect
            :value="selectedOptions"
            :options="originalSelectedOptions"
            @update:model-value="updateSelectedOptions"
            option-label="label"
            display="chip"
            placeholder="請選擇要顯示的欄位"
            class="w-full"
            :selection-limit="null"
            :show-clear="true"
            data-key="value"
            :show-toggle-all="true"
          />
        </div>
        <div class="flex gap-2">
          <Button
            icon="pi pi-save"
            label="儲存欄位設定"
            @click="saveSettings"
            :disabled="selectedOptions.length === 0"
            class="whitespace-nowrap"
            v-tooltip.top="'儲存當前的欄位選擇和排序到瀏覽器本地儲存'"
          />
          <Button
            icon="pi pi-refresh"
            label="重置設定"
            @click="resetSettings"
            severity="secondary"
            outlined
            class="whitespace-nowrap"
            v-tooltip.top="'清除儲存的設定並回到預設狀態'"
          />
        </div>
      </div>
    </template>
    <Column
      v-for="col in displayColumns"
      :key="col.value"
      :field="col.value"
      :header="col.label"
      :class="{ hidden: !col.isShow }"
    />
  </DataTable>
</template>
<style scoped></style>
