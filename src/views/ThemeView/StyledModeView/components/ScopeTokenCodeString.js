const ScopeTokenCodeString = `<script setup>
/**
 * @constant {Array<Object>} tabs - 設定頁籤內容的陣列
 * @property {string} tabs[].title - 頁籤標題
 * @property {string} tabs[].content - 頁籤內容
 * @property {string} tabs[].value - 頁籤對應的值
 */
const tabs = ref([
  { title: 'Tab 1', content: 'content1', value: '0' },
  { title: 'Tab 2', content: 'content2', value: '1' },
  { title: 'Tab 3', content: 'content3', value: '2' },
])

/**
 * @constant {Object} myDt2 - 設定 Tabs 元件的設計代幣
 * @property {Object} myDt2.tab - 樣式設定
 * @property {string} myDt2.tab.activeBackground - 活動頁籤的背景顏色
 */
const myDt2 = ref({
  tab: {
    activeBackground: 'red',
  },
})
<\/script>

<template>
  <Tabs value="0" :dt="myDt2">
    <TabList>
      <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value" :dt="myDt2">
      {{ tab.title }}
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
        {{ tab.content }}
      </TabPanel>
    </TabPanels>
  </Tabs>
  <div class="bg-gray-800 text-white">測試</div>
</template>`

export default ScopeTokenCodeString
