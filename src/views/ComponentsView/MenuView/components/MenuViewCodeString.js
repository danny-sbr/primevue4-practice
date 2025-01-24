const MenuViewCodeString = /* vue */ `<script setup>
/**
 * @constant {Array<Object>} items - 選單項目設定陣列
 * @property {string} items[].label - 選單項目標題
 * @property {string} items[].icon - 選單項目圖示
 * @property {Array<Object>} [items[].items] - 子選單項目
 */
const items = ref([
  {
    label: '檔案',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: '新增',
        icon: 'pi pi-fw pi-plus'
      },
      {
        label: '刪除',
        icon: 'pi pi-fw pi-trash'
      }
    ]
  },
  {
    label: '編輯',
    icon: 'pi pi-fw pi-pencil',
    items: [
      {
        label: '複製',
        icon: 'pi pi-fw pi-copy'
      },
      {
        label: '貼上',
        icon: 'pi pi-fw pi-paste'
      }
    ]
  }
])
<\/script>

<template>
  <Menubar :model="items">
    <!-- 選單前插槽 -->
    <template #start>
      <i class="pi pi-bars"></i>
    </template>

    <!-- 自訂項目範本 -->
    <template #item="{ item }">
      <i :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </template>

    <!-- 選單後插槽 -->
    <template #end>
      <i class="pi pi-user"></i>
    </template>
  </Menubar>
</template>`

export default MenuViewCodeString
