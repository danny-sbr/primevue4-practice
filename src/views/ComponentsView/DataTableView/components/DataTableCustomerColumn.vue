<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

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

// LocalStorage 的 key
const STORAGE_KEY = 'dataTable_customColumn_settings'

// 模擬 API 延遲時間（毫秒）
const API_DELAY = 300

// 模擬 API 服務
const apiService = {
  // 模擬 GET API - 獲取設定
  async getSettings() {
    // 模擬網路延遲
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) {
        // 模擬 404 Not Found
        throw new Error('Settings not found')
      }

      const settings = JSON.parse(data)

      // 模擬 API 回應格式
      return {
        status: 200,
        data: settings,
        message: '成功取得設定',
      }
    } catch (error) {
      if (error.message === 'Settings not found') {
        throw {
          status: 404,
          message: '找不到儲存的設定',
        }
      }
      throw {
        status: 500,
        message: '取得設定時發生錯誤',
        error: error.message,
      }
    }
  },

  // 模擬 POST API - 儲存設定
  async saveSettings(settingsData) {
    // 模擬網路延遲
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    try {
      const dataToSave = {
        ...settingsData,
        savedAt: new Date().toISOString(),
        version: '1.0',
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))

      // 模擬 API 回應格式
      return {
        status: 201,
        data: dataToSave,
        message: '設定儲存成功',
      }
    } catch (error) {
      throw {
        status: 500,
        message: '儲存設定時發生錯誤',
        error: error.message,
      }
    }
  },

  // 模擬 DELETE API - 刪除設定
  async deleteSettings() {
    // 模擬網路延遲
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    try {
      const existed = localStorage.getItem(STORAGE_KEY) !== null
      localStorage.removeItem(STORAGE_KEY)

      // 模擬 API 回應格式
      return {
        status: 200,
        message: existed ? '設定刪除成功' : '沒有找到要刪除的設定',
      }
    } catch (error) {
      throw {
        status: 500,
        message: '刪除設定時發生錯誤',
        error: error.message,
      }
    }
  },
}

// 響應式資料 - 直接初始化為正確的值
const selectedOptions = ref([])
const selectedColumns = ref([])
const columnOrder = ref([]) // 新增：追蹤欄位順序
const hasStoredSettings = ref(false) // 新增：是否有儲存的設定

// 計算是否顯示全部
const isShowAll = computed(() => {
  // 檢查所有可用欄位是否都被選中
  const allFieldValues = availableColumns.map((col) => col.field)
  return allFieldValues.every((field) => selectedOptions.value.includes(field))
})

// 計算要顯示的欄位（考慮自訂順序）
const displayColumns = computed(() => {
  if (isShowAll.value) {
    // 如果顯示全部，根據 columnOrder 排序，沒有在 order 中的欄位按原順序放在最後
    if (columnOrder.value.length > 0) {
      const orderedColumns = []
      const remainingColumns = [...availableColumns]

      // 先按照 columnOrder 的順序加入欄位
      for (const fieldName of columnOrder.value) {
        const column = availableColumns.find((col) => col.field === fieldName)
        if (column) {
          orderedColumns.push(column)
          const index = remainingColumns.findIndex(
            (col) => col.field === fieldName,
          )
          if (index > -1) {
            remainingColumns.splice(index, 1)
          }
        }
      }

      // 再加入剩餘的欄位
      orderedColumns.push(...remainingColumns)
      return orderedColumns
    }
    return availableColumns
  }

  if (selectedColumns.value.length === 0) {
    return []
  }

  // 根據 columnOrder 和 selectedColumns 來排序
  if (columnOrder.value.length > 0) {
    const orderedColumns = []
    const remainingFields = [...selectedColumns.value]

    // 先按照 columnOrder 的順序加入已選中的欄位
    for (const fieldName of columnOrder.value) {
      if (selectedColumns.value.includes(fieldName)) {
        const column = availableColumns.find((col) => col.field === fieldName)
        if (column) {
          orderedColumns.push(column)
          const index = remainingFields.indexOf(fieldName)
          if (index > -1) {
            remainingFields.splice(index, 1)
          }
        }
      }
    }

    // 再加入剩餘的已選中欄位（新選中但不在 order 中的）
    for (const fieldName of remainingFields) {
      const column = availableColumns.find((col) => col.field === fieldName)
      if (column) {
        orderedColumns.push(column)
      }
    }

    return orderedColumns
  }

  return availableColumns.filter((col) =>
    selectedColumns.value.includes(col.field),
  )
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

// DataTable 的 PassThrough 設定
const dataTablePt = {
  thead: {
    style: 'background-color: #f8fafc;',
  },
  headerCell: {
    style:
      'background-color: #f8fafc; font-weight: 600; color: #374151; border-bottom: 2px solid #e5e7eb; padding: 12px;',
  },
  bodyRow: {
    style: 'transition: background-color 0.2s;',
    onMouseenter: (event) => {
      event.currentTarget.style.backgroundColor = '#f8fafc'
    },
    onMouseleave: (event) => {
      event.currentTarget.style.backgroundColor = ''
    },
  },
  bodyCell: {
    style: 'padding: 12px; border-bottom: 1px solid #f3f4f6;',
  },
}

// MultiSelect 的 PassThrough 設定
const multiSelectPt = {
  root: {
    style: 'min-height: 42px;',
  },
  label: {
    style: 'padding: 8px 12px;',
  },
}

// 處理欄位選擇
const handleColumnSelection = (values) => {
  // 確保 values 是陣列且過濾掉空值
  const cleanValues = Array.isArray(values)
    ? values.filter((v) => v != null && v !== '')
    : []

  // 過濾有效的欄位值
  const validFields = cleanValues.filter((v) =>
    availableColumns.some((col) => col.field === v),
  )

  selectedOptions.value = validFields
  selectedColumns.value = validFields
}

// 儲存設定 - 使用模擬 POST API
const saveSettings = async () => {
  try {
    // 顯示載入中的訊息
    toast.add({
      severity: 'info',
      summary: '儲存中...',
      detail: '正在儲存欄位設定',
      life: 2000,
    })

    const settingsData = {
      selectedColumns: selectedColumns.value,
      columnOrder: columnOrder.value,
    }

    // 呼叫模擬 POST API
    const response = await apiService.saveSettings(settingsData)

    hasStoredSettings.value = true

    toast.add({
      severity: 'success',
      summary: '儲存成功',
      detail: response.message,
      life: 3000,
    })

    console.log('API 回應：', response)
  } catch (error) {
    console.error('呼叫儲存 API 時發生錯誤：', error)
    toast.add({
      severity: 'error',
      summary: '儲存失敗',
      detail: error.message || '無法儲存欄位設定',
      life: 3000,
    })
  }
}

// 載入設定 - 使用模擬 GET API
const loadSettings = async () => {
  try {
    // 呼叫模擬 GET API
    const response = await apiService.getSettings()
    const settings = response.data

    // 驗證載入的資料
    if (settings.selectedColumns && Array.isArray(settings.selectedColumns)) {
      // 過濾掉無效的欄位
      const validSelectedColumns = settings.selectedColumns.filter((field) =>
        availableColumns.some((col) => col.field === field),
      )

      selectedColumns.value = validSelectedColumns
      selectedOptions.value = validSelectedColumns
    }

    if (settings.columnOrder && Array.isArray(settings.columnOrder)) {
      // 過濾掉無效的欄位順序
      const validColumnOrder = settings.columnOrder.filter((field) =>
        availableColumns.some((col) => col.field === field),
      )

      columnOrder.value = validColumnOrder
    }

    hasStoredSettings.value = true
    console.log('已從 API 載入欄位設定：', response)
  } catch (error) {
    console.error('呼叫載入 API 時發生錯誤：', error)

    // 如果是 404 錯誤（沒有找到設定），這是正常情況
    if (error.status === 404) {
      hasStoredSettings.value = false
      console.log('沒有找到儲存的設定，使用預設值')
    } else {
      // 其他錯誤則顯示錯誤訊息
      hasStoredSettings.value = false
      toast.add({
        severity: 'warn',
        summary: '載入設定失敗',
        detail: error.message || '無法載入欄位設定',
        life: 3000,
      })
    }
  }
}

// 處理欄位重新排序
const onColumnReorder = (event) => {
  // 從 event 中取得新的欄位順序
  if (event.dragIndex !== undefined && event.dropIndex !== undefined) {
    const currentDisplayColumns = displayColumns.value
    const draggedColumn = currentDisplayColumns[event.dragIndex]
    const dropColumn = currentDisplayColumns[event.dropIndex]

    if (draggedColumn && dropColumn) {
      // 建立新的欄位順序
      const newOrder = [...currentDisplayColumns.map((col) => col.field)]

      // 移除被拖曳的欄位
      const draggedField = newOrder.splice(event.dragIndex, 1)[0]

      // 在新位置插入
      newOrder.splice(event.dropIndex, 0, draggedField)

      // 更新 columnOrder
      columnOrder.value = newOrder

      console.log('更新後的欄位順序：', newOrder)
    }
  }
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

// 重置設定 - 使用模擬 DELETE API
const resetSettings = async () => {
  try {
    // 顯示載入中的訊息
    toast.add({
      severity: 'info',
      summary: '重置中...',
      detail: '正在清除欄位設定',
      life: 2000,
    })

    // 呼叫模擬 DELETE API
    const response = await apiService.deleteSettings()

    // 重置為預設值
    selectedColumns.value = []
    selectedOptions.value = []
    columnOrder.value = []
    hasStoredSettings.value = false

    toast.add({
      severity: 'info',
      summary: '重置成功',
      detail: response.message,
      life: 3000,
    })

    console.log('API 回應：', response)
  } catch (error) {
    console.error('呼叫重置 API 時發生錯誤：', error)
    toast.add({
      severity: 'error',
      summary: '重置失敗',
      detail: error.message || '無法清除欄位設定',
      life: 3000,
    })
  }
}

// 組件掛載時載入設定
onMounted(async () => {
  await loadSettings()
})
</script>

<template>
  <div class="mx-auto mt-6 max-w-7xl px-4">
    <!-- DataTable -->
    <div class="overflow-hidden rounded-lg border bg-white shadow-sm">
      <DataTable
        :value="tableData"
        show-gridlines
        striped-rows
        reorderable-columns
        resizable-columns
        column-resize-mode="expand"
        @column-reorder="onColumnReorder"
        class="p-datatable-sm"
        :empty-message="emptyMessage"
        :pt="dataTablePt"
      >
        <template #header>
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
                  :selection-limit="null"
                  :show-clear="true"
                  data-key="value"
                  :pt="multiSelectPt"
                />
              </div>

              <!-- 儲存設定按鈕 -->
              <div class="flex gap-2">
                <Button
                  icon="pi pi-save"
                  label="儲存欄位設定"
                  @click="saveSettings"
                  :disabled="selectedColumns.length === 0"
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

            <!-- 選擇狀態提示 -->
            <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <span
                v-if="isShowAll"
                class="inline-flex items-center text-green-600"
              >
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

              <!-- 儲存狀態提示 -->
              <span
                v-if="hasStoredSettings"
                class="inline-flex items-center text-purple-600"
              >
                <i class="pi pi-database mr-1"></i>
                使用儲存的設定
              </span>
            </div>
          </div>
        </template>
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

    <!-- Toast 組件用於顯示儲存訊息 -->
    <Toast />
  </div>
</template>
