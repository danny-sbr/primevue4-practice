---
outline: deep
---

# DataTable（表格元件）API

`DataTable` 用於以表格格式顯示資料。

## Props（屬性）
| 屬性名稱 | 類型 | 預設值 | 描述 |
|---------|------|------|------|
| `value` | `null \| any[]` | `null` | 要顯示的資料陣列。 |
| `dataKey` | `string \| Function` | `null` | 用於唯一識別每筆資料的欄位名稱或函式。 |
| `rows` | `number` | `0` | 每頁顯示的列數。 |
| `first` | `number` | `0` | 第一筆要顯示的資料索引。 |
| `totalRecords` | `number` | `0` | 總資料筆數，未設定時則使用 `value` 的長度。 |
| `paginator` | `boolean` | `false` | 是否啟用分頁功能。 |
| `paginatorPosition` | `"top" \| "bottom" \| "both"` | `"bottom"` | 分頁器顯示位置，可選擇 `"top"`（上方）、`"bottom"`（下方）或 `"both"`（兩者皆有）。 |
| `alwaysShowPaginator` | `boolean` | `true` | 即使只有一頁，也是否顯示分頁器。 |
| `paginatorTemplate` | `any` | `FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown` | 可自訂分頁器的顯示模板。 |
| `pageLinkSize` | `number` | `5` | 顯示的分頁連結數量。 |
| `rowsPerPageOptions` | `number[]` | `null` | 可選擇的「每頁顯示筆數」選項（下拉選單）。 |
| `currentPageReportTemplate` | `string` | `({currentPage} of {totalPages})` | 分頁狀態顯示模板，可使用 `{currentPage}`、`{totalPages}`、`{rows}`、`{first}`、`{last}`、`{totalRecords}` 變數。 |
| `lazy` | `boolean` | `false` | 是否使用 Lazy Loading（懶加載）。 |
| `loading` | `boolean` | `false` | 是否顯示載入中指示器。 |
| `loadingIcon` | `string` | `null` | 載入中的圖示。 |
| `sortField` | `string \| Function` | `null` | 預設排序的欄位名稱或函式。 |
| `sortOrder` | `number` | `null` | 預設排序順序。 |
| `nullSortOrder` | `number` | `1` | 決定 `null` 值的排序順序。 |
| `defaultSortOrder` | `number` | `1` | 預設未排序時的順序。 |
| `multiSortMeta` | `DataTableSortMeta[]` | `null` | 設定多欄位排序規則。 |
| `sortMode` | `"single" \| "multiple"` | `"single"` | 排序模式，可選 `"single"`（單欄排序）或 `"multiple"`（多欄排序）。 |
| `removableSort` | `boolean` | `false` | 是否允許清除排序狀態。 |
| `filters` | `DataTableFilterMeta` | `null` | 設定篩選條件。 |
| `filterDisplay` | `"menu" \| "row"` | `null` | 設定篩選 UI 顯示方式，可選 `"menu"`（彈出式選單）或 `"row"`（內嵌於列）。 |
| `globalFilterFields` | `(string \| Function)[]` | `null` | 全域篩選適用的欄位。 |
| `filterLocale` | `string` | `null` | 設定篩選時使用的語系。 |
| `selection` | `any` | `null` | 當前選取的資料（單選為單一值，多選為陣列）。 |
| `selectionMode` | `"single" \| "multiple"` | `null` | 選取模式，可選 `"single"`（單選）或 `"multiple"`（多選）。 |
| `compareSelectionBy` | `"equals" \| "deepEquals"` | `"deepEquals"` | 用於判斷資料是否相同的演算法。 |
| `metaKeySelection` | `boolean` | `false` | 是否需要按住 `Meta` 鍵（Windows: Ctrl，Mac: Cmd）才能選取/取消選取資料。 |
| `contextMenu` | `boolean` | `false` | 是否啟用右鍵選單。 |
| `contextMenuSelection` | `any` | `null` | 右鍵選單選取的資料。 |
| `selectAll` | `boolean` | `null` | 是否全選資料。 |
| `rowHover` | `boolean` | `false` | 是否啟用滑鼠懸停時變更列的背景色。 |
| `csvSeparator` | `string` | `,` | 下載 CSV 時的分隔符號。 |
| `exportFilename` | `string` | `"download"` | 匯出的檔案名稱。 |
| `exportFunction` | `Function` | `null` | 自訂匯出函式。 |
| `resizableColumns` | `boolean` | `false` | 是否啟用拖曳調整欄位寬度。 |
| `columnResizeMode` | `"fit" \| "expand"` | `"fit"` | 設定欄位調整方式，可選 `"fit"`（適應表格寬度）或 `"expand"`（整體擴展）。 |
| `reorderableColumns` | `boolean` | `false` | 是否允許拖曳調整欄位順序。 |
| `expandedRows` | `null \| any[]  \| DataTableExpandedRows` | `null` | 設定哪些列預設展開。 |
| `expandedRowIcon` | `string` | `null` | 展開列的圖示。 |
| `collapsedRowIcon` | `string` | `null` | 收合列的圖示。 |
| `rowGroupMode` | `"subheader" \| "rowspan"` | `null` | 設定列分組方式，可選 `"subheader"`（群組標題）或 `"rowspan"`（跨列合併）。 |
| `groupRowsBy` | `string \| string[] \| Function` | `null` | 設定列群組依據的欄位名稱。 |
| `stateStorage` | `"session" \| "local"` | `"session"` | 表格狀態儲存方式，可選 `"session"`（Session Storage）或 `"local"`（Local Storage）。 |
| `stateKey` | `string` | `null` | 表格狀態的唯一識別碼。 |
| `editMode` | `"row" \| "cell"` | `null` | 設定編輯模式，可選 `"row"`（整列編輯）或 `"cell"`（單格編輯）。 |

