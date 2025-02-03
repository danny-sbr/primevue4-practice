---
outline: deep
---

# **自動匯入（Auto Import）**  
透過自動匯入與 Tree-shaking 技術，按需載入 PrimeVue 元件。


## **概述（Overview）**  
在使用 PrimeVue 時，元件通常需要個別匯入與註冊，如以下範例所示：

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import App from './App.vue';

const app = createApp(App);

app.use(PrimeVue);
app.component('InputText', InputText);
app.component('Button', Button);
```

在接下來的章節，我們將使用 **自動匯入** 來簡化程式碼。


## **使用 Unplugin（Unplugin）**  
透過 `unplugin-vue-components` 搭配 `@primevue/auto-import-resolver`，可以自動匯入並註冊 PrimeVue 元件。  
首先，安裝相關套件作為開發依賴：

```bash
npm i unplugin-vue-components -D
npm i @primevue/auto-import-resolver -D
```

## **設定 Vite（Vite 設定）**  
接著在 `vite.config.js` 中，使用 `Components` 外掛並加入 `PrimeVueResolver` 設定：

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        PrimeVueResolver() // 自動解析 PrimeVue 元件
      ]
    })
  ]
});
```

## **自動匯入後的簡化程式碼**  
完成設定後，初始化程式碼可以簡化為以下形式，不再需要手動註冊每個元件：

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from './App.vue';

const app = createApp(App);

app.use(PrimeVue);
```

## **範例（Example）**

完整的 PrimeVue 自動匯入範例已提供於 [線上範例環境（Playground）](https://primevue.org/playground/)，可供參考與測試。  

:::info 參考資料
本頁文件使用 ChatGPT 翻譯自 [PrimeVue AutoImport](https://primevue.org/autoimport/)
:::
