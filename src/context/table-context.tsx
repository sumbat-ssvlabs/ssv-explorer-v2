"use client"

import { createContext, use, type ReactNode } from "react"
import { type Table } from "@tanstack/react-table"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableContext = createContext<Table<any> | null>(null)

interface TableProviderProps<TData> {
  children: ReactNode
  table: Table<TData>
}

export function TableProvider<TData = unknown>({
  children,
  table,
}: TableProviderProps<TData>) {
  return <TableContext.Provider value={table}>{children}</TableContext.Provider>
}

export function useTable<TData = unknown>() {
  const context = use(TableContext)
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider")
  }
  return context as Table<TData>
}
