import { DataTableSortEvent, DataTablePageEvent } from 'primevue/datatable'

export type HandleSortFunction = (event: DataTableSortEvent) => void

export type HandlePageFunction = (event: DataTablePageEvent) => void

export type TableOption = {
  page?: number
  perPage?: number
  sortField?: string | ((item: any) => string)
  sortOrder?: number
}
export type LoadDataFunction = (options: TableOption) => void

export type Product = {
  id: string
  code: string
  name: string
  description: string
  image: string
  price: number
  category: string
  quantity: number
  inventoryStatus: string
  rating: number
}[]
