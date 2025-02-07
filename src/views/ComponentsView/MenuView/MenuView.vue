<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import MenuViewCodeString from './components/MenuViewCodeString'
import { ref } from 'vue'

/**
 * @file PrimeVue Menubar 元件使用說明文件
 * @description 展示如何使用 PrimeVue 的 Menubar 元件建立選單列，包含自訂插槽與項目範本的使用方式
 */

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
        icon: 'pi pi-fw pi-plus',
      },
      {
        label: '刪除',
        icon: 'pi pi-fw pi-trash',
      },
    ],
  },
  {
    label: '編輯',
    icon: 'pi pi-fw pi-pencil',
    items: [
      {
        label: '複製',
        icon: 'pi pi-fw pi-copy',
      },
      {
        label: '貼上',
        icon: 'pi pi-fw pi-paste',
      },
    ],
  },
])

/**
 * @section PrimeVue Menubar 元件功能說明
 *
 * Menubar 元件提供以下主要功能：
 * - 支援多層次選單結構
 * - 提供三個自訂插槽：start、item、end
 * - 可透過 model 屬性動態設定選單內容
 * - 支援圖示與文字的組合顯示
 *
 * 插槽說明：
 * - start: 選單列最左側的內容
 * - item: 自訂選單項目的顯示方式
 * - end: 選單列最右側的內容
 *
 * 參考文件：
 * @see {@link https://primevue.org/menubar/}
 */
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold text-gray-800">選單列（Menubar）元件</h2>

  <p class="mb-8 leading-relaxed text-gray-600">
    Menubar 提供項目自訂功能，透過項目範本（item template）接收來自模型的
    menuitem 實例作為參數。此外，還提供名為 start 和 end
    的額外插槽，可用於在選單之前或之後嵌入內容。
  </p>

  <h3 class="mb-4 text-xl font-semibold text-gray-700">使用範例：</h3>

  <CodeBlock>
    {{ MenuViewCodeString }}
  </CodeBlock>

  <p class="mb-4 text-gray-600">以下是實際使用 Menubar 元件的展示結果：</p>

  <Menubar :model="items">
    <!-- 選單前插槽 -->
    <template #start> "我是放在選單前" </template>

    <!-- 自訂項目範本 -->
    <template #item="{ item }">
      <i :class="item.icon"></i>
      <span>{{ item.label }}</span>
    </template>

    <!-- 選單後插槽 -->
    <template #end> "我是放在選單後" </template>
  </Menubar>
</template>

<style scoped></style>
