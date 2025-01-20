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
</script>

<template>
  <div>
    <pre><code class="language-javascript line-numbers"><slot /></code></pre>
  </div>
</template>

<style scoped></style>
