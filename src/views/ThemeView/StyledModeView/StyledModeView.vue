<script setup>
import ScopeToken from './components/ScopeToken.vue'
import MarkdownIt from '@/components/MarkdownIt.vue'
import ScopeTokenMarkdown from './components/ScopeToken.md'
import ScopeTokenCodeString from './components/ScopeTokenCodeString.js'
import CodeBlock from '@/components/CodeBlock.vue'
</script>
<template>
  <!-- <CodeBlock>
    {{ ScopeTokenCodeString }}
  </CodeBlock> -->
  <MarkdownIt :source="ScopeTokenMarkdown" />
</template>
<style scoped></style>
