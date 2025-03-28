<script setup>
const selectHandler = ({ files, originalEvent }) => {
  console.log('選擇的檔案：', files)
  console.log('原始事件：', originalEvent)
}
</script>
<template>
  <FileUpload
    @select="selectHandler"
    :customUpload="true"
    accept="image/*"
    :fileLimit="1"
  ></FileUpload>
</template>
<style scoped></style>
