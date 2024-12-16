import React from "react"
import { getClusters } from "@/api/clusters"
import { type SearchParams } from "@/types"

import { operatorsSearchParamsCache } from "@/lib/search-parsers/operator-search"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"
import { ClustersTable } from "@/app/_components/clusters/clusters-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function IndexPage(props: IndexPageProps) {
  const search = operatorsSearchParamsCache.parse(await props.searchParams)

  const clusters = getClusters(search)

  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <ClustersTable dataPromise={clusters} />
      </React.Suspense>
    </Shell>
  )
}
