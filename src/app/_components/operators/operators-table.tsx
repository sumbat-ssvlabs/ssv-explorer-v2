"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { type VisibilityState } from "@tanstack/react-table"
import { useLocalStorage } from "react-use"

import { type OperatorsSearchResponse } from "@/types/api"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Cmp } from "@/app/operators/cmp"

import { operatorsTableColumns } from "./operators-table-columns"

interface OperatorsTableProps {
  dataPromise: Promise<OperatorsSearchResponse>
}

export function OperatorsTable({ dataPromise: data }: OperatorsTableProps) {
  const { operators, pagination } = use(data)

  const { table } = useDataTable({
    data: operators,
    columns: operatorsTableColumns,
    pageCount: pagination.pages,
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
  })

  return (
    <>
      <TableProvider table={table}>
        <div className="flex">
          <Cmp />
          <DataTableViewOptions table={table} />
        </div>
        <DataTable table={table}></DataTable>
      </TableProvider>
    </>
  )
}
