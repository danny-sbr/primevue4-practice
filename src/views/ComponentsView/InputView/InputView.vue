<script setup>
import MarkdownIt from '@/components/MarkdownIt.vue'
import FloatLabelDisplay from './components/FloatLabelDisplay.vue'
import IconFieldDisplay from './components/IconFieldDisplay.vue'
import IftaLabelDisplay from './components/IftaLabelDisplay.vue'
import FloatLabelExplain from './markdown/FloatLabelExplain.md'
import IftaLabelExplain from './markdown/IftaLabelExplain.md'
import IconFieldExplain from './markdown/IconFieldExplain.md'
import InputNumberDisplay from './components/InputNumberDisplay.vue'
import InputNumberExplain from './markdown/InputNumberExplain.md'

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
    <Card :dt="cardDt">
      <template #content>
        <InputNumberDisplay />
        <MarkdownIt :source="InputNumberExplain" />
      </template>
    </Card>
  </div>
</template>
<style scoped></style>
