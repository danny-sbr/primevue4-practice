IftaLabel 是一個用來建立輸入框內上方對齊標籤的元件。

## 主要特點：

- 提供更好的視覺層次和空間利用率
- 支援多種輸入元件，包含 `InputText`、`InputNumber`、`Textarea`、`Password` 等等

## 使用方式：

將輸入元件和標籤包裹在 `<IftaLabel>` 中即可實現效果
如下範例：

```jsx
<script setup>
const value = ref(null)
</script>
<template>
  <IftaLabel>
    <InputText id="username" v-model="value" />
    <label for="username">Username</label>
  </IftaLabel>
</template>
<style scoped></style>
```

## 參考資料

- [PrimeVue IftaLabel](https://primevue.org/iftalabel/)
