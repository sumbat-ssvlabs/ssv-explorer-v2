"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { X } from "lucide-react"

import { type PaginatedClustersResponse } from "@/types/api"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Filters } from "@/components/operators/table/filters/filters"

import { clustersTableColumns } from "./clusters-table-columns"

interface ClustersTableProps {
  dataPromise: Promise<PaginatedClustersResponse>
}

export const defaultColumns = {
  name: true,
  eth1_node_client: false,
  fee: true,
  location: false,
  id: true,
  owner_address: false,
  eth2_node_client: false,
  clusters_count: false,
  performance_24h: false,
  performance_30d: true,
  mev_relays: true,
  status: true,
}

export function ClustersTable({ dataPromise: data }: ClustersTableProps) {
  const { clusters, pagination } = use(data)

  const { table } = useDataTable({
    data: clusters,
    columns: clustersTableColumns,
    pageCount: pagination.pages,
    getRowId: (originalRow, index) => `${originalRow.clusterId}-${index}`,
    shallow: false,
    clearOnDefault: true,
    meta: {
      total: pagination.total,
    },
  })

  const { enabledFilters, clearFilters } = useOperatorsSearchParams()

  return (
    <>
      <TableProvider table={table}>
        <div className="flex gap-2">
          <Text variant="headline4">Clusters</Text>
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
