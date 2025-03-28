## FileUpload 基本使用說明

### 元件介紹

PrimeVue 的 FileUpload 元件是一個功能豐富的檔案上傳元件，支援以下特性：

- 拖放上傳
- 多檔案上傳
- 自動上傳
- 上傳進度追蹤
- 檔案驗證

### 基本使用方式

```html
<FileUpload
  @select="onSelect"
  :customUpload="true"
  accept="image/*"
  :fileLimit="1"
>
</FileUpload>
```

#### 主要屬性說明

- `@select`：檔案選擇事件處理函式
- `customUpload`：是否使用自訂上傳處理
- `accept`：接受的檔案類型
- `fileLimit`：檔案數量限制

### 事件處理

```javascript
const handleImageSelect = ({ files, originalEvent }) => {
  console.log('選擇的檔案：', files)
  console.log('原始事件：', originalEvent)
}
```

### 注意事項

1. 設定 `customUpload` 為 `true` 時，需要自行處理檔案上傳邏輯
2. 可以使用 `accept` 屬性限制可上傳的檔案類型
3. `fileLimit` 可以限制一次可以選擇的檔案數量 