IconField 是一個實用的輸入元件，可以在輸入框前方加入圖示，讓使用者介面更加直覺且美觀。

主要特點：
- 可在輸入框前方加入圖示
- 支援內建圖示及自訂 SVG 圖示
- 可與 FloatLabel、Ifta Label 元件結合使用

IconField 使用 `position: relative` 定位，而內部的 InputIcon 使用 `position: absolute` 定位，所以如果需要調整圖示的位置，只需要調整 `InputIcon` 的 `top` 、`left` 、`right` 、`bottom` 屬性即可。


## 基本用法

IconField 主要由兩個部分組成：
- `InputIcon`: 用於放置圖示
- `InputText`: 實際的輸入欄位

### 使用內建圖示

內建圖示可以參考 [PrimeVue Icon](https://primevue.org/icons/)，只需要在 `InputIcon` 中加入 `class` 屬性，並指定圖示的 class 名稱即可。

以下範例包含調整圖示位置

```jsx
<IconField>
  <InputIcon class="top-[43.75%]">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L3 7V17L12 22L21 17V7L12 2Z"
        fill="#6366F1"
        stroke="#4F46E5"
        stroke-width="1"
      />
      <path
        d="M12 8L16 10V14L12 16L8 14V10L12 8Z"
        fill="white"
        stroke="#4F46E5"
        stroke-width="0.5"
      />
      <circle cx="12" cy="12" r="2" fill="#4F46E5" />
      <path d="M12 6L14 7V9L12 10L10 9V7L12 6Z" fill="#C7D2FE" />
    </svg>
  </InputIcon>
  <InputText v-model="value2" placeholder="Search" />
</IconField>
```

### 使用自訂圖示

如果需要使用自訂圖示，只需要在 `InputIcon` 中加入 SVG 元素即可。

如下範例：

```jsx
<IconField>
  <InputIcon>
    <svg><!-- 您的 SVG 內容 --></svg>
  </InputIcon>
  <InputText placeholder="Search" />
</IconField>
```

### 使用 FloatLabel

### 搭配 FloatLabel 使用

IconField 可以與 FloatLabel 元件結合使用，實現浮動標籤效果，範例如下

```jsx
<FloatLabel variant="on">
  <IconField>
    <InputIcon class="pi pi-search" />
    <InputText />
  </IconField>
  <label>標籤文字</label>
</FloatLabel>
```

## 參考資料

- [PrimeVue Icon](https://primevue.org/icons/)
- [PrimeVue FloatLabel](https://primevue.org/floatlabel/)
- [PrimeVue IconField](https://primevue.org/iconfield/)
