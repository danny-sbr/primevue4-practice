<template>
  <div v-html="markdown.render(source)"></div>
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
import MarkdownItPrism from 'markdown-it-prism'

// 引入 Prism 的 CSS 樣式檔案
// 這個檔案包含了程式碼語法高亮的顏色定義
// 如果沒有引入這個檔案，程式碼區塊就不會有顏色標示
import 'prismjs/themes/prism.css'

const markdown = new MarkdownIt({
  html: true,
})
  .use(MarkdownItAbbr)
  .use(MarkdownItContainer)
  .use(MarkdownItDeflist)
  .use(MarkdownItFootnote)
  .use(MarkdownItForInline)
  .use(MarkdownItIns)
  .use(MarkdownItMark)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItPrism)
// https://github.com/jGleitz/markdown-it-prism/issues/1
// https://github.com/andreas-mausch/eleventy-sample/blob/82cca7f7166cb8147d4681d0ba6e7b720f1889ac/eleventy/markdown.js
// Unfortunately, inline code blocks are not processed by default, so we need this.
// Compare to https://github.com/11ty/eleventy-plugin-syntaxhighlight/issues/38#issuecomment-1022305948

const lineNumbers = (originalHighlight) => {
  return (text, lang) => {
    const html = originalHighlight(text, lang)
    // Similar to: https://github.com/11ty/eleventy-plugin-syntaxhighlight/blob/7b7b547fff07f2e60d91c0a7ed3bba1938dbc057/src/markdownSyntaxHighlightOptions.js#L28
    const lines = html.split('\n').slice(0, -1)

    return lines
      .map((line) => `<span class="highlight-line">${line}</span>`)
      .join('\n')
  }
}

markdown.renderer.rules.code_inline = (tokens, idx, { langPrefix = '' }) => {
  const token = tokens[idx]
  return `<code class="${langPrefix}">${token.content}</code>`
}

markdown.options.highlight = lineNumbers(markdown.options.highlight)

// 從 props 獲取來源內容
const props = defineProps({
  source: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
:deep(h1) {
  font-size: 2em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

:deep(h2) {
  font-size: 1.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

:deep(h3) {
  font-size: 1.3em;
  margin-bottom: 0.5em;
}

:deep(h4) {
  font-size: 1.2em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

:deep(h5) {
  font-size: 1.1em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

:deep(p) {
  margin-bottom: 1em;
  line-height: 1.6;
}

:deep(ul),
:deep(ol) {
  margin-bottom: 1em;
  padding-left: 2em;
}

:deep(li) {
  list-style-type: disc;
}
:deep(li) {
  margin-bottom: 0.5em;
}

:deep(:not(pre) > code) {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
  font-family: monospace;
}

:deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 1em;
  margin-left: 0;
  margin-bottom: 1em;
  color: #666;
}

:deep(a) {
  color: #0366d6;
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}

:deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
}

:deep(th),
:deep(td) {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

:deep(th) {
  background-color: #f5f5f5;
}

:deep(img) {
  max-width: 100%;
  height: auto;
}

:deep(hr) {
  border: none;
  border-top: 1px solid #ddd;
  margin: 1em 0;
}

:deep(code[class*='language-']) {
  counter-reset: lineNumber;
  font-size: 9pt;
}

:deep(code[class*='language-'] .highlight-line::before) {
  border-right: 1px solid #404040;
  color: #858585;
  content: counter(lineNumber);
  counter-increment: lineNumber;
  display: inline-block;
  font-variant-numeric: tabular-nums;
  margin-right: 0.6em;
  padding-right: 2em;
  text-align: right;
  user-select: none;
  width: 1.4em;
}
</style>
