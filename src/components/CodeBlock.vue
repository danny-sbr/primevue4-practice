<script setup>
import { onMounted } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

onMounted(() => {
  window.Prism = window.Prism || {}
  window.Prism.manual = true
  Prism.highlightAll()
})

/**
 * 在 MarkdownIt 元件中也使用了 Prism
 * 為了避免此元件的 window.Prism 和 line-numbers 插件
 * 影響到 MarkdownIt 元件中的 MarkdownItPrism 插件
 * 需要將 Prism.manual 設定回 false
 * 以還原先前的設定
 */
onBeforeMount(() => {
  window.Prism.manual = false
})
</script>

<template>
  <div>
    <pre><code class="language-javascript line-numbers"><slot /></code></pre>
  </div>
</template>

<style scoped></style>
