
FloatLabel 可以建立具有浮動標籤效果的輸入欄位。當使用者開始輸入或輸入欄位獲得焦點時，標籤會優雅地向上浮動。

## 基本用法

FloatLabel 需要搭配輸入元件 (如 `InputText`) 和標籤 (`label`) 一起使用。標籤必須放在輸入元件之後，並使用 `for` 屬性與輸入元件的 `id` 相對應：

```jsx
<FloatLabel variant="over">
  <InputText id="username" v-model="value" />
  <label for="username">使用者名稱</label>
</FloatLabel>
```

## 主要特點

- **浮動效果** - 標籤會根據輸入狀態自動浮動
- **驗證整合** - 可以搭配 `InputText` 的 `:invalid` 屬性一起使用，當輸入內容不符合規則時，浮動標籤將變成紅色來提醒使用者
- **客製化樣式** - 透過 `variant` 屬性可以設定標籤相對於輸入框的位置：
  - `in` - 標籤在輸入框內
  - `over` - 標籤在輸入框上方
  - `on` - 標籤在輸入框上

## 參考資料

- [PrimeVue FloatLabel](https://primevue.org/floatlabel/)
