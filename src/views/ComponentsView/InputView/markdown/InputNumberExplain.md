
## 1. 介紹
- InputNumber 是一個數字輸入元件，提供數值輸入功能。

## 2. 匯入
```javascript
import InputNumber from 'primevue/inputnumber';
```

## 3. 基本用法
- 使用 `v-model` 進行雙向綁定。

### (1) 整數輸入與設定範圍

使用 `:min` 和 `:max` 設定最小和最大值。

```jsx
<InputNumber v-model="value1" inputId="integeronly" :min="0" :max="100" fluid />
```

### (2) 無數字分組與小數點範圍設定

使用 `:useGrouping="false"` 取消數字分組，並使用 `:minFractionDigits` 
和 `:maxFractionDigits` 設定小數點範圍。

`minFractionDigits` 的用途是設定小數點後最少要顯示幾位數，`maxFractionDigits` 的用途是設定小數點後最多要顯示幾位數。

```jsx
<InputNumber v-model="value2" inputId="withoutgrouping" :useGrouping="false" :minFractionDigits="2" :maxFractionDigits="5" fluid />
```

## 4. 表單整合
- 可與 PrimeVue Forms 搭配使用：
```html
<Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit">
    <InputNumber name="amount" fluid />
    <Message v-if="$form.amount?.invalid" severity="error">{{ $form.amount.error?.message }}</Message>
    <Button type="submit" label="Submit" />
</Form>
```
## 5. 地區設定 (Locale)

不同國家對於數字格式有不同的表示方法，主要差異在於小數點符號和千位分隔符號：

- 台灣、美國、英國：使用點號 (.) 作為小數點，逗號 (,) 作為千位分隔
  - 例如：1,234.56

- 德國、法國、義大利：使用逗號 (,) 作為小數點，點號 (.) 作為千位分隔
  - 例如：1.234,56

- 印度：使用點號 (.) 作為小數點，但千位分隔較特別
  - 從右邊開始，第一個逗號在千位，之後每兩位數加一個逗號
  - 例如：12,34,567.89

這就是為什麼在使用 InputNumber 元件時，需要特別注意 locale 的設定，以符合不同地區的使用習慣。

### (1) 使用者預設
```jsx
<InputNumber v-model="value1" inputId="locale-user" :minFractionDigits="2" fluid />
```
### (2) 美國格式

```jsx
<InputNumber v-model="value2" inputId="locale-us" locale="en-US" :minFractionDigits="2" fluid />
```
### (3) 德國格式
```jsx
<InputNumber v-model="value3" inputId="locale-german" locale="de-DE" :minFractionDigits="2" fluid />
```
### (4) 印度格式
```jsx
<InputNumber v-model="value4" inputId="locale-indian" locale="en-IN" :minFractionDigits="2" fluid />
```

## 6. 貨幣格式
- `mode="currency"` 並設定 `currency` 參數。

### (1) 美國貨幣
```jsx
<InputNumber v-model="value1" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid />
```

### (2) 德國貨幣
```jsx
<InputNumber v-model="value2" inputId="currency-germany" mode="currency" currency="EUR" locale="de-DE" />
```

### (3) 印度貨幣
```jsx
<InputNumber v-model="value3" inputId="currency-india" mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" fluid />
```

### (4) 日本貨幣
```jsx
<InputNumber v-model="value4" inputId="currency-japan" mode="currency" currency="JPY" locale="jp-JP" fluid />
```
## 7. 前後綴字 (Prefix & Suffix)
- 可在數字前後加上文字
- prefix 屬性：在數字前方加入文字
- suffix 屬性：在數字後方加入文字
- 常見使用情境：
  - 單位標示 (公里、公斤、攝氏度等)
  - 百分比標示
  - 狀態標示 (剩餘、上升、下降等)
  - 貨幣符號

```jsx
<InputNumber v-model="value1" inputId="mile" suffix=" mi" fluid />
<InputNumber v-model="value2" inputId="percent" prefix="%" fluid />
<InputNumber v-model="value3" inputId="expiry" prefix="Expires in " suffix=" days" fluid />
<InputNumber v-model="value4" inputId="temperature" prefix="&uarr; " suffix="℃" :min="0" :max="40" fluid />
```

## 8. 按鈕操作 (Spinner Buttons)
- `showButtons` 允許增加/減少數值。
- `buttonLayout` 可調整按鈕方向。

### (1) 預設按鈕
```jsx
<InputNumber v-model="value1" inputId="stacked-buttons" showButtons mode="currency" currency="USD" fluid />
```

### (2) 設定最小最大值
```jsx
<InputNumber v-model="value2" inputId="minmax-buttons" mode="decimal" showButtons :min="0" :max="100" fluid />
```

### (3) 水平按鈕 (含步進值)
```jsx
<InputNumber v-model="value3" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="0.25" mode="currency" currency="EUR" fluid>
    <template #incrementbuttonicon>
        <span class="pi pi-plus" />
    </template>
    <template #decrementbuttonicon>
        <span class="pi pi-minus" />
    </template>
</InputNumber>
```

### (4) 垂直按鈕
```jsx
<InputNumber v-model="value" showButtons buttonLayout="vertical" style="width: 3rem" :min="0" :max="99">
  <template #incrementbuttonicon>
    <span class="pi pi-plus" />
  </template>
  <template #decrementbuttonicon>
    <span class="pi pi-minus" />
  </template>
</InputNumber>
```

## 9. 變體樣式
### (1) 滿版填充樣式
```jsx
<InputNumber v-model="value" variant="filled" />
```

### (2) 浮動標籤 (Float Label)
```jsx
<FloatLabel>
    <InputNumber v-model="value1" inputId="over_label" mode="currency" currency="USD" locale="en-US" />
    <label for="over_label">Over Label</label>
</FloatLabel>
```

## 10. 尺寸調整
- 可選擇 `small`、`normal` 和 `large` 尺寸。

```jsx
<InputNumber v-model="value1" size="small" placeholder="Small" mode="currency" currency="USD" locale="en-US" />
<InputNumber v-model="value2" placeholder="Normal" mode="currency" currency="USD" locale="en-US" />
<InputNumber v-model="value3" size="large" placeholder="Large" mode="currency" currency="USD" locale="en-US" />
```

## 11. 無效狀態
- `invalid` 屬性可標記輸入錯誤。

```jsx
<InputNumber v-model="value1" :invalid="value1 === null" mode="decimal" :minFractionDigits="2" placeholder="Amount" />
```

## 12. 禁用狀態
- `disabled` 禁止輸入。

```jsx
<InputNumber v-model="value" disabled prefix="%" />
```

## 13. 無障礙設計 (Accessibility)
- 可透過 `label`、`aria-labelledby`、`aria-label` 來提升可讀性。

```jsx
<label for="price">Price</label>
<InputNumber inputId="price" />

<span id="label_number">Number</span>
<InputNumber aria-labelledby="label_number" />

<InputNumber aria-label="Number" />
```
