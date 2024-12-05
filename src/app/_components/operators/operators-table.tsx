"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { Settings2, X } from "lucide-react"

import { type OperatorsSearchResponse } from "@/types/api"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"
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

  const { setFilters, enabledFilters, clearFilters } =
    useOperatorsSearchParams()

  return (
    <>
      <TableProvider table={table}>
        <div className="flex gap-2">
          <Cmp />
          <div className="flex-1"></div>
          <Button
            aria-label="Toggle columns"
            variant="outline"
            role="combobox"
            size="sm"
            className="ml-auto flex h-8"
          >
            <Settings2 className="mr-2 size-4" />
            Filters{" "}
            {enabledFilters.count > 0 && (
              <Tooltip
                asChild
                content={`Enabled filters: ${enabledFilters.names.join(", ")}`}
              >
                <Badge size="xs" variant="info">
                  {enabledFilters.count}
                </Badge>
              </Tooltip>
            )}
          </Button>
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
        <DataTable table={table}></DataTable>
      </TableProvider>
    </>
  )
}
