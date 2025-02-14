<script setup>
import DataTableDisplay from './components/DataTableDisplay.vue'
import DataTableExplain from './markdown/DataTableExplain.md'
import MarkdownIt from '@/components/MarkdownIt.vue'
import ColumnGroupDisplay from './components/ColumnGroupDisplay.vue'
import ColumnGroupExplain from './markdown/ColumnGroupExplain.md'
</script>

<template>
  <DataTableDisplay />
  <MarkdownIt :source="DataTableExplain" />
  <ColumnGroupDisplay />
  <MarkdownIt :source="ColumnGroupExplain" />
</template>
