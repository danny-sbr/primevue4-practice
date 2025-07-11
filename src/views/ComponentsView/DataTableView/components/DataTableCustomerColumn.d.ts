/**
 * DataTableCustomerColumn 組件的型別定義
 */

/**
 * 欄位配置介面
 */
export interface ColumnConfig {
  field: string // 欄位名稱
  header: string // 欄位顯示標題
  minWidth: number // 最小寬度（像素）
  sortable: boolean // 是否可排序
  class?: string // CSS 類別名稱
}

/**
 * 下拉選項介面
 */
export interface ColumnOption {
  label: string // 選項顯示文字
  value: string // 選項值
}

/**
 * 表格資料項目介面
 */
export interface TableDataItem {
  id: number // 員工 ID
  name: string // 姓名
  email: string // 電子郵件
  department: string // 部門
  phone: string // 電話號碼
  status: string // 在職狀態
}

/**
 * 設定資料介面
 */
export interface SettingsData {
  selectedColumns: string[] // 已選擇的欄位清單
  columnOrder: string[] // 欄位排序順序
  savedAt?: string // 儲存時間（ISO 格式）
  version?: string // 版本號
}

/**
 * API 回應介面
 */
export interface ApiResponse {
  status: number // HTTP 狀態碼
  message: string // 回應訊息
  data?: SettingsData // 回應資料
  error?: string // 錯誤詳細資訊
}

/**
 * API 錯誤介面
 */
export interface ApiError {
  status: number // HTTP 錯誤狀態碼
  message: string // 錯誤訊息
  error?: string // 錯誤詳細資訊
}

/**
 * 拖曳重排事件介面
 */
export interface ReorderEvent {
  dragIndex: number // 拖曳起始位置索引
  dropIndex: number // 拖曳目標位置索引
}

/**
 * API 服務介面
 */
export interface ApiServiceInterface {
  getSettings(): Promise<ApiResponse> // 獲取設定
  saveSettings(settingsData: SettingsData): Promise<ApiResponse> // 儲存設定
  deleteSettings(): Promise<ApiResponse> // 刪除設定
}

/**
 * Toast 訊息嚴重性層級
 */
export type ToastSeverity = 'success' | 'info' | 'warn' | 'error'

/**
 * Toast 訊息選項介面
 */
export interface ToastMessageOptions {
  severity: ToastSeverity // 嚴重性層級
  summary: string // 標題
  detail: string // 詳細內容
  life: number // 顯示時間（毫秒）
}
