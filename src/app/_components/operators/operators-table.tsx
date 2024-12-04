"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"

import { type OperatorsSearchResponse } from "@/types/api"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Cmp } from "@/app/operators/cmp"

import { operatorsTableColumns } from "./operators-table-columns"

interface OperatorsTableProps {
  dataPromise: Promise<OperatorsSearchResponse>
}

export const defaultColumns = {
  name: true,
  eth1_node_client: false,
  fee: true,
  location: false,
  id: true,
  owner_address: false,
  eth2_node_client: false,
  validators_count: false,
  performance_24h: false,
  performance_30d: true,
  mev_relays: true,
  status: true,
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
