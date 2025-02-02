"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type Operator, type PaginatedClustersResponse } from "@/types/api"
import { defaultClusterSort } from "@/lib/search-parsers/clusters-search-parsers"
import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { ClusterTableFilters } from "@/app/_components/clusters/filters/cluster-table-filters"

import {
  clustersTableColumns,
  clustersTableDefaultColumns,
} from "./clusters-table-columns"

interface ClustersTableProps {
  dataPromise: Promise<PaginatedClustersResponse<Operator[]>>
}

export const ClustersTable = withErrorBoundary(
  ({ dataPromise: data }: ClustersTableProps) => {
    const { data: clusters, pagination } = use(data)

    const { table } = useDataTable({
      name: "clusters",
      data: clusters,
      columns: clustersTableColumns,
      pageCount: pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.clusterId}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: defaultClusterSort,
        columnVisibility: clustersTableDefaultColumns,
      },
      meta: {
        total: pagination.total,
        defaultColumns: clustersTableDefaultColumns,
      },
    })

    const { enabledFilters } = useClustersSearchParams()

    return (
      <>
        <TableProvider table={table}>
          <div className="flex gap-2">
            <Text variant="headline4">Clusters</Text>
            <div className="flex-1"></div>
            <DataTableMenuButton enabledFilters={enabledFilters} />
            <DataTableViewOptions table={table} />
          </div>
          <ClusterTableFilters />
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
  }
)
