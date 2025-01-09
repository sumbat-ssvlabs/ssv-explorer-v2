import React from "react"
import { searchOperators } from "@/api/operator"
import { type SearchParams } from "@/types"

import { operatorsSearchParamsCache } from "@/lib/search-parsers/operator-search"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"

import { OperatorsTable } from "../_components/operators/operators-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function IndexPage(props: IndexPageProps) {
  const search = operatorsSearchParamsCache.parse(await props.searchParams)
  console.log("search:", search)

  const operators = searchOperators(search)
  const length = 4
  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        {/* <pre>{JSON.stringify(stringifyBigints(search), null, 2)}</pre> */}

        <OperatorsTable dataPromise={operators} />
      </React.Suspense>
    </Shell>
  )
}
