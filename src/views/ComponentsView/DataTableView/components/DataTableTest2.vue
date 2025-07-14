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
  console.log('欄位重新排序：', event)
  console.log('拖拉來源 index:', event.dragIndex)
  console.log('放置目標 index:', event.dropIndex)

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
  console.log('updateSelectedOptions selectedOptions', selectedOptions.value)
  console.log('updateSelectedOptions val', val)

  let currentSelectedOptions = []
  if (val.length > selectedOptions.value.length) {
    currentSelectedOptions = val.filter(
      (item) =>
        !selectedOptions.value.some(
          (selectedItem) => selectedItem.value === item.value,
        ),
    )
  } else if (val.length < selectedOptions.value.length) {
    currentSelectedOptions = selectedOptions.value.filter(
      (item) => !val.some((selectedItem) => selectedItem.value === item.value),
    )
  }

  const currentSelectedOptionsValue = currentSelectedOptions[0].value
  const currentSelectedOptionsIsShow = currentSelectedOptions[0].isShow

  displayColumns.value = displayColumns.value.map((col) => {
    if (col.value === currentSelectedOptionsValue) {
      col.isShow = !currentSelectedOptionsIsShow
    }
    return col
  })

  console.log('displayColumns', displayColumns.value)

  selectedOptions.value = val
}
</script>
<template>
  {{ console.log('displayColumns.value', displayColumns) }}
  <DataTable
    :value="tableData"
    show-gridlines
    striped-rows
    reorderable-columns
    @column-reorder="onColumnReorder"
  >
    <template #header>
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
        />
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
