---
outline: deep
---

# 介紹

**PrimeVue**：下一代 Vue UI 元件套件  

## 概述  
**PrimeVue** 是一套完整的 Vue.js UI 元件庫，包含豐富的 UI 元件、圖示、區塊（Blocks）以及應用程式範本。此專案的主要目標是提升開發者的生產力，透過可重複使用、易於調整與自訂的解決方案，成為企業內部開發的理想 UI 資源庫。  

此專案由知名的 UI 元件套件供應商 **PrimeTek** 開發，PrimeTek 也同時維護其他熱門的 UI 套件，如 **PrimeFaces**、**PrimeNG** 和 **PrimeReact**。我們的開發團隊成員皆為 PrimeTek 的全職員工，秉持著對開源技術的熱情與共同願景，致力於打造優秀的 UI 元件庫。  

依賴第三方函式庫可能帶來風險，尤其當維護者停止更新專案時。然而，**PrimeVue** 並不存在這類風險，因為 PrimeTek 擁有穩定且持續維護的良好記錄。例如，**PrimeFaces** 自 2008 年起便持續積極維護至今，展現了我們對產品穩定性與長期支持的承諾。

## 主題樣式（Theming）

**PrimeVue** 提供兩種樣式模式：**已套用樣式（Styled）** 和 **未套用樣式（Unstyled）**。  

- **已套用樣式模式（Styled Mode）**  
  這種模式基於預先設計好的元件外觀，搭配 **PrimeOne** 設計主題的變體，如 **Aura**、**Lara** 或 **Nora** 等預設主題，快速提供一致且美觀的 UI 風格。

- **未套用樣式模式（Unstyled Mode）**  
  在這種模式下，PrimeVue 僅提供功能與無障礙支援（Accessibility），而不干涉樣式設計，完全交由開發者自訂。未套用樣式模式採用可插拔（Pluggable）的架構，方便與各種 CSS 函式庫整合，像是 **Tailwind CSS**、**Bootstrap**、**Bulma**，甚至是您自行開發的 CSS。  

此外，我們還提供了 **Tailwind Presets** 函式庫，讓您能夠使用 Tailwind 的工具類別（Utility Classes）快速為 PrimeVue 元件套用樣式。此設計具有未來擴展性，讓 **PrimeVue** 可以搭配任何 CSS 函式庫使用，同時不會在核心程式碼中產生相依性。

## PassThrough（屬性傳遞）

**PassThrough** 是一個創新的 API，允許開發者直接存取元件的內部 DOM 元素，並新增任意屬性。  

傳統的 UI 元件庫通常將 UI 和邏輯封裝起來，並僅提供有限的 API（如 Props 或 Events）。當開發者需要額外功能時，往往得依賴元件維護者進行擴充。**PassThrough** 則打破了這項限制，讓您可以直接操作元件內部結構，自由新增事件監聽器與自訂屬性。  

常見的使用情境包括：  
- 新增測試屬性（如 `data-testid`）  
- 增加額外的 ARIA 無障礙屬性  
- 綁定自訂事件  
- 進一步的樣式微調  

## 無障礙支援（Accessibility）

**PrimeVue** 符合 **WCAG 2.1 AA** 級別的無障礙標準，確保元件可供更多使用者無障礙地操作。每個元件都設有專屬的無障礙說明，涵蓋以下幾個面向：  
- **鍵盤操作支援**  
- **螢幕閱讀器相容性**  

我們透過 GitHub、Discord 等社群管道，持續獲得來自全球無障礙專家的寶貴意見，以不斷優化無障礙功能。  
👉 想了解更多？請參考 **[無障礙指南（Accessibility Guide）]** 進一步探索！

## 附加套件（Add-Ons）

**PrimeVue** 不依賴社群的財務贊助來維持運作。為了確保專案有穩固的財務基礎，我們提供了一些可選購的 **附加套件（Add-Ons）**，以支持專案的持續發展。  

這些附加套件包括：  
- 🎨 **Figma UI Kit**：適用於設計師的 UI 設計工具包，方便在 Figma 中快速建立符合 PrimeVue 樣式的設計稿。  
- 🚀 **高級應用範本（Premium Application Templates）**：預先設計的完整應用範本，幫助您快速啟動專案，節省開發時間。  
- 📦 **PrimeBlocks（可重複使用的 UI 區塊）**：一組可直接拖放到專案中的 UI 區塊，方便快速組建各種介面，提升開發效率。  

✅ **重要提醒：** 這些附加套件僅為可選購項目，**使用 PrimeVue 本身完全不需付費，也不會有任何功能被設置在付費牆後。** 您可以自由使用 PrimeVue，並根據需求選擇是否購買額外資源。


:::info 參考資料
本頁文件使用 ChatGPT 翻譯自 [PrimeVue Getting Started](https://primevue.org/introduction/)
:::
