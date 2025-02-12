<script setup>
import DataTableDisplay from './components/DataTableDisplay.vue'
import DataTableExplain from './markdown/DataTableExplain.md'
import MarkdownIt from '@/components/MarkdownIt.vue'
</script>

<template>
  <DataTableDisplay />
  <MarkdownIt :source="DataTableExplain" />
</template>
