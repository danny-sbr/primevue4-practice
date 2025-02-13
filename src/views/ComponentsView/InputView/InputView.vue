<script setup>
import FloatLabelDisplay from './components/FloatLabelDisplay.vue'
import MarkdownIt from '@/components/MarkdownIt.vue'
import FloatLabelExplain from './markdown/FloatLabelExplain.md'
import IftaLabelExplain from './markdown/IftaLabelExplain.md'
import IconFieldExplain from './markdown/IconFieldExplain.md'
import IconFieldDisplay from './components/IconFieldDisplay.vue'
import IftaLabelDisplay from './components/IftaLabelDisplay.vue'

const cardDt = {
  root: {
    shadow: `0 10px 20px rgba(0, 0, 0, 0.15),0 6px 6px rgba(0, 0, 0, 0.1);`,
  },
}
</script>
<template>
  <div class="space-y-8">
    <Card :dt="cardDt">
      <template #content>
        <FloatLabelDisplay />
        <MarkdownIt :source="FloatLabelExplain" />
      </template>
    </Card>
    <Card :dt="cardDt">
      <template #content>
        <IftaLabelDisplay />
        <MarkdownIt :source="IftaLabelExplain" />
      </template>
    </Card>
    <Card :dt="cardDt">
      <template #content>
        <IconFieldDisplay />
        <MarkdownIt :source="IconFieldExplain" />
      </template>
    </Card>
  </div>
</template>
<style scoped></style>
