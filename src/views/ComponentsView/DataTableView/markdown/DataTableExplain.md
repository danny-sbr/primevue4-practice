

# DataTable 

## 基本用法

DataTable 元件需要一個 value 屬性來指定要顯示的資料，這個 value 通常是一個陣列。

搭配 Column 子元件，我們可以定義表格的欄位。每個 Column 元件是用來設定標頭名稱，並指定要從資料陣列中取得哪個欄位的值來顯示。


假設我們有一組資料如下

```json
[
    {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo Watch",
        "description": "Product Description",
        "image": "bamboo-watch.jpg",
        "price": 65,
        "category": "Accessories",
        "quantity": 24,
        "inventoryStatus": "INSTOCK",
        "rating": 5
    },
    {
        "id": "1001",
        "code": "nvklal433",
        "name": "Black Watch",
        "description": "Product Description",
        "image": "black-watch.jpg",
        "price": 72,
        "category": "Accessories",
        "quantity": 61,
        "inventoryStatus": "INSTOCK",
        "rating": 4
    },// 以此類推
]
```

### 靜態 Column 元件

在 DataTable 中，我們可以透過 Column 元件來呈現資料。每個 Column 元件都需要設定兩個重要的屬性：
- field: 用來指定要顯示的資料來源欄位名稱
- header: 用來設定表格標頭要顯示的文字

```jsx
<DataTable :value="products">
  <Column field="code" header="程式碼"></Column>
  <Column field="name" header="名稱"></Column>
  <Column field="category" header="類別"></Column>
  <Column field="quantity" header="數量"></Column>
  <Column field="price" header="價格"></Column>
  <Column field="inventoryStatus" header="庫存狀態"></Column>
  <Column field="rating" header="評分"></Column>
</DataTable>
```

### 動態 Column 元件

我們也可以透過程式的方式動態產生 Column 元件。

```html
<script setup>
const columns = [
  { field: 'code', header: '程式碼' },
  { field: 'name', header: '名稱' },
  { field: 'category', header: '類別' },
  { field: 'quantity', header: '數量' },
  { field: 'price', header: '價格' },
]
</script>
<template>  
<DataTable :value="products" tableStyle="min-width: 50rem">
  <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
</DataTable>
</template>
```
## 自訂 cell 內容

除了基本的顯示之外，DataTable 的 Column 元件還可以透過 `body` 屬性來顯示自訂的內容，例如想要讓價格大於 50 的顏色變成紅色，就可以使用以下方式：

```jsx
<Column field="price" header="價格" sortable>
  <template #body="{ data: { price } }">
    <span :class="[price > 50 ? 'text-red-400' : '']">{{ price }}</span>
  </template>
</Column>
```

## 排序

### 添加 sortable 與 @sort 事件

如果要讓 DataTable 的排序功能由後端伺服器處理，我們需要做兩件事：
1. 在需要排序的欄位上加上 `sortable` 屬性
2. 使用 `@sort` 事件來處理排序邏輯

範例如下：

```jsx
<DataTable :value="products" @sort="onSort">
  <Column field="code" header="程式碼" sortable></Column>
  <Column field="name" header="名稱" sortable></Column>
  {/* 其餘欄位省略 */}
</DataTable>
```

### 理解 @sort 事件

在 `@sort` 事件中，可以接收到一個 `event` 物件，我們可以先行 `console.log` 看看 `event` 的內容，如下所示：

```jsx
const onSort = (event) => {
  console.log(event)
}
```

其內容如下，其中 `sortField` 是排序的欄位，`sortOrder` 是排序的方向。

```json
{
  "originalEvent": {
      "isTrusted": true,
      "_vts": 1739329710665
  },
  "first": 0,
  "rows": 5,
  "sortField": "name",
  "sortOrder": 1,
  "multiSortMeta": [],
  "filters": {}
}
```

### onSort 函式

因此我們可以藉由 onSort 所得到的 event.sortField 和 event.sortOrder 來撰寫傳送給後端 API 的邏輯，如下所示：

```jsx
const onSort = (event) => {
  // 這裡是用來模擬傳給後端的 API 的邏輯
  loadData({
    sortField: event.sortField,
    sortOrder: event.sortOrder,
  })
}
```

## 預設排序

另外 DataTable 的 props 可以添加 sortField 和 sortOrder 用來設定預設的排序欄位和遞增遞減的方向，如下所示：

```jsx
<DataTable :value="products"  
sortField="name"
sortOrder="1">
  {/* 其餘欄位省略 */}
</DataTable>
```

## 分頁

最基本的分頁方式必須添加 `paginator` 屬性，並且定義 `rows` 屬性，這邊的範例使用的是前端分頁，如下所示：

```jsx
<DataTable :value="products" paginator rows="5">
  {/* 其餘欄位省略 */}
</DataTable>
```

### 自訂每頁顯示的數量

但是我們希望可以讓使用者自行選擇要顯示的數量，因此我們會需要添加 `rowsPerPageOptions` 屬性，並且定義 `rowsPerPageOptions` 的值，如下所示：

```jsx
<DataTable :value="products" paginator rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
  {/* 其餘欄位省略 */}
</DataTable>
```

### 後端分頁

如果要讓後端伺服器處理分頁功能，我們需要：

1. 必須使用 `@page` 事件來處理分頁邏輯
2. 必須 添加 `:totalRecords="totalRecords"` 屬性，這個屬性會接收後端回傳的資料總筆數，讓 DataTable 能夠正確計算並顯示分頁

如下面範例所示：

```jsx
<DataTable :value="products" paginator rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" @page="onPage" :totalRecords="totalRecords">
  {/* 其餘欄位省略 */}
</DataTable>
```

### 理解 @page 事件

其中 onPage 的 event 我們透過 console.log 來查看，如下所示：

```javascript
const onPage = (event) => {
  loadData({
    page: event.page + 1,
    perPage: event.rows,
    sortField: sortField.value,
    sortOrder: sortOrder.value,
  })
}
```

印出內容如下

```json
{
  "originalEvent": {
      "page": 1,
      "first": 5,
      "rows": 5,
      "pageCount": 6
  },
  "first": 5,
  "rows": 5,
  "sortField": null,
  "sortOrder": null,
  "multiSortMeta": [],
  "filters": {},
  "pageCount": 6,
  "page": 1
}
```

### onPage 函式
因此我們可以透過 `event.page` 來得知使用者選擇的分頁，透過 `event.rows` 來得知使用者選擇的每頁顯示的數量，如下所示：

```javascript
const onPage = (event) => {
  // 這裡是用來模擬傳給後端的 API 的邏輯
  loadData({
    page: event.page + 1,
    perPage: event.rows,
    sortField: sortField.value,
    sortOrder: sortOrder.value,
  })
}
```

## 完整程式碼

```jsx
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
```

## 參考資料

- [PrimeVue DataTable](https://primevue.org/datatable/)

