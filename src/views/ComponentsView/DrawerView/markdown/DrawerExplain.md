抽屜元件是一個以覆蓋方式顯示的容器元件。

## Position

抽屜元件可以設定 `position` 屬性來指定抽屜顯示的位置，預設為 `right`，可以設定為 `left`、`top`、`bottom`。

程式碼如下：

```html
<script setup>
const visible = ref(false)
</script>

<template>
  <Drawer v-model:visible="visible" position="left" header="抽屜">
    <p>抽屜內容</p>
  </Drawer>
</template>
```

