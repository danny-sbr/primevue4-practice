<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import MultiSelect from 'primevue/multiselect'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

/** 引入型別定義 */
/** @typedef {import('./DataTableCustomerColumn.d.ts').ColumnConfig} ColumnConfig */
/** @typedef {import('./DataTableCustomerColumn.d.ts').ColumnOption} ColumnOption */
/** @typedef {import('./DataTableCustomerColumn.d.ts').TableDataItem} TableDataItem */
/** @typedef {import('./DataTableCustomerColumn.d.ts').SettingsData} SettingsData */
/** @typedef {import('./DataTableCustomerColumn.d.ts').ApiResponse} ApiResponse */
/** @typedef {import('./DataTableCustomerColumn.d.ts').ApiError} ApiError */
/** @typedef {import('./DataTableCustomerColumn.d.ts').ReorderEvent} ReorderEvent */
/** @typedef {import('./DataTableCustomerColumn.d.ts').ApiServiceInterface} ApiServiceInterface */

/** @type {any} */
const toast = useToast()

// 定義所有可用的欄位
/** @type {ColumnConfig[]} */
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
/** @type {ColumnOption[]} */
const columnOptions = [
  ...availableColumns.map((col) => ({
    label: col.header,
    value: col.field,
  })),
]

// LocalStorage 的 key
/** @type {string} */
const STORAGE_KEY = 'dataTable_customColumn_settings'

// 模擬 API 延遲時間（毫秒）
/** @type {number} */
const API_DELAY = 300

// 模擬 API 服務
/** @type {ApiServiceInterface} */
const apiService = {
  /**
   * 模擬 GET API - 獲取設定
   * @type {() => Promise<ApiResponse>}
   */
  async getSettings() {
    // 模擬網路延遲
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    try {
      /** @type {string | null} */
      const data = localStorage.getItem(STORAGE_KEY)
      if (!data) {
        // 模擬 404 Not Found
        throw new Error('Settings not found')
      }

      /** @type {SettingsData} */
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

  /**
   * 模擬 POST API - 儲存設定
   * @type {(settingsData: SettingsData) => Promise<ApiResponse>}
   */
  async saveSettings(settingsData) {
    // 模擬網路延遲
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    try {
      /** @type {SettingsData} */
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

  /**
   * 模擬 DELETE API - 刪除設定
   * @type {() => Promise<ApiResponse>}
   */
  async deleteSettings() {
    // 模擬網路延遲
    await new Promise((resolve) => setTimeout(resolve, API_DELAY))

    try {
      /** @type {boolean} */
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
/** @type {import('vue').Ref<string[]>} */
const selectedOptions = ref([])
/** @type {import('vue').Ref<string[]>} */
const selectedColumns = ref([])
/** @type {import('vue').Ref<string[]>} */
const columnOrder = ref([]) // 新增：追蹤欄位順序

// 計算是否顯示全部
/** @type {import('vue').ComputedRef<boolean>} */
const isShowAll = computed(() => {
  // 確保 selectedOptions 和 availableColumns 都是有效的陣列
  if (
    !Array.isArray(selectedOptions.value) ||
    !Array.isArray(availableColumns)
  ) {
    return false
  }

  // 檢查所有可用欄位是否都被選中
  /** @type {string[]} */
  const allFieldValues = availableColumns
    .filter((col) => col && typeof col.field === 'string')
    .map((col) => col.field)

  if (allFieldValues.length === 0) {
    return false
  }

  return allFieldValues.every((field) => selectedOptions.value.includes(field))
})

/**
 * 計算要顯示的欄位（考慮自訂順序）
 * 此計算屬性負責根據使用者的選擇和自訂排序來決定最終要顯示的欄位
 *
 * 處理邏輯分為三種情況：
 * 1. 顯示全部欄位（isShowAll = true）
 * 2. 沒有選擇任何欄位（selectedColumns 為空）
 * 3. 有選擇特定欄位且需要排序
 * @type {import('vue').ComputedRef<ColumnConfig[]>}
 */
const displayColumns = computed(() => {
  // 確保 availableColumns 存在且為陣列
  if (!Array.isArray(availableColumns) || availableColumns.length === 0) {
    return []
  }

  /**
   * 驗證欄位配置對象是否有效
   * @type {(col: any) => col is ColumnConfig}
   */
  const isValidColumn = (col) => {
    return (
      col &&
      typeof col === 'object' &&
      typeof col.field === 'string' &&
      col.field.trim() !== '' &&
      typeof col.header === 'string' &&
      col.header.trim() !== '' &&
      typeof col.minWidth === 'number' &&
      col.minWidth > 0 &&
      typeof col.sortable === 'boolean'
    )
  }

  // 【第一步】檢查是否要顯示全部欄位
  if (isShowAll.value) {
    // 確保 selectedColumns 和 selectedOptions 都包含所有欄位
    const allValidFields = availableColumns
      .filter(isValidColumn)
      .map((col) => col.field)

    // 【情況 1-A】顯示全部欄位且有自訂排序
    if (Array.isArray(columnOrder.value) && columnOrder.value.length > 0) {
      /** @type {ColumnConfig[]} */
      const orderedColumns = [] // 儲存排序後的欄位
      /** @type {ColumnConfig[]} */
      const remainingColumns = availableColumns.filter(isValidColumn) // 只保留有效的欄位

      // 【步驟 1-A-1】先按照使用者自訂的 columnOrder 順序加入欄位
      for (const fieldName of columnOrder.value) {
        // 確保 fieldName 是有效的字串且在所有可用欄位中
        if (
          typeof fieldName !== 'string' ||
          !fieldName.trim() ||
          !allValidFields.includes(fieldName)
        ) {
          continue
        }

        // 在所有可用欄位中找到對應的欄位物件
        /** @type {ColumnConfig | undefined} */
        const column = availableColumns.find(
          (col) => isValidColumn(col) && col.field === fieldName,
        )
        if (column) {
          orderedColumns.push(column) // 加入到排序後的陣列

          // 從剩餘欄位中移除已處理的欄位
          /** @type {number} */
          const index = remainingColumns.findIndex(
            (col) => col.field === fieldName,
          )
          if (index > -1) {
            remainingColumns.splice(index, 1)
          }
        }
      }

      // 【步驟 1-A-2】將未在自訂順序中的剩餘欄位按原始順序加入最後
      orderedColumns.push(...remainingColumns)
      return orderedColumns.filter(isValidColumn)
    }

    // 【情況 1-B】顯示全部欄位但沒有自訂排序，直接返回原始順序
    return availableColumns.filter(isValidColumn)
  }

  // 【第二步】檢查是否沒有選擇任何欄位
  if (
    !Array.isArray(selectedColumns.value) ||
    selectedColumns.value.length === 0
  ) {
    // 【情況 2】沒有選擇任何欄位，返回空陣列（顯示空表格）
    return []
  }

  // 【第三步】處理有選擇特定欄位的情況
  // 【情況 3-A】有選擇欄位且有自訂排序
  if (Array.isArray(columnOrder.value) && columnOrder.value.length > 0) {
    /** @type {ColumnConfig[]} */
    const orderedColumns = [] // 儲存排序後的欄位
    /** @type {string[]} */
    const remainingFields = [...selectedColumns.value] // 複製已選欄位清單

    // 【步驟 3-A-1】先按照 columnOrder 順序加入已選中的欄位
    for (const fieldName of columnOrder.value) {
      // 確保 fieldName 是有效的字串
      if (typeof fieldName !== 'string' || !fieldName.trim()) {
        continue
      }

      // 檢查此欄位是否在使用者選中的欄位中
      if (selectedColumns.value.includes(fieldName)) {
        /** @type {ColumnConfig | undefined} */
        const column = availableColumns.find(
          (col) => isValidColumn(col) && col.field === fieldName,
        )
        if (column) {
          orderedColumns.push(column) // 加入到排序後的陣列

          // 從剩餘欄位清單中移除已處理的欄位
          /** @type {number} */
          const index = remainingFields.indexOf(fieldName)
          if (index > -1) {
            remainingFields.splice(index, 1)
          }
        }
      }
    }

    // 【步驟 3-A-2】加入剩餘的已選中欄位（新選中但不在自訂順序中的欄位）
    for (const fieldName of remainingFields) {
      // 確保 fieldName 是有效的字串
      if (typeof fieldName !== 'string' || !fieldName.trim()) {
        continue
      }

      /** @type {ColumnConfig | undefined} */
      const column = availableColumns.find(
        (col) => isValidColumn(col) && col.field === fieldName,
      )
      if (column) {
        orderedColumns.push(column)
      }
    }

    return orderedColumns.filter(isValidColumn)
  }

  // 【情況 3-B】有選擇欄位但沒有自訂排序，按原始順序過濾
  return availableColumns.filter(
    (col) => isValidColumn(col) && selectedColumns.value.includes(col.field),
  )
})

// 空訊息
/** @type {import('vue').ComputedRef<string>} */
const emptyMessage = computed(() => {
  if (selectedColumns.value.length === 0 && !isShowAll.value) {
    return '未選擇任何欄位，請從上方選擇要顯示的欄位'
  }
  return '沒有符合條件的資料'
})

// 測試資料
/** @type {import('vue').Ref<TableDataItem[]>} */
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
    /** @type {(event: MouseEvent) => void} */
    onMouseenter: (event) => {
      const target = /** @type {HTMLElement} */ (event.currentTarget)
      target.style.backgroundColor = '#f8fafc'
    },
    /** @type {(event: MouseEvent) => void} */
    onMouseleave: (event) => {
      const target = /** @type {HTMLElement} */ (event.currentTarget)
      target.style.backgroundColor = ''
    },
  },
  bodyCell: {
    style: 'padding: 12px; border-bottom: 1px solid #f3f4f6;',
  },
}

// MultiSelect 的 PassThrough 設定
/** @type {Object} */
const multiSelectPt = {
  root: {
    style: 'min-height: 42px;',
  },
  label: {
    style: 'padding: 8px 12px;',
  },
}

/**
 * 處理欄位選擇
 * @type {(values: string[] | null | undefined) => void}
 */
const handleColumnSelection = (values) => {
  // 確保 values 是陣列且過濾掉空值
  const cleanValues = Array.isArray(values)
    ? values.filter((v) => v != null && v !== '' && typeof v === 'string')
    : []

  // 過濾有效的欄位值
  const validFields = cleanValues.filter(
    (v) =>
      typeof v === 'string' &&
      v.trim() !== '' &&
      availableColumns.some((col) => col && col.field === v),
  )

  // 檢查是否為全選狀態
  const allFieldValues = availableColumns
    .filter((col) => col && typeof col.field === 'string')
    .map((col) => col.field)

  const isSelectingAll =
    validFields.length === allFieldValues.length &&
    allFieldValues.every((field) => validFields.includes(field))

  // 設定選擇的欄位
  selectedOptions.value = validFields
  selectedColumns.value = validFields

  // 處理 columnOrder 的邏輯
  if (validFields.length === 0) {
    // 如果沒有選擇任何欄位，清空 columnOrder
    columnOrder.value = []
  } else if (isSelectingAll) {
    // 如果是全選，保留現有的 columnOrder（如果有的話）
    // 但要確保只包含有效的欄位
    const validExistingOrder = columnOrder.value.filter((field) =>
      validFields.includes(field),
    )
    columnOrder.value = validExistingOrder
  } else {
    // 部分選擇時，保留與選中欄位相關的順序
    const validExistingOrder = columnOrder.value.filter((field) =>
      validFields.includes(field),
    )
    columnOrder.value = validExistingOrder
  }
}

/**
 * 儲存設定 - 使用模擬 POST API
 */
const saveSettings = async () => {
  try {
    // 顯示載入中的訊息
    toast.add({
      severity: 'info',
      summary: '儲存中...',
      detail: '正在儲存欄位設定',
      life: 2000,
    })

    /** @type {SettingsData} */
    const settingsData = {
      selectedColumns: selectedColumns.value,
      columnOrder: columnOrder.value,
    }

    // 呼叫模擬 POST API
    /** @type {ApiResponse} */
    const response = await apiService.saveSettings(settingsData)

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

/**
 * 載入設定 - 使用模擬 GET API
 */
const loadSettings = async () => {
  try {
    // 呼叫模擬 GET API
    /** @type {ApiResponse} */
    const response = await apiService.getSettings()
    /** @type {SettingsData} */
    const settings = response.data

    // 先重置所有值，避免載入過程中的計算屬性錯誤
    columnOrder.value = []
    selectedColumns.value = []
    selectedOptions.value = []

    // 驗證載入的資料
    if (settings.selectedColumns && Array.isArray(settings.selectedColumns)) {
      // 過濾掉無效的欄位
      const validSelectedColumns = settings.selectedColumns.filter(
        (field) =>
          typeof field === 'string' &&
          field.trim() &&
          availableColumns.some((col) => col.field === field),
      )

      selectedColumns.value = validSelectedColumns
      selectedOptions.value = validSelectedColumns
    }

    if (settings.columnOrder && Array.isArray(settings.columnOrder)) {
      // 過濾掉無效的欄位順序
      const validColumnOrder = settings.columnOrder.filter(
        (field) =>
          typeof field === 'string' &&
          field.trim() &&
          availableColumns.some((col) => col.field === field),
      )

      columnOrder.value = validColumnOrder
    }

    console.log('已從 API 載入欄位設定：', response)
  } catch (error) {
    console.error('呼叫載入 API 時發生錯誤：', error)

    // 如果是 404 錯誤（沒有找到設定），這是正常情況
    if (error.status === 404) {
      console.log('沒有找到儲存的設定，使用預設值')
      // 確保使用預設值
      columnOrder.value = []
      selectedColumns.value = []
      selectedOptions.value = []
    } else {
      // 其他錯誤則顯示錯誤訊息
      toast.add({
        severity: 'warn',
        summary: '載入設定失敗',
        detail: error.message || '無法載入欄位設定',
        life: 3000,
      })
    }
  }
}

/**
 * 處理欄位重新排序
 * @type {(event: ReorderEvent) => void}
 */
const onColumnReorder = (event) => {
  // 從 event 中取得新的欄位順序
  if (event.dragIndex !== undefined && event.dropIndex !== undefined) {
    const currentDisplayColumns = displayColumns.value

    // 確保索引有效且欄位存在
    if (
      Array.isArray(currentDisplayColumns) &&
      currentDisplayColumns.length > 0 &&
      event.dragIndex >= 0 &&
      event.dropIndex >= 0 &&
      event.dragIndex < currentDisplayColumns.length &&
      event.dropIndex < currentDisplayColumns.length
    ) {
      const draggedColumn = currentDisplayColumns[event.dragIndex]
      const dropColumn = currentDisplayColumns[event.dropIndex]

      // 確保拖曳的欄位都是有效的對象
      if (
        draggedColumn &&
        dropColumn &&
        typeof draggedColumn === 'object' &&
        typeof dropColumn === 'object' &&
        draggedColumn.field &&
        dropColumn.field &&
        typeof draggedColumn.field === 'string' &&
        typeof dropColumn.field === 'string'
      ) {
        // 建立新的欄位順序，只取有效的欄位
        /** @type {string[]} */
        const validFields = currentDisplayColumns
          .filter(
            (col) =>
              col &&
              typeof col === 'object' &&
              col.field &&
              typeof col.field === 'string',
          )
          .map((col) => col.field)

        if (validFields.length > 0) {
          const newOrder = [...validFields]

          // 移除被拖曳的欄位
          const draggedField = newOrder.splice(event.dragIndex, 1)

          // 在新位置插入
          if (draggedField.length > 0 && typeof draggedField[0] === 'string') {
            newOrder.splice(event.dropIndex, 0, draggedField[0])
          }

          // 過濾掉無效的欄位並更新 columnOrder
          const validNewOrder = newOrder.filter(
            (field) =>
              typeof field === 'string' &&
              field.trim() !== '' &&
              availableColumns.some((col) => col && col.field === field),
          )

          // 使用 nextTick 確保 DOM 更新完成後再更新 columnOrder
          nextTick(() => {
            columnOrder.value = validNewOrder
            console.log('更新後的欄位順序：', validNewOrder)
          })
        }
      }
    }
  }
}

/**
 * 編輯項目
 * @type {(item: TableDataItem) => void}
 */
const editItem = (item) => {
  console.log('編輯項目：', item)
  // 這裡可以加入編輯邏輯
}

/**
 * 查看項目
 * @type {(item: TableDataItem) => void}
 */
const viewItem = (item) => {
  console.log('查看項目：', item)
  // 這裡可以加入查看邏輯
}

/**
 * 重置設定 - 使用模擬 DELETE API
 * @type {() => Promise<void>}
 */
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
    /** @type {ApiResponse} */
    const response = await apiService.deleteSettings()

    // 重置為預設值 - 按順序設定以避免計算屬性錯誤
    columnOrder.value = []
    selectedColumns.value = []
    selectedOptions.value = []

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

// 監控狀態變化以便調試
watch(
  [selectedColumns, selectedOptions, columnOrder],
  ([newSelectedColumns, newSelectedOptions, newColumnOrder]) => {
    // 確保狀態一致性
    if (newSelectedColumns.length !== newSelectedOptions.length) {
      console.warn('狀態不一致：selectedColumns 和 selectedOptions 長度不匹配')
    }

    // 確保 columnOrder 中的欄位都在 selectedColumns 中（當不是全選狀態時）
    if (newColumnOrder.length > 0 && !isShowAll.value) {
      const invalidOrderFields = newColumnOrder.filter(
        (field) => !newSelectedColumns.includes(field),
      )
      if (invalidOrderFields.length > 0) {
        console.warn(
          '狀態不一致：columnOrder 包含未選中的欄位：',
          invalidOrderFields,
        )
      }
    }
  },
  { deep: true },
)

// 組件掛載時載入設定
onMounted(async () => {
  try {
    await loadSettings()
  } catch (error) {
    console.error('載入設定時發生錯誤：', error)
    // 如果載入失敗，確保使用預設值
    columnOrder.value = []
    selectedColumns.value = []
    selectedOptions.value = []
  }
})
</script>

<template>
  <div class="mx-auto mt-6 max-w-7xl px-4">
    <!-- DataTable -->
    <div class="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <DataTable
        :value="tableData"
        show-gridlines
        striped-rows
        reorderable-columns
        resizable-columns
        column-resize-mode="expand"
        @column-reorder="onColumnReorder"
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
                  :loading="false"
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
            </div>
          </div>
        </template>
        <!-- 動態渲染選中的欄位 -->
        <Column
          v-for="col in displayColumns"
          :key="col && col.field ? col.field : `col-${Math.random()}`"
          :field="col && col.field ? col.field : ''"
          :header="col && col.header ? col.header : ''"
          :style="col && col.minWidth ? `min-width: ${col.minWidth}px;` : ''"
          :sortable="
            col && typeof col.sortable === 'boolean' ? col.sortable : false
          "
          :class="col && col.class ? col.class : ''"
        >
          <!-- ID 欄位 -->
          <template v-if="col && col.field === 'id'" #body="slotProps">
            <span class="font-mono text-sm text-gray-600">
              {{ slotProps.data.id }}
            </span>
          </template>

          <!-- 姓名欄位 -->
          <template v-if="col && col.field === 'name'" #body="slotProps">
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
          <template v-if="col && col.field === 'email'" #body="slotProps">
            <a
              :href="`mailto:${slotProps.data.email}`"
              class="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {{ slotProps.data.email }}
            </a>
          </template>

          <!-- 部門欄位 -->
          <template v-if="col && col.field === 'department'" #body="slotProps">
            <Tag :value="slotProps.data.department" rounded />
          </template>

          <!-- 電話欄位 -->
          <template v-if="col && col.field === 'phone'" #body="slotProps">
            <a
              :href="`tel:${slotProps.data.phone}`"
              class="font-mono text-sm text-gray-600 hover:text-gray-800"
            >
              {{ slotProps.data.phone }}
            </a>
          </template>

          <!-- 狀態欄位 -->
          <template v-if="col && col.field === 'status'" #body="slotProps">
            <Tag :value="slotProps.data.status" rounded />
          </template>

          <!-- 操作欄位 -->
          <template v-if="col && col.field === 'action'" #body="slotProps">
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
    <Toast />
  </div>
</template>
