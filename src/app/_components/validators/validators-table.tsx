"use client"

import { use } from "react"
import { TableProvider } from "@/context/table-context"
import { withErrorBoundary } from "react-error-boundary"

import { type Operator, type PaginatedValidatorsResponse } from "@/types/api"
import { defaultValidatorSort } from "@/lib/search-parsers/validators-search-parsers"
import { useValidatorsSearchParams } from "@/hooks/search/use-validators-search-params"
import { useDataTable } from "@/hooks/use-data-table"
import { Text } from "@/components/ui/text"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableMenuButton } from "@/components/data-table/data-table-filters-button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { ValidatorTableFilters } from "@/app/_components/validators/filters/validator-table-filters"

import { validatorsTableColumns } from "./validators-table-columns"

interface ValidatorsTableProps {
  dataPromise: Promise<PaginatedValidatorsResponse<Operator>>
}

export const ValidatorsTable = withErrorBoundary(
  ({ dataPromise: data }: ValidatorsTableProps) => {
    const response = use(data)

    const { table } = useDataTable({
      name: "validators-table",
      data: response.data,
      columns: validatorsTableColumns,
      pageCount: response.pagination.pages,
      getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
      shallow: false,
      clearOnDefault: true,
      initialState: {
        sorting: defaultValidatorSort,
      },
      meta: {
        total: response.pagination.total,
      },
    })

    const { enabledFilters, clearFilters } = useValidatorsSearchParams()

    return (
      <>
        <TableProvider table={table}>
          <div className="flex items-center gap-2">
            <Text variant="headline4">Validators</Text>
            <div className="flex-1"></div>
            <DataTableMenuButton enabledFilters={enabledFilters} />
            <DataTableViewOptions table={table} />
          </div>
          <ValidatorTableFilters />
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
            Error Loading Validators
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
