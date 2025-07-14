<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

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

const onColumnReorder = (event) => {
  console.log('event', event)
  console.log('event.dragIndex', event.dragIndex)
  console.log('event.dropIndex', event.dropIndex)
}

const orderColumns = ref([])

const displayColumns = computed(() => {
  return orderColumns.value.map((col) => {
    return {
      ...col,
    }
  })
})
</script>
<template>
  <DataTable
    :value="displayColumns"
    show-gridlines
    striped-rows
    reorderable-columns
    @column-reorder="onColumnReorder"
  >
    <Column field="name" header="Name"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="phone" header="Phone"></Column>
    <Column field="status" header="Status"></Column>
  </DataTable>
</template>
<style scoped></style>
