import React from "react"
import { searchClusters } from "@/api/clusters"
import { type SearchParams } from "@/types"

import { clustersSearchParamsCache } from "@/lib/search-parsers/clusters-search"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"
import { ClustersTable } from "@/app/_components/clusters/clusters-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function IndexPage(props: IndexPageProps) {
  const search = clustersSearchParamsCache.parse(await props.searchParams)
  const clusters = searchClusters(search)

  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <ClustersTable dataPromise={clusters} />
      </React.Suspense>
    </Shell>
  )
}
