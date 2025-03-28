## FileUpload 完整範例說明

### 程式碼結構說明

#### 1. 元件引入
```vue
<script setup>
import FileUploadHeader from './FileUploadHeader.vue'
import FileUploadContent from './FileUploadContent.vue'
import FileUploadEmpty from './FileUploadEmpty.vue'
</script>
```

#### 2. 資料管理
```html
<script setup>
const currentImage = ref({
  profile: '',
  cover: '',
  gallery: '',
})
</script>
```
這個物件用於管理三種不同類型的圖片：
- `profile`：個人頭像
- `cover`：封面照片
- `gallery`：相簿照片

#### 3. 事件處理函式

##### 圖片選擇處理器
```html
const handleImageSelectBuilder = (type) => {
  return ({ files, originalEvent }) => {
    console.log(`選擇了 ${type} 圖片:`)
    console.log(files)
    console.log(originalEvent)
  }
}
```
這是一個工廠函式，根據不同的圖片類型（profile、cover、gallery）建立對應的處理函式。

##### 清除回調函式
```javascript
const buildImageClearCallback = (type, clearCallback) => () => {
  currentImage.value[type] = ''
  clearCallback?.()
}
```
這個函式用於：
1. 清除特定類型的圖片
2. 執行原始的清除回調函式

#### 4. 檔案上傳實作建議

##### 方法一：使用後端 API
```javascript
// 1. 使用 fetch 或 axios 將檔案以 POST 方式上傳到後端 API
// 2. 取得後端回傳的圖片網址並更新畫面
const handleImageUpload = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const { url } = await response.json()
    return url
  } catch (error) {
    console.error('上傳失敗：', error)
  }
}
```

##### 方法二：前端轉換 base64
```javascript
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
```

#### 5. 元件使用範例

每個上傳區域都包含三個主要部分：
1. Header 區域：顯示標題和操作按鈕
2. Content 區域：顯示檔案列表
3. Empty 區域：無檔案時的顯示內容

```html
<template>
  <FileUpload
    @select="profilePhotoSelectHandler"
    :customUpload="true"
    accept="image/*"
    :fileLimit="1"
  >
    <!-- Header 區域 -->
    <template #header="{ chooseCallback, clearCallback, files }">
      <FileUploadHeader
        title="個人頭像"
        :chooseCallback="chooseCallback"
        :remoteUrl="currentImage.profile"
        :clearCallback="buildImageClearCallback('profile', clearCallback)"
        :files="files"
      />
    </template>

    <!-- Content 區域 -->
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

    <!-- Empty 區域 -->
    <template #empty>
      <FileUploadEmpty :imageUrl="currentImage.profile" />
    </template>
  </FileUpload>
</template>
```

#### 6. 重要屬性說明

- `@select`：檔案選擇事件處理器
- `:customUpload="true"`：啟用自訂上傳處理
- `accept="image/*"`：限制只能選擇圖片檔案
- `:fileLimit="1"`：限制一次只能上傳一個檔案
