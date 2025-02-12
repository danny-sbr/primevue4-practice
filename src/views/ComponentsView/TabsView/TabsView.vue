<script setup>
import { ref, markRaw } from 'vue'
import Component1 from './components/Component1.vue'
import Component2 from './components/Component2.vue'
import Component3 from './components/Component3.vue'

import TabsExplain from './markdown/TabsExplain.md'
import MarkdownIt from '@/components/MarkdownIt.vue'

const tabs = ref([
  { title: 'Tab 1', content: markRaw(Component1), value: '0' },
  { title: 'Tab 2', content: markRaw(Component2), value: '1' },
  { title: 'Tab 3', content: markRaw(Component3), value: '2' },
])
</script>

<template>
  <div class="container">
    <MarkdownIt :source="TabsExplain" />
  </div>

  <Tabs value="0">
    <TabList pt:root:class="flex">
      <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">
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
