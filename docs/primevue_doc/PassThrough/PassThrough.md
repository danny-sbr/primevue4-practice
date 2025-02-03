# 🚀 **Pass Through（PT）屬性** 

Pass Through 屬性是 PrimeVue 提供的一個 API，允許直接存取元件的內部 DOM 結構，進而進行高度客製化的操作。這個功能打破了傳統元件僅能依賴 props、事件和 slots 的限制，能夠自由地在 DOM 元素上套用任意屬性、監聽器及樣式。

## 🔍 **Pass Through 屬性（PT 屬性）**

Pass Through（PT）屬性是 PrimeVue 提供的強大 API，允許開發者**直接存取元件的內部 DOM 結構**，進行客製化操作。  


## 🚀 **簡介（Introduction）**

在傳統的第三方 UI 函式庫中，開發者通常受限於元件作者所提供的 API，這些 API 主要包含：  
- **Props（屬性）**  
- **Events（事件）**  
- **Slots（插槽）**  

若需要新增客製化功能，通常必須等候元件作者進行開發並發布新版本，這在大型專案中可能造成開發瓶頸。  


## 🎯 **PrimeTek 的願景：你的元件，不只是我們的元件**

PrimeVue 團隊秉持「**Your components, not ours**」的理念，透過 **Pass Through** 功能，開發者可以：  
- 直接存取元件的內部結構。  
- 套用任意屬性（例如 `aria-*`、`data-*`、`style`）。  
- 新增事件監聽器，無需等待元件更新版本。  

這個特性大幅提升了元件的**可擴展性與客製化彈性**，讓開發者不再受限於預設的 API。

## 📺 **學習資源（PrimeTV 教學影片）**

PrimeVue 團隊在 **PrimeTV YouTube 頻道** 提供了兩部教學影片，幫助你深入了解 Pass Through 的應用：  
1️⃣ **基礎介紹**：解釋 Pass Through 的基本概念與用法。  
2️⃣ **進階應用案例**：展示如何透過 Pass Through 解決無法用傳統 API 處理的特殊情境。  

> **建議觀看！** 這些影片能幫助你更快速掌握元件自訂化技巧。 🎬

<iframe width="889" height="500" src="https://www.youtube.com/embed/CvQj-zDRTFw?list=PLC9bp-OHi-Wk9fMhxOM1u6Si82i6AxqUM" title="Introduction to Pass Through Props Feature of PrimeVue" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```


### 🗂️ **基礎用法（Basic）**

每個元件都具備一個特殊的 `pt` 屬性，接受一個物件，物件的 key 對應到元件內部的 DOM 區塊，value 則可為：  
- **字串**：會被視為 CSS `class`。  
- **物件**：可定義多個屬性（如 `id`、`style`、`aria-*` 等）。  
- **函式**：動態產生屬性，根據元件的狀態回傳字串或物件。  


### 📌 **範例：自訂 Panel 元件樣式**

```javascript
<Panel header="Header" toggleable
    :pt="{
        header: (options) => ({
            id: 'myPanelHeader',
            style: {
                'user-select': 'none'  // 禁止選取標題文字
            },
            class: [
                'border-primary',     // 加上邊框顏色
                {
                    'bg-primary text-primary-contrast': options.state.d_collapsed,  // 摺疊時的背景與文字顏色
                    'text-primary bg-primary-contrast': !options.state.d_collapsed  // 展開時的背景與文字顏色
                }
            ]
        }),
        content: { class: 'border-primary text-lg text-primary-700' },  // 內容區塊樣式
        title: 'text-xl',  // 標題文字放大
        toggler: () => 'bg-primary text-primary-contrast hover:text-primary hover:bg-primary-contrast'  // 切換按鈕的樣式
    }"
>
    <p class="m-0">
        這是內容區塊，可依需求進行客製化樣式設定。
    </p>
</Panel>
```


### ✨ **宣告式語法（Declarative Syntax）**

除了物件語法外，還可以使用更簡潔的**宣告式語法**，直接在元件標籤上添加屬性。格式為：  
```
<ComponentTag pt:[passthrough_key]:[attribute]="value" />
```

#### 📋 **範例：相同效果的兩種寫法**

**1️⃣ 程式化語法（Programmatic Syntax）：**

```javascript
<Panel
    :pt="{
        root: {
            class: 'border-1 border-solid'  // 外層邊框
        },
        header: {
            'data-test-id': 'testid',       // 自訂 data 屬性
            class: 'bg-blue-500',           // 標題背景色
            onClick: onHeaderClick          // 點擊事件
        }
    }"
>
    Panel 內容
</Panel>
```

**2️⃣ 宣告式語法（Declarative Syntax）：**

```javascript
<Panel
    pt:root:class="border border-solid"
    pt:header:id="headerId"
    pt:header:data-test-id="testId"
    pt:header:class="bg-blue-500"
    :pt:header:onClick="onHeaderClick"
>
    Panel 內容
</Panel>
```

- **`pt:root:class`**：設定外層容器的 CSS 類別。  
- **`pt:header:data-test-id`**：加上自訂的 `data-test-id` 屬性，常用於 E2E 測試。  
- **`pt:header:onClick`**：綁定點擊事件處理函式。  


### 🔑 **PT 屬性的常見應用場景**

1. **客製化樣式**：為元件內部元素套用特定的 `class` 或 `style`。  
2. **增加 ARIA 支援**：輕鬆加入無障礙相關的 `aria-*` 屬性。  
3. **測試友善**：透過 `data-*` 屬性提升元件的可測試性。  
4. **事件擴充**：為內部 DOM 元素綁定額外的事件監聽器。  
5. **動態樣式切換**：根據元件狀態動態改變樣式。

### 🏷️ **PC Prefix（PrimeVue 元件專用前綴）**

在 PrimeVue 中，**`pc` 前綴**用來區分標準 DOM 元素與 PrimeVue 內建的元件。當一個元件內嵌其他元件時，這個前綴可以幫助我們針對內部的 PrimeVue 元件進行 Pass Through（PT）設定。

#### 📌 **範例：Button 元件與 Badge**

```javascript
<Button
    type="button"
    label="訊息"
    icon="pi pi-inbox"
    badge="2"
    variant="outlined"
    severity="secondary"
    :pt="{
        root: '!px-4 !py-3',
        icon: '!text-xl !text-violet-500 dark:!text-violet-400',
        label: '!text-lg !text-violet-500 dark:!text-violet-400',
        pcBadge: {  // 使用 pcBadge 來針對內嵌的 Badge 元件進行客製化
            root: '!bg-violet-500 dark:!bg-violet-400 !text-white dark:!text-black'
        }
    }"
/>
```

- **`pcBadge`**：專門針對按鈕內嵌的 Badge 元件進行樣式設定。  
- **`root`、`icon`、`label`**：則針對按鈕本身的 DOM 元素進行設定。  

### 🔄 **生命週期掛鉤（Lifecycle Hooks）**

透過 `hooks` 屬性可以在元件生命週期的不同階段註冊回呼函式（callback functions），支援以下 Vue 的生命週期方法：  
- `onBeforeCreate`、`onCreated`  
- `onBeforeMount`、`onMounted`  
- `onBeforeUpdate`、`onUpdated`  
- `onBeforeUnmount`、`onUnmounted`  

#### 🚀 **範例：Panel 元件的生命週期掛鉤**

```vue
<Panel 
    header="標題" 
    :pt="{
        hooks: {
            onMounted: () => console.log('Panel 已掛載'),
            onUpdated: () => console.log('Panel 已更新')
        }
    }"
>
    內容
</Panel>
```

此設定將在 Panel 元件掛載（mounted）與更新（updated）時，輸出對應訊息。


### 🌍 **全域 Pass Through 設定（Global PT）**

可以在 PrimeVue 的全域設定中定義共享的 Pass Through 屬性，提升一致性與維護性。個別元件的 `pt` 屬性會**覆蓋**全域設定。

#### 📋 **範例：全域 Panel 和 Autocomplete 樣式**

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);

app.use(PrimeVue, {
    pt: {
        panel: {
            header: {
                class: 'bg-primary text-primary-contrast' // 所有 Panel 標題套用相同背景與文字顏色
            }
        },
        autocomplete: {
            input: {
                root: 'w-64' // 所有 Autocomplete 元件固定寬度 64px
            }
        }
    }
});
```

- **覆蓋機制：** 若個別元件也有設定 `pt`，會優先使用個別設定。


### 🎨 **自訂全域 CSS（Custom CSS）**

全域 `pt` 設定支援 `css` 屬性，可以定義全域的 CSS 樣式或動畫，並與 Pass Through 配合使用。

#### 🚀 **範例：自訂按鈕的全域樣式**

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);

app.use(PrimeVue, {
    pt: {
        global: {
            css: `
                .my-button {
                    border-width: 2px; /* 自訂按鈕邊框寬度 */
                    padding: 12px 20px; /* 增加按鈕內距 */
                    background-color: #4f46e5; /* 按鈕背景色 */
                    color: white; /* 按鈕文字顏色 */
                    transition: background-color 0.3s; /* 滑鼠懸停動畫 */
                }

                .my-button:hover {
                    background-color: #4338ca; /* 滑鼠懸停變化背景色 */
                }
            `
        },
        button: {
            root: 'my-button' // 將自訂 class 套用到所有按鈕元件
        }
    }
});
```

這樣設定後，所有的 `<Button>` 元件都會自動套用 `my-button` 的樣式，無需額外在每個元件上手動加上 `class`。


## 🔄 **使用 `usePassThrough` 進行客製化**

`usePassThrough` 是 PrimeVue 提供的工具，可基於現有的 Pass Through 設定進行客製化，讓你可以更彈性地修改元件樣式與屬性，而不需要重新定義整個設定。


## 📦 **語法結構**

```javascript
usePassThrough(baseConfig, customizations, mergeOptions);
```

- **`baseConfig`**：現有的 Pass Through 設定（如 `BasePreset`）。
- **`customizations`**：欲新增或修改的設定。
- **`mergeOptions`**：合併策略，包含：
  - `mergeSections`：是否合併 section（預設為 `true`）。
  - `mergeProps`：是否合併屬性（預設為 `false`）。


## 🚀 **範例：自訂 Panel 樣式**

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { usePassThrough } from "primevue/passthrough";
import BasePreset from "./basepreset";

const app = createApp(App);

const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            title: {
                class: ['leading-none', 'font-light', 'text-2xl']  // 自訂標題樣式
            }
        }
    },
    {
        mergeSections: true,   // 合併 section
        mergeProps: false      // 不合併屬性，直接覆蓋
    }
);

app.use(PrimeVue, { unstyled: true, pt: CustomPreset });
```

## ⚙️ **合併策略（Merge Options）解析**

### ✅ **情境 1：合併 Section，覆蓋屬性**

```javascript
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: true, mergeProps: false }
);

// 輸出結果：
/*
panel.header.class => 'my_panel_header'       // 覆蓋 header 的 class
panel.title.class  => Tailwind.panel.title.class // 保留原本的 title 樣式
*/
```

- **解釋：** `header` 直接覆蓋原設定，`title` 保持不變。

### 🔗 **情境 2：合併 Section 與屬性**

```javascript
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: true, mergeProps: true }
);

// 輸出結果：
/*
panel.header.class => [Tailwind.panel.header.class, 'my_panel_header'] // 合併 class
panel.title.class  => Tailwind.panel.title.class                      // 保留 title 樣式
*/
```

- **解釋：** `header` 的 class 會與 `BasePreset` 中的 class 合併，兩者並存。

### 🚫 **情境 3：不合併 Section，但合併屬性**

```javascript
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: false, mergeProps: true }
);

// 輸出結果：
/*
panel.header.class => [Tailwind.panel.header.class, 'my_panel_header'] // 合併 class
panel.title.class  => undefined                                        // 不保留原本的 title
*/
```

- **解釋：** `panel.title` 不再存在，`header` 的 class 則保留合併的結果。

### 🚫 **情境 4：不合併 Section 也不合併屬性**

```javascript
const CustomPreset = usePassThrough(
    BasePreset,
    {
        panel: {
            header: 'my_panel_header'
        }
    },
    { mergeSections: false, mergeProps: false }
);

// 輸出結果：
/*
panel.header.class => 'my_panel_header'       // 只保留自訂的 class
panel.title.class  => undefined               // 移除原本的 title 設定
*/
```

- **解釋：** 完全覆蓋原有設定，僅保留客製化的內容。

## 🎯 **選擇合併策略的建議**

| **情境**                     | **mergeSections** | **mergeProps** | **適用場合**                         |
|:-----------------------------|:-----------------:|:--------------:|:------------------------------------|
| 完全覆蓋                     | ❌                | ❌             | 重新定義設定，捨棄原有所有屬性       |
| 合併區塊，覆蓋屬性           | ✅                | ❌             | 保留結構，但僅覆蓋特定屬性           |
| 合併區塊與屬性               | ✅                | ✅             | 需要結合原設定與新設定               |
| 僅合併屬性，不保留區塊       | ❌                | ✅             | 保留部分屬性，刪除不必要的區塊        |


:::info 參考資料
本頁文件使用 ChatGPT 翻譯自 [PrimeVue Pass Through](https://primevue.org/passthrough/)
:::

