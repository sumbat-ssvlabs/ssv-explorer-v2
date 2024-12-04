import { type Table } from "@tanstack/react-table"

export const useColumnsVisibility = <T = Table<unknown>>(table: Table<T>) => {
  const allColumns = table.getAllColumns()
  const hidableColumns = allColumns.filter(
    (column) => typeof column.accessorFn !== "undefined" && column.getCanHide()
  )

  const fixedColumnsCount = allColumns.length - hidableColumns.length

  const visibleColumnsCount =
    hidableColumns.filter((column) => column.getIsVisible()).length +
    fixedColumnsCount

  return {
    allColumns,
    hidableColumns,
    fixedColumnsCount,
    visibleColumnsCount,
  }
}
