"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type OperatorsSearchResponse } from "@/types/api"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { OperatorTableFilters } from "@/app/_components/operators/filters/operator-table-filters"

import {
  operatorsTableColumns,
  operatorsTableDefaultColumns,
} from "./operators-table-columns"

interface OperatorsTableProps {
  dataPromise: Promise<OperatorsSearchResponse>
}

export const OperatorsTable = withErrorBoundary(
  ({ dataPromise: data }: OperatorsTableProps) => {
    const { data: operators, pagination } = use(data)

    const { table } = useDataTable({
      name: "operators-table",
      data: operators,
      columns: operatorsTableColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: [{ id: "id", desc: false }],
        columnVisibility: operatorsTableDefaultColumns,
      },
      meta: {
        total: pagination.total,
        defaultColumns: operatorsTableDefaultColumns,
      },
    })

    const { enabledFilters } = useOperatorsSearchParams()

    return (
      <>
        <TableProvider table={table}>
          <div className="flex gap-2">
            <Text variant="headline4">Operators</Text>
            <div className="flex-1"></div>
            <DataTableMenuButton enabledFilters={enabledFilters} />
            <DataTableViewOptions table={table} />
          </div>
          <OperatorTableFilters />
          <DataTable table={table} />
        </TableProvider>
      </>
    )
  },
  {
    fallbackRender: ({ error }) => {
      return (
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-semibold tracking-tight">
            Error Loading Operators
          </h4>
          <div className="relative w-full rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-destructive">
            <p className="text-sm [&_p]:leading-relaxed">
              {(error as Error).message}
            </p>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        </div>
      )
    },
  }
)
