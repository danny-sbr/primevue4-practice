<script setup>
import CodeBlock from '@/components/CodeBlock.vue'
import ScopeTokenCodeString from './ScopeTokenCodeString'
/**
 * @file PrimeVue Tabs 元件設計代幣（Scope Token）說明文件
 * @description 介紹如何在 PrimeVue 中使用 Design Token 屬性來設定元件的樣式
 */

/**
 * @constant {Array<Object>} tabs - 設定頁籤內容的陣列
 * @property {string} tabs[].title - 頁籤標題
 * @property {string} tabs[].content - 頁籤內容
 * @property {string} tabs[].value - 頁籤對應的值
 */
const tabs = [
  { title: 'Tab 1', content: 'content1', value: '0' },
  { title: 'Tab 2', content: 'content2', value: '1' },
  { title: 'Tab 3', content: 'content3', value: '2' },
]

/**
 * @constant {Object} myDt2 - 設定 Tabs 元件的設計代幣
 * @property {Object} myDt2.tab - 樣式設定
 * @property {string} myDt2.tab.activeBackground - 活動頁籤的背景顏色
 */
const myDt2 = {
  tab: {
    activeBackground: 'red',
  },
}

/**
 * PrimeVue Tabs 元件使用範例
 * @example
 * <Tabs value="0" :dt="myDt2">
 *   <TabList>
 *     <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value" :dt="myDt2">
 *       {{ tab.title }}
 *     </Tab>
 *   </TabList>
 *   <TabPanels>
 *     <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
 *       {{ tab.content }}
 *     </TabPanel>
 *   </TabPanels>
 * </Tabs>
 */

/**
 * @section PrimeVue 設計代幣（Design Token）
 *
 * PrimeVue 提供 `dt`（Design Token）屬性，讓開發者可以更靈活地設定元件樣式：
 * - 更現代化的樣式設定方式
 * - 易於管理，取代 `:deep()` 選擇器
 * - 精確控制樣式範圍，避免互相干擾
 *
 * 參考官方說明：
 * @see {@link https://primevue.org/tabs/#theming.tokens}
 * @see {@link https://primevue.org/theming/styled/#scopedtokens}
 * @see {@link https://www.youtube.com/watch?v=By04epRCpDA}
 */
</script>
<template>
  <Tabs value="0" :dt="myDt2">
    <TabList>
      <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value" :dt="myDt2">
        {{ tab.title }}
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
        <component :is="tab.content" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
<style scoped></style>
