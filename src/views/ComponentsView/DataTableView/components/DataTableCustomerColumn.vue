<script setup>
import { ref, computed, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

// 定義所有可用的欄位
const availableColumns = [
  { field: 'id', header: 'ID', minWidth: 80, sortable: true },
  { field: 'name', header: '姓名', minWidth: 150, sortable: true },
  { field: 'email', header: '電子郵件', minWidth: 200, sortable: true },
  { field: 'department', header: '部門', minWidth: 120, sortable: true },
  { field: 'phone', header: '電話', minWidth: 150, sortable: false },
  { field: 'status', header: '狀態', minWidth: 100, sortable: true },
  { field: 'action', header: '操作', minWidth: 120, sortable: false },
]

// MultiSelect 的選項
const columnOptions = [
  ...availableColumns.map((col) => ({
    label: col.header,
    value: col.field,
  })),
]

// 響應式資料 - 直接初始化為正確的值
const selectedOptions = ref([])
const selectedColumns = ref([])

// 計算是否顯示全部
const isShowAll = computed(() => {
  // 檢查所有可用欄位是否都被選中
  const allFieldValues = availableColumns.map((col) => col.field)
  return allFieldValues.every((field) => selectedOptions.value.includes(field))
})

// 計算要顯示的欄位
const displayColumns = computed(() => {
  if (isShowAll.value) {
    return availableColumns
  }

  if (selectedColumns.value.length === 0) {
    return []
  }

  return availableColumns.filter((col) =>
    selectedColumns.value.includes(col.field),
  )
})

// 計算表格樣式
const tableStyle = computed(() => {
  const minWidth = displayColumns.value.reduce(
    (sum, col) => sum + col.minWidth,
    0,
  )
  return `min-width: ${minWidth}px; width: 100%;`
})

// 空訊息
const emptyMessage = computed(() => {
  if (selectedColumns.value.length === 0 && !isShowAll.value) {
    return '未選擇任何欄位，請從上方選擇要顯示的欄位'
  }
  return '沒有符合條件的資料'
})

// 測試資料
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

// 處理欄位選擇
const handleColumnSelection = (values) => {
  // 確保 values 是陣列且過濾掉空值
  const cleanValues = Array.isArray(values)
    ? values.filter((v) => v != null && v !== '')
    : []

  if (cleanValues.includes('all')) {
    // 如果選擇了"全部"，只保留 all 選項
    selectedOptions.value = ['all']
    selectedColumns.value = []
  } else {
    // 如果選擇了具體欄位，移除"全部"選項並過濾有效值
    const validFields = cleanValues.filter(
      (v) => v !== 'all' && availableColumns.some((col) => col.field === v),
    )
    selectedOptions.value = validFields
    selectedColumns.value = validFields
  }
}

// 處理欄位重新排序
const onColumnReorder = (event) => {
  // 這裡可以加入欄位重新排序的邏輯
  console.log('Column reordered:', event)
}

// 編輯項目
const editItem = (item) => {
  console.log('編輯項目：', item)
  // 這裡可以加入編輯邏輯
}

// 查看項目
const viewItem = (item) => {
  console.log('查看項目：', item)
  // 這裡可以加入查看邏輯
}

// 監聽選項變化
watch(
  selectedOptions,
  (newValue) => {
    console.log('選擇的欄位：', newValue)
    // 檢查是否有空值或 undefined
    const hasEmptyValues = newValue.some((v) => v == null || v === '')
    if (hasEmptyValues) {
      console.warn('檢測到空值，自動清理：', newValue)
      // 自動清理空值
      selectedOptions.value = newValue.filter((v) => v != null && v !== '')
    }
  },
  { deep: true },
)

// 移除不必要的初始化，因為 selectedOptions 已經直接設定預設值
</script>

<style scoped>
/* PrimeVue DataTable 客製化樣式 */
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f8fafc;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #f8fafc;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 12px;
  border-bottom: 1px solid #f3f4f6;
}

:deep(.p-multiselect) {
  min-height: 42px;
}

:deep(.p-multiselect .p-multiselect-label) {
  padding: 8px 12px;
}
</style>

<template>
  <div class="mx-auto mt-6 max-w-7xl px-4">
    <h3 class="mb-6 text-2xl font-bold">可動態選擇欄位的 DataTable</h3>

    <!-- 欄位選擇控制區域 -->
    <div class="mb-6 rounded-lg border bg-white p-6 shadow-sm">
      <div class="flex flex-wrap items-end gap-4">
        <div class="min-w-80 flex-1">
          <label class="mb-2 block font-semibold text-gray-700">
            選擇要顯示的欄位：
          </label>
          <MultiSelect
            v-model="selectedOptions"
            :options="columnOptions"
            option-label="label"
            option-value="value"
            @update:model-value="handleColumnSelection"
            display="chip"
            placeholder="請選擇要顯示的欄位"
            class="w-full"
            :max-selected-labels="3"
            :selection-limit="null"
            :filter="false"
            :show-clear="true"
            data-key="value"
          />
        </div>
      </div>

      <!-- 選擇狀態提示 -->
      <div class="mt-4 text-sm text-gray-600">
        <span v-if="isShowAll" class="inline-flex items-center text-green-600">
          <i class="pi pi-check-circle mr-1"></i>
          顯示全部欄位
        </span>
        <span
          v-else-if="selectedColumns.length === 0"
          class="inline-flex items-center text-orange-600"
        >
          <i class="pi pi-info-circle mr-1"></i>
          未選擇任何欄位 - 顯示空表格
        </span>
        <span v-else class="inline-flex items-center text-blue-600">
          <i class="pi pi-filter mr-1"></i>
          已選擇 {{ selectedColumns.length }} 個欄位
        </span>
      </div>
    </div>

    <!-- DataTable -->
    <div class="overflow-hidden rounded-lg border bg-white shadow-sm">
      <DataTable
        :value="tableData"
        :table-style="tableStyle"
        show-gridlines
        striped-rows
        reorderable-columns
        resizable-columns
        column-resize-mode="expand"
        @column-reorder="onColumnReorder"
        class="p-datatable-sm"
        :empty-message="emptyMessage"
      >
        <!-- 動態渲染選中的欄位 -->
        <Column
          v-for="col in displayColumns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          :style="`min-width: ${col.minWidth}px;`"
          :sortable="col.sortable"
          :class="col.class"
        >
          <!-- ID 欄位 -->
          <template v-if="col.field === 'id'" #body="slotProps">
            <span class="font-mono text-sm text-gray-600">
              {{ slotProps.data.id }}
            </span>
          </template>

          <!-- 姓名欄位 -->
          <template v-if="col.field === 'name'" #body="slotProps">
            <div class="flex items-center">
              <div
                class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100"
              >
                <span class="text-sm font-semibold text-blue-600">
                  {{ slotProps.data.name.charAt(0) }}
                </span>
              </div>
              <span class="font-medium">{{ slotProps.data.name }}</span>
            </div>
          </template>

          <!-- 電子郵件欄位 -->
          <template v-if="col.field === 'email'" #body="slotProps">
            <a
              :href="`mailto:${slotProps.data.email}`"
              class="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {{ slotProps.data.email }}
            </a>
          </template>

          <!-- 部門欄位 -->
          <template v-if="col.field === 'department'" #body="slotProps">
            <Tag :value="slotProps.data.department" rounded />
          </template>

          <!-- 電話欄位 -->
          <template v-if="col.field === 'phone'" #body="slotProps">
            <a
              :href="`tel:${slotProps.data.phone}`"
              class="font-mono text-sm text-gray-600 hover:text-gray-800"
            >
              {{ slotProps.data.phone }}
            </a>
          </template>

          <!-- 狀態欄位 -->
          <template v-if="col.field === 'status'" #body="slotProps">
            <Tag :value="slotProps.data.status" rounded />
          </template>

          <!-- 操作欄位 -->
          <template v-if="col.field === 'action'" #body="slotProps">
            <div class="flex gap-2">
              <Button
                icon="pi pi-pencil"
                size="small"
                outlined
                @click="editItem(slotProps.data)"
                v-tooltip.top="'編輯'"
              />
              <Button
                icon="pi pi-eye"
                size="small"
                severity="secondary"
                outlined
                @click="viewItem(slotProps.data)"
                v-tooltip.top="'查看'"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- 統計資訊 -->
    <div class="mt-4 flex items-center justify-between text-sm text-gray-600">
      <span>共 {{ tableData.length }} 筆資料</span>
      <span v-if="selectedColumns.length > 0">
        顯示 {{ selectedColumns.length }} / {{ availableColumns.length }} 個欄位
      </span>
    </div>
  </div>
</template>
