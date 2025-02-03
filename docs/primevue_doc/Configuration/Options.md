---
outline: deep
---

# **設定 (Configuration)**  
適用於整個應用程式的 PrimeVue 設定。

## **匯入 (Import)**  
設定是透過從 `primevue/config` 匯入的 PrimeVue 實例來管理。

```javascript
import PrimeVue from 'primevue/config';
const app = createApp(App);

app.use(PrimeVue, { /* 設定選項 */ });
```


## **主題 (Theme)**  
樣式模式 (Style mode) 提供基於設計標記 (design token) 架構的主題功能。  
詳細說明請參考樣式模式 (styled mode) 文件，了解如何建立自訂主題。

```javascript
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
theme: {
    preset: Aura, // 預設主題
    options: {
        prefix: 'p', // CSS 類名前綴
        darkModeSelector: 'system', // 深色模式依據系統設定
        cssLayer: false // 是否啟用 CSS Layer
    }
}
});
```

## **無樣式模式 (Unstyled)**  
無樣式模式會指示元件不套用任何內建的樣式類別，方便使用自訂 CSS 或整合像是 Tailwind、Bootstrap 或 PrimeFlex 等樣式庫進行設計。  
更多詳情請參考 [無樣式模式 (Unstyled mode) 文件]。

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);

app.use(PrimeVue, { unstyled: true });
```



## **屬性透傳 (Pass Through)**  
定義各個元件類型共用的屬性透傳 (Pass Through) 設定。  
更多詳情請參考 [屬性透傳 (Pass Through Props) 文件]。

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);

app.use(PrimeVue, {
pt: {
    slider: {
        handle: { class: 'bg-primary text-primary-contrast' } // 自訂滑桿控制把手的樣式
    }
}
});
```

## **屬性透傳選項 (Pass Through Options)**  
用於設定元件的 `ptOptions` 屬性以及 `usePassThrough` 方法。  
- `mergeSections`：決定是否合併主要設定中的區塊，預設為 `true`。  
- `mergeProps`：控制是覆蓋還是合併已定義的屬性，預設為 `false`。

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);

app.use(PrimeVue, {
ptOptions: {
    mergeSections: true,  // 合併主要設定
    mergeProps: false     // 不合併，直接覆蓋屬性
}
});
```

## **波紋效果 (Ripple)**  
波紋效果是一種可選的動畫，適用於按鈕等元件。預設為停用，若要啟用需在應用程式的進入檔案（如 `main.js`）中進行設定。

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);

app.use(PrimeVue, { ripple: true });
```

## **輸入欄位樣式 (InputVariant)**  
輸入欄位提供兩種樣式：  
- **預設樣式（outlined）**：具有邊框的外框樣式。  
- **填充樣式（filled）**：在輸入欄位中加入背景顏色。  

要啟用填充樣式，請在輸入欄位的父層元素套用 `p-variant-filled` 類別。如果希望整個應用程式都使用填充樣式，可以將該類別套用在全域容器上，例如 `body` 或應用程式的根元素。  

⚠️ **注意**：若將樣式套用到應用程式根元素，像 `Dialog` 這類使用 Teleport 傳送至 `body` 的元件將無法正確套用填充樣式，因為它們不屬於應用程式的 DOM 節點樹。為了解決此問題，可以在 PrimeVue 設定中將 `inputVariant` 設為 `filled`。

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);

app.use(PrimeVue, { inputVariant: "filled" });
```

## **Z-Index 層級管理 (ZIndex)**  

PrimeVue 會自動管理元件的 `z-index`，以確保多層疊加元件（例如選單、對話框等）能正確顯示。  
不過在某些情境下，像是具有固定標題的自訂版面，可能需要手動調整 `z-index` 層級：  
- **下拉選單（Dropdown）** 應顯示在標題下方。  
- **對話框（Modal Dialog）** 則應顯示在所有內容之上。  

可以透過 PrimeVue 的 `zIndex` 設定自訂元件類別的預設層級。以下為預設值，可依需求進行調整：  

```javascript
import { createApp } from "vue";
import PrimeVue from "primevue/config";
const app = createApp(App);

app.use(PrimeVue, {
zIndex: {
    modal: 1100,        // 對話框 (Dialog)、抽屜 (Drawer)
    overlay: 1000,      // 選單 (Select)、彈出視窗 (Popover)
    menu: 1000,         // 覆蓋式選單 (Overlay Menus)
    tooltip: 1100       // 提示訊息 (Tooltip)
}
});
```

- **`modal`**：用於 Dialog、Drawer 等模態元件。  
- **`overlay`**：用於 Select、Popover 等覆蓋式元件。  
- **`menu`**：用於下拉選單等選單元件。  
- **`tooltip`**：用於 Tooltip 等提示元件。


## **內容安全政策（CSP）**

### **Nonce 設定**  
`nonce` 用於核心中動態產生的樣式元素，以符合內容安全政策（CSP）的規範。

```javascript
app.use(PrimeVue, {
csp: {
    nonce: '...' // 在這裡填入你的 nonce 值
}
});
```

## **語系設定（Locale）**

### **設定語系**  
在安裝 PrimeVue 時，可以透過 `use` 函式的第二個參數來初始化語系設定。

```javascript
app.use(PrimeVue, {
locale: {
    accept: 'Aceptar',  // 接受按鈕的文字
    reject: 'Rechazar', // 拒絕按鈕的文字
    // 其他語系設定...
}
});
```

### **動態切換語言**  
語系設定是具備響應式（reactive）特性的，任何變更都會立即反映在使用者介面（UI）上。  
假設你正在開發多語言應用程式，並且需要動態切換語言，可以使用以下方式實作：

```javascript
import { defineComponent, onMounted } from "vue";
import { usePrimeVue } from "primevue/config";

export default defineComponent({
setup() {
    const changeToSpanish = () => {
        const primevue = usePrimeVue();
        primevue.config.locale.accept = "Aceptar";  // 將「接受」按鈕切換為西班牙語
        primevue.config.locale.reject = "Rechazar"; // 將「拒絕」按鈕切換為西班牙語
    };

    onMounted(() => {
        changeToSpanish(); // 元件掛載後切換語言
    });
}
});
```

## **語系資料庫（Repository）**  
PrimeVue 提供社群支援的 [PrimeLocale 資料庫](https://github.com/primefaces/primelocale)，內含可直接使用的語系設定。  
歡迎透過 Pull Request 貢獻你的語系設定，並與社群分享你的成果。

## **API**  
語系設定是透過從 `primevue/config` 匯入的 Locale API 來管理。

---

## **語系選項（Locale Options）**

| **鍵（Key）**               | **值（Value）**          | **中文翻譯**               |
|-----------------------------|--------------------------|----------------------------|
| startsWith                  | Starts with              | 以...開頭                  |
| contains                    | Contains                 | 包含                        |
| notContains                 | Not contains             | 不包含                      |
| endsWith                    | Ends with                | 以...結尾                  |
| equals                      | Equals                   | 等於                        |
| notEquals                   | Not equals               | 不等於                      |
| noFilter                    | No Filter                | 無篩選                      |
| lt                          | Less than                | 小於                        |
| lte                         | Less than or equal to    | 小於或等於                  |
| gt                          | Greater than             | 大於                        |
| gte                         | Greater than or equal to | 大於或等於                  |
| dateIs                      | Date is                  | 日期等於                    |
| dateIsNot                   | Date is not              | 日期不等於                  |
| dateBefore                  | Date is before           | 日期在...之前               |
| dateAfter                   | Date is after            | 日期在...之後               |
| clear                       | Clear                    | 清除                        |
| apply                       | Apply                    | 套用                        |
| matchAll                    | Match All                | 全部符合                    |
| matchAny                    | Match Any                | 任一符合                    |
| addRule                     | Add Rule                 | 新增規則                    |
| removeRule                  | Remove Rule              | 移除規則                    |
| accept                      | Yes                      | 是                          |
| reject                      | No                       | 否                          |
| choose                      | Choose                   | 選擇                        |
| upload                      | Upload                   | 上傳                        |
| cancel                      | Cancel                   | 取消                        |
| completed                   | Completed                | 已完成                      |
| pending                     | Pending                  | 處理中                      |
| fileSizeTypes               | ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] | 檔案大小單位                |
| dayNames                    | ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] | ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'] |
| dayNamesShort               | ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] | ['日', '一', '二', '三', '四', '五', '六'] |
| dayNamesMin                 | ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] | ['日', '一', '二', '三', '四', '五', '六'] |
| monthNames                  | ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] | ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'] |
| monthNamesShort             | ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] | ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'] |
| chooseYear                  | Choose Year              | 選擇年份                    |
| chooseMonth                 | Choose Month             | 選擇月份                    |
| chooseDate                  | Choose Date              | 選擇日期                    |
| prevDecade                  | Previous Decade          | 上個十年                    |
| nextDecade                  | Next Decade              | 下個十年                    |
| prevYear                    | Previous Year            | 前一年                      |
| nextYear                    | Next Year                | 下一年                      |
| prevMonth                   | Previous Month           | 上個月                      |
| nextMonth                   | Next Month               | 下個月                      |
| prevHour                    | Previous Hour            | 上一小時                    |
| nextHour                    | Next Hour                | 下一小時                    |
| prevMinute                  | Previous Minute          | 上一分鐘                    |
| nextMinute                  | Next Minute              | 下一分鐘                    |
| prevSecond                  | Previous Second          | 上一秒                      |
| nextSecond                  | Next Second              | 下一秒                      |
| am                          | am                       | 上午                        |
| pm                          | pm                       | 下午                        |
| today                       | Today                    | 今天                        |
| weekHeader                  | Wk                       | 週                          |
| firstDayOfWeek              | 0                        | 一週的第一天                |
| showMonthAfterYear          | false                    | 年份後顯示月份              |
| dateFormat                  | mm/dd/yy                 | 日期格式                    |
| weak                        | Weak                     | 弱                          |
| medium                      | Medium                   | 中                          |
| strong                      | Strong                   | 強                          |
| passwordPrompt              | Enter a password         | 輸入密碼                    |
| searchMessage               | {0} results are available | 可用 {0} 筆結果             |
| selectionMessage            | {0} items selected       | 已選取 {0} 項               |
| emptySelectionMessage       | No selected item         | 尚未選取項目                |
| emptySearchMessage          | No results found         | 查無結果                    |
| fileChosenMessage           | {0} files                | 已選取 {0} 個檔案           |
| noFileChosenMessage         | No file chosen           | 尚未選取檔案                |
| emptyMessage                | No available options     | 無可用選項                  |

## **ARIA 無障礙支援（ARIA）**

| **ARIA 屬性**               | **值（Value）**          | **中文翻譯**               |
|-----------------------------|--------------------------|----------------------------|
| aria.trueLabel              | True                     | 是                          |
| aria.falseLabel             | False                    | 否                          |
| aria.nullLabel              | Not Selected             | 未選取                      |
| aria.star                   | 1 star                   | 1 顆星                      |
| aria.stars                  | {star} stars             | {star} 顆星                 |
| aria.selectAll              | All items selected       | 已全選                      |
| aria.unselectAll            | All items unselected     | 已取消全選                  |
| aria.close                  | Close                    | 關閉                        |
| aria.previous               | Previous                 | 上一個                      |
| aria.next                   | Next                     | 下一個                      |
| aria.navigation             | Navigation               | 導覽                        |
| aria.scrollTop              | Scroll Top               | 捲動至頂部                  |
| aria.moveTop                | Move Top                 | 移至頂部                    |
| aria.moveUp                 | Move Up                  | 上移                        |
| aria.moveDown               | Move Down                | 下移                        |
| aria.moveBottom             | Move Bottom              | 移至底部                    |
| aria.moveToTarget           | Move to Target           | 移至目標                    |
| aria.moveToSource           | Move to Source           | 移回來源                    |
| aria.moveAllToTarget        | Move All to Target       | 移動全部至目標              |
| aria.moveAllToSource        | Move All to Source       | 移動全部回來源              |
| aria.pageLabel              | Page {page}              | 第 {page} 頁                |
| aria.firstPageLabel         | First Page               | 第一頁                      |
| aria.lastPageLabel          | Last Page                | 最後一頁                    |
| aria.nextPageLabel          | Next Page                | 下一頁                      |
| aria.prevPageLabel          | Previous Page            | 上一頁                      |
| aria.rowsPerPageLabel       | Rows per page            | 每頁筆數                    |
| aria.jumpToPageDropdownLabel| Jump to Page Dropdown    | 跳至頁面選單                |
| aria.jumpToPageInputLabel   | Jump to Page Input       | 跳至頁面輸入                |
| aria.selectRow              | Row Selected             | 已選取列                    |
| aria.unselectRow            | Row Unselected           | 取消選取列                  |
| aria.expandRow              | Row Expanded             | 展開列                      |
| aria.collapseRow            | Row Collapsed            | 收合列                      |
| aria.showFilterMenu         | Show Filter Menu         | 顯示篩選選單                |
| aria.hideFilterMenu         | Hide Filter Menu         | 隱藏篩選選單                |
| aria.filterOperator         | Filter Operator          | 篩選運算子                  |
| aria.filterConstraint       | Filter Constraint        | 篩選條件                    |
| aria.editRow                | Row Edit                 | 編輯列                      |
| aria.saveEdit               | Save Edit                | 儲存編輯                    |
| aria.cancelEdit             | Cancel Edit              | 取消編輯                    |
| aria.listView               | List View                | 清單檢視                    |
| aria.gridView               | Grid View                | 格線檢視                    |
| aria.slide                  | Slide                    | 幻燈片                      |
| aria.slideNumber            | {slideNumber}            | 第 {slideNumber} 張幻燈片    |
| aria.zoomImage              | Zoom Image               | 放大圖片                    |
| aria.zoomIn                 | Zoom In                  | 放大                        |
| aria.zoomOut                | Zoom Out                 | 縮小                        |
| aria.rotateRight            | Rotate Right             | 向右旋轉                    |
| aria.rotateLeft             | Rotate Left              | 向左旋轉                    |

:::info 參考資料
本頁文件使用 ChatGPT 翻譯自 [PrimeVue Configuration](https://primevue.org/configuration/)
:::
