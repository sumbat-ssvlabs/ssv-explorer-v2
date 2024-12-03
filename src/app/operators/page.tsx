import React from "react"
import { searchOperators } from "@/api/operator"
import { type SearchParams } from "@/types"

import { stringifyBigints } from "@/lib/utils/bigint"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"

import { OperatorsTable } from "../_components/operators/operators-table"
import { operatorsSearchParamsCache } from "../_lib/validations"
import { Cmp } from "./cmp"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function IndexPage(props: IndexPageProps) {
  const search = operatorsSearchParamsCache.parse(await props.searchParams)

  const operators = searchOperators(search)

  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <h1>Operators {search.chain}</h1>
        {/* <pre>{JSON.stringify(stringifyBigints(search), null, 2)}</pre> */}
        <OperatorsTable dataPromise={operators} />
      </React.Suspense>
    </Shell>
  )
}
