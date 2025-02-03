<script setup>
import Color from './Color.vue';
</script>

# **樣式模式（Styled Mode）**  
從多種預設主題中選擇，或開發自己的客製化主題。

## **架構（Architecture）**  
PrimeVue 是一個設計中立的 UI 函式庫，與其他 UI 函式庫不同，它不強制使用特定的設計風格（如 Material Design）。  
PrimeVue 的樣式與元件是解耦的，透過「主題（Theme）」進行管理。  

一個主題主要由兩個部分組成：  
- **基礎樣式（Base）**：使用 CSS 變數作為樣式規則的佔位符。  
- **預設設定（Preset）**：透過設計標記（Design Tokens）來映射 CSS 變數，提供基礎樣式所需的設計值。  

目前內建的預設主題包括：**Aura**、**Material**、**Lara** 和 **Nora**，每個主題都可以套用到相同的基礎樣式。


## **設計標記架構（Design Token Architecture）**  
樣式模式的核心架構基於「設計標記（Design Token）」概念，並分為三個層級：  
1. **基礎標記（Primitive Tokens）**  
2. **語意標記（Semantic Tokens）**  
3. **元件標記（Component Tokens）**


### 🎨 **基礎標記（Primitive Tokens）**  
基礎標記沒有特定語意，通常用來定義顏色、字體大小等基本設計元素。  
- **範例**：`blue-50` 到 `blue-900` 的色階。  
- **用途**：`blue-500` 可以作為主色（Primary Color）或背景色，但名稱本身並不說明其具體用途。  

基礎標記通常會被語意標記所引用。

### 🗂️ **語意標記（Semantic Tokens）**  
語意標記則用於定義具有特定用途的設計元素，並透過名稱反映其用途。  
- **範例**：`primary.color` 代表主色、`focus.ring` 代表焦點邊框。  
- **映射關係**：語意標記會映射到基礎標記或其他語意標記，例如 `primary.color` 可能對應到 `blue-500`。  
- **特別標記**：`colorScheme` 是一個特殊變數，可以根據應用程式的色彩模式（如深色模式）定義不同的標記值。


### ⚙️ **元件標記（Component Tokens）**  
元件標記專門針對個別元件進行設計，例如：  
- `inputtext.background`：定義輸入框的背景色。  
- `button.color`：定義按鈕的文字顏色。  

**範例說明：**  
`button.background`（按鈕背景色） → 映射到 `primary.color`（主色語意標記） → 最終對應到 `green-500`（基礎標記）。


## ✅ **最佳實踐（Best Practices）**  
- **核心設計**：使用基礎標記來定義主要的色彩調色盤。  
- **常見元素**：利用語意標記來指定常見的設計元素，如焦點框、主色、背景表面等。  
- **元件自訂**：只有在需要自訂特定元件時，才使用元件標記。  

### **客製化建議：**  
- 建議透過自訂預設設定（Custom Preset）來定義自己的設計標記，無需直接修改 CSS。  
- **不建議** 直接覆蓋 PrimeVue 元件的樣式類別，這應作為最後手段。  
- **建議** 使用設計標記（Design Tokens）進行樣式管理，這能確保更好的維護性與一致性。

### 🎥 **教學影片（Video Tutorial）**  
觀看 **PrimeVue 主題設定全解析（Theming Demystified）** 系列影片，深入了解樣式架構與實作範例。


<iframe width="560" height="315" src="https://www.youtube.com/embed/J3KFw5sih98?list=PLC9bp-OHi-Wm2LqlXk1i-haW-1kESMIqh" title="PrimeVue Theming Demystified" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## ⚙️ **設定 API（Configuration API）**

### **主題設定（Theme）**  
`theme` 屬性用於自訂初始主題。

```javascript
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
    // 預設主題設定
    theme: {
        preset: Aura, // 套用 Aura 主題
        options: {
            prefix: 'p',               // CSS 變數前綴
            darkModeSelector: 'system', // 深色模式依系統設定切換
            cssLayer: false             // 不啟用 CSS Layer
        }
    }
});
```


## **選項設定（Options）**  
`options` 屬性用於定義如何從設計標記（Design Tokens）產生 CSS。


### 1️⃣ **`prefix`（前綴）**  
設定 CSS 變數的前綴，預設為 `p`。  
- **範例：** `primary.color` 設計標記會轉換為 `var(--p-primary-color)`。  

```javascript
options: {
    prefix: 'my' // 變數將變為 var(--my-primary-color)
}
```

### 2️⃣ **`darkModeSelector`（深色模式選擇器）**  
用於封裝深色模式的 CSS 變數，預設值為 `system`，會依據系統偏好設定：  
```css
@media (prefers-color-scheme: dark) { ... }
```

- **若需基於使用者選擇切換深色模式：**  
可定義自訂的類別選擇器（如 `.app-dark`），並在文件根節點切換此類別。

```javascript
options: {
    darkModeSelector: '.my-app-dark' // 自訂深色模式的選擇器
}
```

**範例：切換深色模式**  
```javascript
document.documentElement.classList.toggle('my-app-dark');
```

### 3️⃣ **`cssLayer`（CSS 層級管理）**  
定義是否將樣式包在 CSS Layer 中，預設為 `false`。  
啟用後，可自訂層疊順序，方便樣式覆蓋與管理。

```javascript
options: {
    cssLayer: {
        name: 'primevue', // CSS Layer 名稱
        order: 'app-styles, primevue, another-css-library' // 層疊順序
    }
}
```
## 🎨 **預設主題（Presets）**  

PrimeVue 提供四種內建主題，展示了設計中立的主題系統強大之處：  

1. **Aura**：由 PrimeTek 設計，展現自家設計理念。  
2. **Material**：遵循 Google Material Design v2 標準。  
3. **Lara**：基於 Bootstrap 設計風格。  
4. **Nora**：受到企業應用程式的設計啟發。  

你可以直接使用這些預設主題並進行修改，或作為參考來建立自己的客製化主題。  
若想了解更多主題結構，建議參考 [PrimeVue 官方原始碼](https://github.com/primefaces/primevue)。


## 📋 **命名規則（Case Style）**  

設計標記（Design Tokens）使用「點號分隔（dot separator）」的命名規則，例如：  
- `primary.color`（主色）  
- `form.field.background`（表單欄位背景色）  
- `checkbox.icon.checked.color`（勾選框圖示的已勾選顏色）  

在設定預設主題時，可以使用不同的命名風格來映射這些點分隔的標記。以下是 `checkbox.icon.checked.color` 的三種等效寫法，結果相同：

```javascript
// 使用駝峰式命名（Camel Case）
export default {
    iconCheckedColor: '#00BFFF'
};

// 使用巢狀物件屬性（Nested Object）
export default {
    icon: {
        checkedColor: '#00BFFF'
    }
};

// 更深層次的巢狀結構
export default {
    icon: {
        checked: {
            color: '#00BFFF'
        }
    }
};
```

**建議：** 根據專案複雜度選擇適合的命名方式，巢狀結構更利於管理大型樣式系統。

## 🚫 **保留鍵（Reserved Keys）**  

在預設主題的設定中，下列關鍵字為保留名稱，**不可作為設計標記名稱**：  
- `primitive`（基礎標記）  
- `semantic`（語意標記）  
- `components`（元件）  
- `directives`（指令）  
- `colorscheme`（色彩方案）  
- `light`（淺色模式）  
- `dark`（深色模式）  
- `common`（通用）  
- `root`（根層級）  
- `states`（狀態）  
- `extend`（擴展）

**⚠️ 注意：** 使用這些保留鍵可能導致樣式衝突或錯誤。

## 🌈 **顏色設定（Colors）**  

主題的色彩調色盤是透過「基礎設計標記（Primitive Design Tokens）」來定義。  
可以使用 **CSS 變數** 或 **JavaScript 工具函式** 來存取顏色。

### 1️⃣ **使用 CSS 變數**  
```css
/* 直接在 CSS 中使用 */
background-color: var(--p-blue-500);
```

### 2️⃣ **使用 JavaScript 存取顏色**  
```javascript
// 使用 $dt 工具函式取得顏色值
const primaryBlue = $dt('blue.500').value;
console.log(primaryBlue); // 輸出 '#2196F3'（假設的藍色值）
```

- **`blue.500`** 是色彩等級（從 `blue.50` 到 `blue.900`）。  
- **`$dt()`** 是用來存取設計標記（Design Tokens）的工具函式。

<Color />

## 🌙 **深色模式（Dark Mode）**

PrimeVue 預設使用系統偏好設定（`prefers-color-scheme`）作為深色模式的選擇器。若你的應用程式有切換深色模式的功能，可以將 `darkModeSelector` 設為自訂的選擇器（例如 `.my-app-dark`），以便 PrimeVue 無縫配合你的色彩方案。

### **基本設定範例：**

```javascript
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark', // 自訂深色模式選擇器
        }
    }
});
```


## **深色模式切換範例：**

以下是一個簡單的深色模式切換按鈕，你也可以進一步擴展，結合 `prefers-color-scheme` 和 `localStorage` 來記錄使用者偏好。

```vue
<template>
    <Button label="切換深色模式" @click="toggleDarkMode" />
</template>

<script setup>
function toggleDarkMode() {
    document.documentElement.classList.toggle('my-app-dark');
}
</script>
```


## **預設啟用深色模式：**

如果希望應用程式**始終啟用深色模式**，可在 `html` 標籤中直接加上選擇器，且不再進行切換：

```html
<html class="my-app-dark">
```


## **禁用深色模式：**

若不需要深色模式，可以將 `darkModeSelector` 設為 `false` 或 `'none'`，以完全停用深色模式：

```javascript
theme: {
    preset: Aura,
    options: {
        darkModeSelector: false // 或 'none'
    }
}
```

## 🎨 **主題自訂化（Customization）**

### **`definePreset` 自訂預設主題：**

`definePreset` 工具可用於在 PrimeVue 設定階段，自訂現有的預設主題。  
- **第一個參數**：要自訂的預設主題。  
- **第二個參數**：要覆蓋的設計標記（Design Tokens）。

#### **自訂範例：**

```javascript
import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

// 自訂 Aura 主題
const MyPreset = definePreset(Aura, {
    // 這裡放你的客製化設定
});

app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
});
```

### **自訂主色（Primary）**

`primary` 定義了主要的色彩調色盤，預設會映射到 `emerald` 基礎標記。以下範例將主要色彩改為 `indigo`（靛藍色系）：

```javascript
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}', // 主要使用的顏色
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        }
    }
});
```

### 🌗 **表面色調（Surface）**

表面色調（Surface Tokens）定義了隨著亮色模式與深色模式變化的色彩調色盤。  
以下範例中，亮色模式使用 **Zinc** 色系，深色模式使用 **Slate** 色系，營造出灰階與藍灰色調的效果。

```javascript
const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            }
        }
    }
});
```

---

### 🖤 **Noir 模式（Noir Mode）**

**Noir 模式** 是一種特殊的主題變體，主要使用表面色調作為主要色彩，適合黑白極簡風格的設計。此模式需要額外設定 `colorScheme` 來定義主色調與高亮效果。

```javascript
const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{zinc.950}',
                    inverseColor: '#ffffff',
                    hoverColor: '{zinc.900}',
                    activeColor: '{zinc.800}'
                },
                highlight: {
                    background: '{zinc.950}',
                    focusBackground: '{zinc.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '{zinc.50}',
                    inverseColor: '{zinc.950}',
                    hoverColor: '{zinc.100}',
                    activeColor: '{zinc.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
});
```

## 🔤 **字體設定（Font）**

PrimeVue **不提供內建字體設計**，所有 UI 元件會繼承應用程式的全域字體設定。


## 📋 **表單樣式（Forms）**

表單元件（如輸入框、下拉選單）的設計標記來自 `form.field` 標記群組。以下範例自訂滑鼠懸停時的邊框顏色，將其改為主要色（`primary.color`）：

```javascript
const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            },
            dark: {
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            }
        }
    }
});
```

此設定會影響所有依賴此語意標記的元件，例如 `dropdown.hover.border.color` 和 `textarea.hover.border.color`。

## 🔍 **焦點框（Focus Ring）**

焦點框（Focus Ring）用於定義元素取得焦點時的外框樣式，包括寬度、樣式、顏色與偏移量。以下範例設定為粗虛線樣式，並使用主要色作為外框顏色：

```javascript
const MyPreset = definePreset(Aura, {
    semantic: {
        focusRing: {
            width: '2px',
            style: 'dashed',
            color: '{primary.color}',
            offset: '1px'
        }
    }
});
```

## 🧩 **元件自訂（Component）**

特定元件的**設計標記** (*design tokens*) 定義於**元件層** (*components layer*)。

如果您要建立自己的樣式：

- ❌ 不建議覆蓋元件的標記
- ✅ 建議改為建立自己的**預設設定** (*preset*)

此設定為**全域配置**，並適用於所有**卡片元件** (*card components*)。

> 若您需要在頁面上針對特定元件進行**在地化** (*local*) 自訂，請參閱「*Scoped CSS*」部分的範例。

```javascript
const MyPreset = definePreset(Aura, {
    components: {
        card: {
            colorScheme: {
                light: {
                    root: {
                        background: '{surface.0}',
                        color: '{surface.700}'
                    },
                    subtitle: {
                        color: '{surface.500}'
                    }
                },
                dark: {
                    root: {
                        background: '{surface.900}',
                        color: '{surface.0}'
                    },
                    subtitle: {
                        color: '{surface.400}'
                    }
                }
            }
        }
    }
});
```

## 🚀 **擴展主題（Extend）**

PrimeVue 的主題系統支援擴展功能，允許你新增**自訂設計標記（Design Tokens）**和額外的樣式，達到高度客製化的效果。這表示你不再受限於預設標記，可以根據需求調整樣式。

## 🎨 **自訂按鈕範例（Custom Accent Button）**

以下範例展示如何新增一個 **accent（強調）按鈕**，並定義自訂的 `button.accent.color` 與 `button.accent.inverse.color` 設計標記。同時也示範如何全域共享標記供其他元件使用。

```javascript
const MyPreset = definePreset(Aura, {
    components: {
        button: {
            extend: {
                accent: {
                    color: '#f59e0b',        // 按鈕背景色（橘色）
                    inverseColor: '#ffffff'  // 文字顏色（白色）
                }
            },
            css: ({ dt }) => `
                .p-button-accent {
                    background: ${dt('button.accent.color')};  /* 使用自訂的背景色 */
                    color: ${dt('button.accent.inverse.color')}; /* 使用自訂的文字色 */
                    transition-duration: ${dt('my.transition.fast')}; /* 套用快速過渡效果 */
                }
            `
        }
    },
    extend: {
        my: {
            transition: {
                slow: '0.75s',   // 慢速過渡
                normal: '0.5s',  // 一般速度
                fast: '0.25s'    // 快速過渡
            },
            imageDisplay: 'block'  // 全域圖片顯示設定
        }
    },
    css: ({ dt }) => `
        /* 全域 CSS 設定 */
        img {
            display: ${dt('my.imageDisplay')};  /* 依自訂標記調整圖片顯示方式 */
        }
    `
});
```

### 🗂️ **範例解釋**

1. **自訂按鈕樣式：**  
   - `button.accent.color`：定義按鈕的背景色。  
   - `button.accent.inverse.color`：定義按鈕文字顏色。  

2. **全域共享標記：**  
   - `my.transition.fast`：定義快速過渡效果，供多個元件共用。  
   - `my.imageDisplay`：設定全域圖片顯示方式。

3. **使用 `dt()` 函式：**  
   - `dt('button.accent.color')`：用來讀取自訂設計標記的值，方便維護與重複使用。


## 🎯 **Scoped Tokens（局部設計標記）**

設計標記也可以針對特定元件進行局部定義，使用 `dt` 屬性即可達成。  
以下範例展示了兩個切換開關（Switch）元件：  
- **第一個開關**使用全域標記。  
- **第二個開關**覆蓋全域標記，使用自己的自訂設計標記。

```javascript
const MyPreset = definePreset(Aura, {
    components: {
        switch: {
            css: ({ dt }) => `
                .p-switch {
                    background-color: ${dt('switch.background')}; /* 全域背景色 */
                }
                .p-switch.active {
                    background-color: ${dt('switch.active.background')}; /* 啟用狀態的背景色 */
                }
            `
        }
    },
    extend: {
        switch: {
            background: '#ccc',              // 全域預設背景色
            active: {
                background: '#4caf50'        // 全域啟用狀態背景色
            }
        }
    }
});

// 在特定元件中覆蓋全域標記
const CustomSwitch = definePreset(MyPreset, {
    components: {
        switch: {
            extend: {
                active: {
                    background: '#ff5722'  // 覆蓋啟用狀態背景色（橘紅色）
                }
            }
        }
    }
});
```

## ⚡ **為什麼選擇 `Scoped Tokens`？**

- **比 `:deep()` 更乾淨：** 不需要複雜的 CSS 覆蓋規則。  
- **避免樣式衝突：** 標記只影響指定的元件，方便維護。  
- **更好的 API 統一性：** 保持樣式與設計標記一致，讓開發過程更流暢。

這種方式不僅提升了樣式管理的彈性，同時也降低了維護成本。

## 🖼️ **元件客製化範例（ToggleSwitch）**

以下範例展示了如何使用 `ToggleSwitch` 元件，並透過設計標記（Design Tokens）來進行局部樣式客製化：

```vue
<template>
    <div>
        <!-- 使用全域預設樣式 -->
        <ToggleSwitch v-model="checked1" />

        <!-- 使用 amberSwitch 自訂設計標記 -->
        <ToggleSwitch v-model="checked2" :dt="amberSwitch" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(true);

const amberSwitch = ref({
    handle: {
        borderRadius: '4px' // 切換開關的圓角設定
    },
    colorScheme: {
        light: {
            root: {
                checkedBackground: '{amber.500}', // 開啟狀態的背景色（亮色模式）
                checkedHoverBackground: '{amber.600}', // 滑鼠懸停時的背景色
                borderRadius: '4px'
            },
            handle: {
                checkedBackground: '{amber.50}', // 開啟狀態的開關顏色
                checkedHoverBackground: '{amber.100}' // 滑鼠懸停時的顏色
            }
        },
        dark: {
            root: {
                checkedBackground: '{amber.400}', // 深色模式的背景色
                checkedHoverBackground: '{amber.300}',
                borderRadius: '4px'
            },
            handle: {
                checkedBackground: '{amber.900}', // 深色模式的開關顏色
                checkedHoverBackground: '{amber.800}'
            }
        }
    }
});
</script>
```

## 🔧 **工具函式（Utils）**

### 1️⃣ **`usePreset` - 動態切換主題**

`usePreset` 用於**完全替換**當前的主題設定，常見於在執行期間動態切換主題的場景。

```javascript
import { usePreset } from '@primevue/themes';

const onButtonClick = () => {
    usePreset(MyPreset); // 切換到自訂主題 MyPreset
};
```


### 2️⃣ **`updatePreset` - 合併更新設計標記**

`updatePreset` 會將新提供的設計標記與當前主題進行**合併**，不會完全覆蓋原設定。  
適用於需要在執行期間**動態更新主色調**或其他標記的情境。

```javascript
import { updatePreset } from '@primevue/themes';

const changePrimaryColor = () => {
    updatePreset({
        semantic: {
            primary: {
                50: '{indigo.50}',
                100: '{indigo.100}',
                200: '{indigo.200}',
                300: '{indigo.300}',
                400: '{indigo.400}',
                500: '{indigo.500}',
                600: '{indigo.600}',
                700: '{indigo.700}',
                800: '{indigo.800}',
                900: '{indigo.900}',
                950: '{indigo.950}'
            }
        }
    });
};
```


### 3️⃣ **`updatePrimaryPalette` - 快速更新主色調**

`updatePrimaryPalette` 是 `updatePreset` 的簡化版本，專門用來快速更新主色調。

```javascript
import { updatePrimaryPalette } from '@primevue/themes';

const changePrimaryColor = () => {
    updatePrimaryPalette({
        50: '{indigo.50}',
        100: '{indigo.100}',
        200: '{indigo.200}',
        300: '{indigo.300}',
        400: '{indigo.400}',
        500: '{indigo.500}',
        600: '{indigo.600}',
        700: '{indigo.700}',
        800: '{indigo.800}',
        900: '{indigo.900}',
        950: '{indigo.950}'
    });
};
```



### 4️⃣ **`updateSurfacePalette` - 更新表面色調**

`updateSurfacePalette` 用於更新亮色與深色模式下的表面色調（Surface Palette），可針對**全域、亮色或深色模式**進行調整。

```javascript
import { updateSurfacePalette } from '@primevue/themes';

// 同時更新亮色與深色模式
const changeSurfaces = () => {
    updateSurfacePalette({
        50: '{zinc.50}',
        950: '{zinc.950}'
    });
};

// 只更新亮色模式
const changeLightSurfaces = () => {
    updateSurfacePalette({
        light: {
            50: '{zinc.50}',
            950: '{zinc.950}'
        }
    });
};

// 只更新深色模式
const changeDarkSurfaces = () => {
    updateSurfacePalette({
        dark: {
            50: '{zinc.50}',
            950: '{zinc.950}'
        }
    });
};
```

## 🗂️ **設計標記工具（$dt）**

`$dt` 函式用於程式化存取設計標記（Design Tokens）的相關資訊，包括完整路徑、CSS 變數名稱以及實際的數值。這在進行動態樣式處理時非常實用。

### 📌 **使用範例**

```javascript
import { $dt } from '@primevue/themes';

// 取得過渡效果的持續時間
const duration = $dt('transition.duration');
/*
    duration: {
        name: '--transition-duration',
        variable: 'var(--p-transition-duration)',
        value: '0.2s'
    }
*/

// 取得主色（Primary Color）
const primaryColor = $dt('primary.color');
/*
    primaryColor: {
        name: '--primary-color',
        variable: 'var(--p-primary-color)',
        value: {
            light: {
                value: '#10b981',
                paths: {
                    name: 'semantic.primary.color',
                    binding: {
                        name: 'primitive.emerald.500'
                    }
                }
            },
            dark: {
                value: '#34d399',
                paths: {
                    name: 'semantic.primary.color',
                    binding: {
                        name: 'primitive.emerald.400'
                    }
                }
            }
        }
    }
*/
```

## 🎨 **調色盤（palette）**

`palette` 函式可根據指定的顏色生成從 50 到 950 的色階（漸層與陰影色）。

### 📌 **使用範例**

```javascript
import { palette } from '@primevue/themes';

// 自訂顏色的色階
const values1 = palette('#10b981');

// 參考現有的標記顏色
const primaryColor = palette('{blue}');
```


## 🏗️ **CSS 層級（CSS Layer）**

在主題設定中啟用 `cssLayer`，PrimeVue 的內建樣式類別會被包覆在 `@layer primevue` 之下，方便進行樣式覆蓋。  
如果使用的是無樣式模式（unstyled mode），則不會套用內建 CSS，因此不需要 `cssLayer`。

### 📌 **啟用 CSS Layer 的範例**

```css
/* 設定層級順序 */
@layer reset, primevue;

/* Reset CSS */
@layer reset {
    button,
    input {
        all: unset;
        box-sizing: border-box;
    }
}
```

此方式可避免 Reset CSS 與 PrimeVue 樣式產生衝突。

## 📦 **CSS 模組（CSS Modules）**

在 SFC（Single File Component）中啟用 CSS 模組，可使用 `$style` 動態套用類別名稱。建議在使用 CSS Modules 時，同時啟用 `cssLayer` 以降低 CSS 的優先權衝突。

### 📌 **範例**

```vue
<template>
    <InputText :class="$style.myinput" placeholder="搜尋" />
</template>

<style module>
.myinput {
    border-radius: 2rem;
    padding: 1rem 2rem;
    border-width: 2px;
}
</style>
```

## 🔍 **全域縮放（Scale）**

PrimeVue 的 UI 元件使用 `rem` 單位，`1rem` 預設等於 `html` 元素的字體大小（16px）。  
透過調整 `root font-size`，可全域調整元件的大小。

### 📌 **調整範例**

```css
html {
    font-size: 14px; /* 將基準字體大小設為 14px */
}
```

若你的應用程式使用不同的基準字體大小，元件尺寸也會隨之調整。

:::info 參考資料
本頁文件使用 ChatGPT 翻譯自 [PrimeVue Styled Mode](https://primevue.org/theming/styled/)
:::
