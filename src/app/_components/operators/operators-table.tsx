"use client"

import { use } from "react"
import { type DataTableFilterField } from "@/types"

import { type Operator, type OperatorsSearchResponse } from "@/types/api"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Cmp } from "@/app/operators/cmp"

import { TasksTableToolbarActions } from "../tasks-table-toolbar-actions"
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
      <div className="flex">
        <Cmp table={table} />
        <DataTableViewOptions table={table} />
      </div>
      <DataTable table={table}></DataTable>
    </>
  )
}
