<script setup>
import { ProductService } from './productService'

// 狀態管理相關
const loading = ref(false)

/** @typedef {import('vue').Ref<import('./DataTableDisplay').Product[]>} */
const products = ref([])

/** @typedef {import('vue').Ref<number>} */
const totalRecords = ref(0)

// 表格欄位設定
/**
 * 配置資料表格欄位時需要設定以下屬性：
 * @property {string} field - 指定要顯示的資料欄位名稱
 * @property {string} header - 設定表格標題列要顯示的文字
 */

// 資料載入相關函式
/** @param {import('./DataTableDisplay').TableOption} options */
const loadData = async (options) => {
  loading.value = true
  try {
    const res = await ProductService.getProducts(options)
    /** @typedef {import('./DataTableDisplay').Product[]} */

    console.log(res)
    const responseData = res.data
    products.value = responseData
    totalRecords.value = res.pagination.totalRecords
  } finally {
    loading.value = false
  }
}

// 事件處理函式
/**
 * @type {import('./DataTableDisplay').HandleSortFunction}
 */
const onSort = (event) => {
  loadData({
    page: 1,
    perPage: 5,
    sortField: event.sortField,
    sortOrder: event.sortOrder,
  })
}

/** @type {import('./DataTableDisplay').HandlePageFunction} */
const onPage = (event) => {
  loadData({
    page: event.page + 1,
    perPage: event.rows,
    sortField: event.sortField,
    sortOrder: event.sortOrder,
  })
}

// 生命週期鉤子
onMounted(() => {
  loadData({
    page: 1,
    perPage: 5,
    sortField: 'name',
    sortOrder: 1,
  })
})

/** @param {number} price */
const getPriceColor = (price) => {
  if (price > 50) {
    return 'text-red-400'
  }
  return ''
}
</script>
<template>
  <Card
    :pt="{
      root: 'border-round-md border-1 border-gray-800',
    }"
  >
    <template #title>DataTable</template>
    <template #content>
      <!--
        DataTable 排序功能說明：
        1. onSort 函式：當使用者點擊表格標題進行排序時觸發，會使用 onSort 函式撰寫傳送給後端 API 邏輯 得到排序後的回傳資料
        2. sortField: 設定首次載入表格時的預設排序欄位，例如 'name' 代表依名稱排序
        3. sortOrder: 設定首次載入表格時的排序方向
           - 1: 升序 (由小到大)
           - -1: 降序 (由大到小)
      -->
      <DataTable
        :value="products"
        :lazy="true"
        :totalRecords="totalRecords"
        tableStyle="min-width: 50rem; min-height: 300px"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :loading="loading"
        @page="onPage"
        @sort="onSort"
        :alwaysShowPaginator="false"
        sortField="name"
        :sortOrder="1"
      >
        <Column field="code" header="程式碼" sortable> </Column>
        <Column field="name" header="名稱" sortable></Column>
        <Column field="category" header="類別" sortable></Column>
        <Column field="quantity" header="數量" sortable></Column>
        <Column field="price" header="價格" sortable>
          <template #body="{ data: { price } }">
            <span :class="[getPriceColor(price)]">{{ price }}</span>
          </template>
        </Column>
        <Column field="inventoryStatus" header="庫存狀態" sortable></Column>
        <Column field="rating" header="評分" sortable></Column>
      </DataTable>
    </template>
  </Card>
</template>
<style scoped></style>
