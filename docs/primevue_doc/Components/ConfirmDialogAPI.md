# ConfirmDialog API 
### **ConfirmDialog API**
ConfirmDialog API 定義了用於 PrimeVue **ConfirmDialog** 模組的輔助 **props（屬性）**、**事件（events）** 及其他相關設定。

## **ConfirmDialog**
ConfirmDialog 使用 **Dialog UI**，並透過 **confirmDialog 方法** 或 **標籤** 來調用。

## **Props（屬性）**
以下定義了 **ConfirmDialog** 組件中的有效屬性：

| 屬性名稱 | 類型 | 預設值 | 描述 |
|----------|------|--------|------|
| **group** | `string` | `null` | （可選）用於匹配確認對話框的 **key**，方便針對特定的 ConfirmDialog 實例進行操作。 |
| **breakpoints** | `ConfirmDialogBreakpoints` | `null` | 定義不同螢幕尺寸對應的寬度，使用 **物件格式** 來設定。 |
| **draggable** | `boolean` | `true` | 啟用 **拖曳** 功能，允許透過標題拖動來改變對話框的位置。 |
| **dt** | `any` | `null` | 透過 **設計標記（design tokens）** 為該組件產生 **Scoped CSS 變數**。 |
| **pt** | `PassThrough<ConfirmDialogPassThroughOptions>` | `null` | 用於將屬性傳遞至組件內的 **DOM 元素**。 |
| **ptOptions** | `any` | `null` | 用於配置 **pt（PassThrough）** 選項。 |
| **unstyled** | `boolean` | `false` | 啟用後，會移除組件的預設樣式（不包含核心樣式）。 |

