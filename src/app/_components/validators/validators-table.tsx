"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { X } from "lucide-react"

import { type Operator, type PaginatedValidatorsResponse } from "@/types/api"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Filters } from "@/app/_components/validators/filters/filters"

import { validatorsTableColumns } from "./validators-table-columns"

interface ValidatorsTableProps {
  dataPromise: Promise<PaginatedValidatorsResponse<Operator>>
  operatorId?: number
}

export function ValidatorsTable({ dataPromise: data }: ValidatorsTableProps) {
  const response = use(data)

  const { table } = useDataTable({
    data: response.data,
    columns: validatorsTableColumns,
    pageCount: response.pagination.pages,
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    shallow: false,
    clearOnDefault: true,
    meta: {
      total: response.pagination.total,
    },
  })

  const { enabledFilters, clearFilters } = useOperatorsSearchParams()

  return (
    <>
      <TableProvider table={table}>
        <div className="flex gap-2">
          <Text variant="headline4">Validators</Text>
          <div className="flex-1"></div>
          <DataTableMenuButton enabledFilters={enabledFilters} />
          {enabledFilters.count > 0 && (
            <Button
              aria-label="Toggle columns"
              variant="outline"
              role="combobox"
              size="sm"
              className="ml-auto flex h-8"
              onClick={clearFilters}
            >
              <X className="size-4" />
              Clear
            </Button>
          )}
          <DataTableViewOptions table={table} />
        </div>
        <Filters />
        <DataTable table={table} />
      </TableProvider>
    </>
  )
}
