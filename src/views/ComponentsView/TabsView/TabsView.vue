<script setup>
import Component1 from './components/Component1.vue'
import Component2 from './components/Component2.vue'
import Component3 from './components/Component3.vue'

import TabsExplain from './markdown/TabsExplain.md'
import MarkdownIt from '@/components/MarkdownIt.vue'

const tabs = ref([
  { title: 'Tab 1', content: Component1, value: '0' },
  { title: 'Tab 2', content: Component2, value: '1' },
  { title: 'Tab 3', content: Component3, value: '2' },
])

console.log(TabsExplain)

const myDt2 = ref({
  tab: {
    activeBackground: 'Aquamarine',
  },
})
</script>

<template>
  <div class="container">
    <MarkdownIt :source="TabsExplain" />
  </div>

  <!-- <Tabs value="0" :dt="myDt2">
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
  </Tabs> -->
</template>

<style scoped lang="scss"></style>
