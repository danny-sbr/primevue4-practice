<script setup>
import FileUploadHeader from './FileUploadHeader.vue'
import FileUploadContent from './FileUploadContent.vue'
import FileUploadEmpty from './FileUploadEmpty.vue'

const currentImage = ref({
  profile: '',
  cover: '',
  gallery: '',
})

// 此函式用於處理圖片選擇事件

// 做法一：
// 1. 使用 fetch 或 axios 將檔案以 POST 方式上傳到後端 API
//    (因為要等待上傳完成，所以需要將 return 的函式改成 async await)
// 2. 取得後端回傳的圖片網址並更新畫面

//
// 做法二：前端轉換 base64
// 1. 建立 FileReader 物件
// 2. 使用 readAsDataURL 讀取檔案
// 3. 在 onload 事件中取得 base64 字串
// 4. 將 base64 字串更新到畫面上

// https://primevue.org/fileupload/#api.fileupload.events

const handleImageSelectBuilder = (type) => {
  return ({ files, originalEvent }) => {
    console.log(`選擇了 ${type} 圖片:`)
    console.log(files)
    console.log(originalEvent)
  }
}
const profilePhotoSelectHandler = handleImageSelectBuilder('profile')
const coverPhotoSelectHandler = handleImageSelectBuilder('cover')
const galleryPhotoSelectHandler = handleImageSelectBuilder('gallery')

const buildImageClearCallback = (type, clearCallback) => () => {
  currentImage.value[type] = ''
  clearCallback?.()
}
</script>
<template>
  <div class="col-span-12">
    <FileUpload
      @select="profilePhotoSelectHandler"
      :customUpload="true"
      accept="image/*"
      :fileLimit="1"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <FileUploadHeader
          title="個人頭像"
          :chooseCallback="chooseCallback"
          :remoteUrl="currentImage.profile"
          :clearCallback="buildImageClearCallback('profile', clearCallback)"
          :files="files"
        />
      </template>
      <template
        #content="{
          files,
          uploadedFiles,
          removeUploadedFileCallback,
          removeFileCallback,
        }"
      >
        <FileUploadContent
          :files="files"
          :uploadedFiles="uploadedFiles"
          :removeUploadedFileCallback="removeUploadedFileCallback"
          :removeFileCallback="removeFileCallback"
        />
      </template>
      <!--
          使用 FileUpload 元件的 empty slot 來顯示圖片：
          - 當有圖片網址時，會顯示該圖片
          - 當沒有圖片時，會顯示預設的上傳提示介面
          (有點違反直覺，因為 empty 的 slot 聽起來用途是當沒有圖片時才會顯示例如提示使用者你的沒有資料，但這裡是當有圖片時用 empty 的 slot 來顯示)
        -->
      <template #empty>
        <FileUploadEmpty :imageUrl="currentImage.profile" />
      </template>
    </FileUpload>
  </div>

  <div class="col-span-12">
    <FileUpload
      @select="coverPhotoSelectHandler"
      :customUpload="true"
      accept="image/*"
      :fileLimit="1"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <FileUploadHeader
          title="封面照片"
          :chooseCallback="chooseCallback"
          :remoteUrl="currentImage.cover"
          :clearCallback="buildImageClearCallback('cover', clearCallback)"
          :files="files"
        />
      </template>
      <template
        #content="{
          files,
          uploadedFiles,
          removeUploadedFileCallback,
          removeFileCallback,
        }"
      >
        <FileUploadContent
          :files="files"
          :uploadedFiles="uploadedFiles"
          :removeUploadedFileCallback="removeUploadedFileCallback"
          :removeFileCallback="removeFileCallback"
        />
      </template>
      <template #empty>
        <FileUploadEmpty :imageUrl="currentImage.cover" />
      </template>
    </FileUpload>
  </div>

  <div class="col-span-12">
    <FileUpload
      @select="galleryPhotoSelectHandler"
      :customUpload="true"
      accept="image/*"
      :fileLimit="1"
    >
      <template #header="{ chooseCallback, clearCallback, files }">
        <FileUploadHeader
          title="相簿照片"
          :chooseCallback="chooseCallback"
          :remoteUrl="currentImage.gallery"
          :clearCallback="buildImageClearCallback('gallery', clearCallback)"
          :files="files"
        />
      </template>
      <template
        #content="{
          files,
          uploadedFiles,
          removeUploadedFileCallback,
          removeFileCallback,
        }"
      >
        <FileUploadContent
          :files="files"
          :uploadedFiles="uploadedFiles"
          :removeUploadedFileCallback="removeUploadedFileCallback"
          :removeFileCallback="removeFileCallback"
        />
      </template>
      <template #empty>
        <FileUploadEmpty :imageUrl="currentImage.gallery" />
      </template>
    </FileUpload>
  </div>
</template>
<style scoped></style>
