## FileUpload 自訂模板說明

### 可用的插槽（Slots）

FileUpload 元件提供了幾個插槽來自訂介面，以下介紹常用的插槽：

1. `header` - 上傳元件的頂部區域
2. `content` - 檔案列表和上傳狀態區域
3. `empty` - 無檔案時的顯示區域

### Header 插槽使用範例

```html
<template #header="{ chooseCallback, clearCallback, files }">
  <FileUploadHeader
    title="個人頭像"
    :chooseCallback="chooseCallback"
    :remoteUrl="currentImage.profile"
    :clearCallback="buildImageClearCallback('profile', clearCallback)"
    :files="files"
  />
</template>
```

#### Header 插槽提供的參數

- `chooseCallback`：觸發檔案選擇視窗的函式
- `clearCallback`：清除已選擇檔案的函式
- `files`：目前已選擇的檔案列表，型別為 File
- `uploadedFiles`：已上傳的檔案列表，型別為 File
- `uploadCallback`：執行檔案上傳的函式

### Content 插槽使用範例

```html
<template #content="{
  files,
  uploadedFiles,
  removeUploadedFileCallback,
  removeFileCallback,
}">
  <FileUploadContent
    :files="files"
    :uploadedFiles="uploadedFiles"
    :removeUploadedFileCallback="removeUploadedFileCallback"
    :removeFileCallback="removeFileCallback"
  />
</template>
```

#### Content 插槽提供的參數

- `files`：待上傳的檔案列表，型別為 File
- `uploadedFiles`：已上傳的檔案列表，型別為 File  
- `removeUploadedFileCallback`：移除已上傳檔案的函式，參數為 index: number
- `removeFileCallback`：移除待上傳檔案的函式，參數為 index: number
- `progress`：上傳進度，型別為 number
- `messages`：上傳過程的狀態訊息，型別為 undefined

### Empty 插槽使用範例

```html
<template #empty>
  <FileUploadEmpty :imageUrl="currentImage.profile" />
</template>
```

### 注意事項

1. 使用自訂模板時，需要自行處理檔案的預覽和狀態顯示
2. 可以透過插槽提供的回調函式來控制檔案的選擇和移除
3. Empty 插槽可以用來顯示沒有檔案時的預設內容，也可以用來顯示若有遠端資料檔案的時候的預覽內容