# PassThrough 介紹

PassThrough 是 PrimeVue 提供的一種客製化元件樣式的方式，透過 PassThrough 我們可以客製化元件的樣式、事件、屬性等。


## 元件 DOM 解析 

可以查看官方文件 Panel 的 [Panel Pass Through](https://primevue.org/panel/#pt.viewer) 的部分，就能知道該元件被哪些 DOM 元素所組成。

以 Panel 元件為例，他的 DOM 結構包含了以下幾個部分：

- root：根元素
- header：標題區塊
- title：標題文字
- headerActions：標題區塊的操作按鈕
- pcToggleButton | ToggleButton：展開/收合按鈕
- contentContainer：內容容器
- content：內容區塊
- footer：頁尾區塊

## 客製化樣式 

針對如下的 Panel 的 header 的部分，我們使用 PassThrough 的方式來客製化樣式。

我們透過以下的方式撰寫 header 的客製化屬性，例如添加 style 屬性內容為`'user-select': 'none',`

另外一種方式是透過修改 class 的屬性，在 PrimeVue 的 pt 屬性中，class 可以接受以下幾種值的形式：

1. 字串形式
   - 直接傳入 class 名稱
   - 例如：`class: 'text-red-600'`

2. 陣列形式 
   - 可以同時傳入多個 class
   - 例如：`class: ['border', { 'text-red-600': true }]`

3. 物件形式
   - key 為 class 名稱
   - value 為變數的布林值，用來決定是否要套用該 class
   - 例如：`class: { 'text-red-600': options.state.d_collapsed, 'text-yellow-600': !options.state.d_collapsed }`

程式碼範例如下

```javascript
<Panel
    header="我是頭"
    toggleable
    :pt="{
      header: (options) => {
        return {
          id: 'myPanelHeader',
          style: {
            'user-select': 'none', // 禁止選取標題文字
          },
          class: [
            'border-green-600 border', // 加上邊框顏色
            {
              'text-red-600': options.state.d_collapsed, // 摺疊時的背景與文字顏色
              'text-blue-600': !options.state.d_collapsed, // 展開時的背景與文字顏色
            },
          ],
        }
      },
      title: 'text-xl', // 標題文字放大
    }"
  >
    <p class="m-0">這是內容區塊，可依需求進行客製化樣式設定。</p>
  </Panel>
  ```
## 事件添加

除了可以修改樣式外，我們也可以添加事件，以下的範例當滑鼠移入標題區塊時，會觸發 onHeaderHover 事件，並且印出滑鼠移入標題區塊的訊息。

程式碼如下

```jsx 
<script setup>

const onHeaderHover = (options) => {
  console.log('🔵 滑鼠進入標題區塊！')
}
</script>
<template>
 <Panel
    header="我是頭"
    toggleable
    :pt="{
      header: (options) => {
        return {
         // 中間省略
          onMouseover: onHeaderHover, // 滑鼠移入事件
        }
      },
       //以下省略
    }"
  >
    <p class="m-0">這是內容區塊，可依需求進行客製化樣式設定。</p>
  </Panel>
  </template>
```
## 添加任何 html 屬性
我們也可以針對該 DOM 添加任何的 html 屬性，以添加 data 屬性為例，我們可以透過 pt 的方式將 data 屬性傳入，例如：

```javascript
<Panel
    header="我是頭"
    toggleable
    :pt="{
      content: {
        'data-name': '我是內容'
      }
    }"
  >
  <p class="m-0">這是內容區塊，可依需求進行客製化樣式設定。</p>
</Panel>
```

此時我們可以觀看 devtool 添加了 data 屬性
```html
<div class="p-panel-content" data-pc-section="content" data-name="我是內容"><p class="m-0">這是內容區塊，可依需求進行客製化樣式設定。</p></div>
```
## 深入理解 Pass Through option 參數

我們可以透過函式的來得到 Pass Through option 的參數，透過 options 參數，我們可以更彈性的自定義元件的行為、樣式、事件等。

### options 參數 (以 Panel 元件的 headerActions 為例)

這裡以 Panel 元件的 headerActions 為例，我們可以透過函式的方式將 headerActions 的 options 參數印出來，藉此了解有哪些屬性可供使用。若想要查看每個元件的 options 屬性，可以參考官方文件中的 Pass Through 章節。以 Panel 元件為例，可以在其文件中找到 [Panel Pass Through](https://primevue.org/panel/#api.panel.interfaces.PanelPassThroughMethodOptions) 的詳細說明。

### options 參數說明 (以 Panel 元件的 headerActions 為例)

可以看到該元件的 `options` ，包含了元件的各種狀態、實例和屬性如下：

1. **instance**
   - 類型：Vue 元件實例
   - 描述：當前元件的 Vue 實例代理物件
   - 包含：元件的內部方法和屬性

2. **attrs**
   - 類型：Proxy 物件
   - 描述：元件的非 prop 屬性集合
   - 用途：可以訪問未在 props 中定義的額外屬性

3. **global**
   - 類型：物件
   - 描述：全域配置或設定
   - 預設：通常為空物件 `{}`

4. **parent**
   - 類型：物件
   - 描述：父元件的相關資訊
   - 屬性包括：
     - `instance`：父元件實例
     - `props`：父元件的 props
     - `state`：父元件的狀態
     - `attrs`：父元件的屬性

5. **props**
   - 類型：Proxy 物件
   - 描述：元件的 props 屬性
   - 範例屬性：
     - `header`：標題文字
     - `pt`：PassThrough 配置
     - `toggleable`：是否可摺疊

6. **state**
   - 類型：Proxy 物件
   - 描述：元件的內部狀態
   - 常見屬性：
     - `id`：元件唯一識別碼
     - `d_collapsed`：是否處於摺疊狀態（布林值）


### console.log(option) 範例

我們可以印出 option 如下


```javascript
headerActions: (options) => {
  // 印出 options 的所有屬性，方便調試
  console.log('完整 options:', options);
  // 訪問特定屬性
  console.log('元件 ID:', options.state.id);
  console.log('是否摺疊：', options.state.d_collapsed);
  console.log('標題：', options.props.header);
}
```

印出結果如下

```json
{
  "instance": "Proxy(Object)",
  "attrs": "Proxy(Object) {}",
  "global": {},
  "parent": {
    "instance": "Proxy(Object)",
    "props": "Proxy(Object)",
    "state": "{…}",
    "attrs": "Proxy(Object)"
  },
  "props": "Proxy(Object) {header: '我是頭', pt: {…}, ptOptions: undefined, unstyled: undefined, dt: undefined, …}",
  "state": "Proxy(Object) {id: 'pv_id_2', d_collapsed: false}",
  "[[Prototype]]": "Object"
}
```

### 每個元件的 options 屬性內容不盡相同

在開發過程中，可以使用 `console.log()` 來查看 `options` 的具體內容，根據不同的元件，`options` 的屬性裡的內容，可能會有所不同。例如在 Panel 元件中，options 會包含摺疊狀態 d_collapsed，但在 Button 元件中，則可能包含按鈕的點擊狀態 pressed 等不同的屬性。因此建議在開發時，可以使用 console.log() 查看該元件的 options 內容或是查看官方文件的 component 的 Pass Through Option 部分，再進行相關的客製化設定

以 Button 為例，我們可以透過 console.log() 查看 root 裡面的 options 的內容，可以得知 Button 的 options 多了 context，其中 context 包含了 disabled 屬性。
範例如下
```javascript
<Button
  :pt="{
    root: (options) => {
      console.log(options)
    },
  }"
  >按鈕</Button
>
```

使用 console.log 印出的 options 內容如下

```json
{
  "attrs": "Proxy(Object) {}",
  "context": { "disabled": false },
  "global": {},
  "instance": "Proxy(Object) {...}",
  "parent": {
    "instance": "Proxy(Object)",
    "props": "Proxy(Object)",
    "state": { "...": "..." },
    "attrs": "Proxy(Object)"
  },
  "props": {
    "pt": { "...": "..." },
    "ptOptions": "undefined",
    "unstyled": "undefined",
    "dt": "undefined",
    "label": "null",
    "...": "..."
  },
  "state": {}
}
```
## 深入理解 option.instance

在 PrimeVue 的 PassThrough 機制中，`option.instance` ，它包含了元件實例的所有內容，讓我們能夠直接存取和修改元件的行為。

### 修改元件方法

   - 可以存取元件內建的所有方法
   - 例如 Panel 元件的 `toggle()` 方法
   - 可以覆寫這些方法來客製化行為

我們可以查看 Panel 的原始碼，路徑為 `node_modules/primevue/panel/index.mjs`，可以看到 toggle 方法的原始碼如下
```javascript
// 以上省略
{
methods: {
  toggle: function toggle(event) {
    this.d_collapsed = !this.d_collapsed;
    this.$emit('update:collapsed', this.d_collapsed);
    this.$emit('toggle', {
      originalEvent: event,
      value: this.d_collapsed,
    });
  }
}
}
// 以下省略
```

其中 this 指向的是元件實例，所我們要注意將 this 替換成 options.instance，我們製作一個範例添加計數器用來計算當元件被展開或摺疊的次數，範例如下

```jsx
<script setup>
  const count = ref(0)
</script>
<template>
  <div class="mb-4">
    <span class="text-xl font-bold">toggle 次數 : </span>
    <span class="text-xl">{{ count }}</span>
  </div>
  <Panel
    header="我是頭"
    toggleable
    
    :pt="{
      root: (options) => {
        options.instance.toggle = (event) => {
          options.instance.d_collapsed = !options.instance.d_collapsed
          options.instance.$emit(
            'update:collapsed',
            options.instance.d_collapsed,
          )
          options.instance.$emit('toggle', {
            originalEvent: event,
            value: options.instance.d_collapsed,
          })
          // 添加此行計數器加一
          count++
        }
      },
    }"
    //以下省略
  >
  <p class="m-0">這是內容區塊，可依需求進行客製化樣式設定。</p>
</Panel>
</template>
```

## 完整範例程式碼

最後附上完整範例程式碼

```jsx
<script setup>
import MarkdownIt from '@/components/MarkdownIt.vue'
import PassThroughExplain from './PassThroughView.md'

const onHeaderHover = (options) => {
  console.log('🔵 滑鼠進入標題區塊！')
}
const count = ref(0)
</script>
<template>
  <div class="mb-4">
    <span class="text-xl font-bold">toggle 次數 : </span>
    <span class="text-xl">{{ count }}</span>
  </div>
  <Panel
    header="我是頭"
    toggleable
    :pt="{
      root: (options) => {
        options.instance.toggle = (event) => {
          options.instance.d_collapsed = !options.instance.d_collapsed
          options.instance.$emit(
            'update:collapsed',
            options.instance.d_collapsed,
          )
          options.instance.$emit('toggle', {
            originalEvent: event,
            value: options.instance.d_collapsed,
          })
          count++
        }
      },
      header: (options) => {
        return {
          id: 'myPanelHeader',
          style: {
            'user-select': 'none', // 禁止選取標題文字
          },
          class: [
            'border-green-600 border', // 加上邊框顏色
            {
              'text-red-600': options.state.d_collapsed, // 摺疊時的背景與文字顏色
              'text-blue-600': !options.state.d_collapsed, // 展開時的背景與文字顏色
            },
          ],
          onMouseover: onHeaderHover, // 滑鼠移入事件
        }
      },
      content: {
        'data-name': '我是內容',
      },
      title: 'text-xl', // 標題文字放大
      headerActions: (options) => {
        console.log(options)
      },
    }"
  >
    <p class="m-0">這是內容區塊，可依需求進行客製化樣式設定。</p>
  </Panel>
  <Button
    :pt="{
      root: (options) => {
        console.log(options)
      },
    }"
    >按鈕</Button
  > 
  <MarkdownIt :source="PassThroughExplain" />
</template>
<style scoped></style>
```