組織圖表元件用於視覺化呈現階層式組織資料。

## 基本用法

組織圖表元件需要一個 `TreeNode` 類型的集合作為 `value` 屬性的值。每個節點都應該包含 `label` 屬性來顯示節點的標題。

程式碼如下：

```html
<script setup>
const data = ref({
  key: 'home',
  label: '首頁',
  children: [
    {
      key: 'products',
      label: '產品介紹',
      children: [
        {
          key: 'hardware',
          label: '硬體設備'
        }
      ]
    }
  ]
})
</script>

<template>
  <OrganizationChart :value="data">
    <template #default="slotProps">
      <span>{{ slotProps.node.label }}</span>
    </template>
  </OrganizationChart>
</template>
```

## 自訂節點內容

您可以使用預設插槽（slot）來自訂每個節點的內容呈現方式。插槽提供了 `node` 參數，讓您能存取節點的所有屬性。

程式碼如下：

```html
<OrganizationChart :value="data">
  <template #default="slotProps">
    <p class="font-bold text-sky-600">{{ slotProps.node.label }}</p>
    <p>
      <span class="font-bold">連結：</span>
      {{ slotProps.node.url }}
    </p>
  </template>
</OrganizationChart>
```
