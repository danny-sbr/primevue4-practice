<script setup>
import ImageFileUpload from './components/ImageFileUpload/ImageFileUpload.vue'
import BasicFileUploadDisplay from './components/BasicFileUploadDisplay.vue'
import CustomTemplateExplain from './markdown/CustomTemplateExplain.md'
import BasicUsageExplain from './markdown/BasicUsageExplain.md'
import ParentExampleExplain from './markdown/ParentExampleExplain.md'
import MarkdownIt from '@/components/MarkdownIt.vue'
</script>

<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12">
      <h1 class="mb-4 text-3xl font-bold">檔案上傳元件展示</h1>
      <div class="col-span-12">
        <BasicFileUploadDisplay />
      </div>
      <MarkdownIt :source="BasicUsageExplain" />
    </div>
    <div class="col-span-12">
      <Divider />
    </div>
    <div class="col-span-12">
      <MarkdownIt :source="CustomTemplateExplain" />
    </div>
    <div class="col-span-12">
      <Divider />
    </div>
    <div class="col-span-12">
      <MarkdownIt :source="ParentExampleExplain" />
    </div>
    <div class="col-span-12">
      <h2 class="mb-4 text-2xl font-bold">完整範例演示如下：</h2>
      <ImageFileUpload />
    </div>
  </div>
</template>

<style scoped></style>
