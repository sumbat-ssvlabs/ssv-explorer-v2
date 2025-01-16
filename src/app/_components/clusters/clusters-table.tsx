"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { X } from "lucide-react"
import { withErrorBoundary } from "react-error-boundary"

import { type PaginatedClustersResponse } from "@/types/api"
import { defaultClusterSort } from "@/lib/search-parsers/clusters-search"
import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Filters } from "@/app/_components/clusters/filters/filters"

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

export const ClustersTable = withErrorBoundary(
  ({ dataPromise: data }: ClustersTableProps) => {
    const { data: clusters, pagination } = use(data)

    const { table } = useDataTable({
      data: clusters,
      columns: clustersTableColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.clusterId}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: defaultClusterSort,
      },
      meta: {
        total: pagination.total,
      },
    })

    const { enabledFilters, clearFilters } = useClustersSearchParams()

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
  },
  {
    fallbackRender: ({ error }) => {
      return (
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-semibold tracking-tight">
            Error Loading Clusters
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
    onError(error, info) {
      // Do something with the error
      // E.g. log to an error logging client here
    },
  }
)
