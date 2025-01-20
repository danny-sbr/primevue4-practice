<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import { ref } from 'vue'
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
const codeStr = `<script setup>
import { ref } from 'vue'

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
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <h2 class="mb-6 text-2xl font-bold text-gray-800">選單列（Menubar）元件</h2>

    <p class="mb-8 leading-relaxed text-gray-600">
      範本 Menubar 提供項目自訂功能，透過項目範本（item template）接收來自模型的
      menuitem 實例作為參數。此外，還提供名為 start 和 end
      的額外插槽，可用於在選單之前或之後嵌入內容。
    </p>

    <h3 class="mb-4 text-xl font-semibold text-gray-700">使用範例：</h3>

    <CodeBlock>
      {{ codeStr }}
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
  </div>
</template>

<style scoped></style>
