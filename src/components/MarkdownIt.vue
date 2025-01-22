<template>
  <div v-html="markdown.render(source)" />
</template>

<script setup>
import { defineProps, ref } from 'vue'
import MarkdownIt from 'markdown-it'
import MarkdownItAbbr from 'markdown-it-abbr'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItForInline from 'markdown-it-for-inline'
import MarkdownItIns from 'markdown-it-ins'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItSub from 'markdown-it-sub'
import MarkdownItSup from 'markdown-it-sup'

// 建立 Markdown 解析器的實例並加載插件
const markdown = new MarkdownIt()
  .use(MarkdownItAbbr)
  .use(MarkdownItContainer)
  .use(MarkdownItDeflist)
  .use(MarkdownItFootnote)
  .use(MarkdownItForInline)
  .use(MarkdownItIns)
  .use(MarkdownItMark)
  .use(MarkdownItSub)
  .use(MarkdownItSup)

// 從 props 獲取來源內容
const props = defineProps({
  source: {
    type: String,
    default: '',
  },
})

const source = ref(props.source)
</script>
