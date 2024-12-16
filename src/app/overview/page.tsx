import React from "react"
import { type SearchParams } from "@/types"

import { Skeleton } from "@/components/ui/skeleton"
import { Text } from "@/components/ui/text"
import { Shell } from "@/components/shell"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function IndexPage(props: IndexPageProps) {
  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        {/* <pre>{JSON.stringify(stringifyBigints(search), null, 2)}</pre> */}
        <Text variant="headline4">Welcome to the SSV Explorer ☝️</Text>
        <Text>
          This dashboard provides a comprehensive overview of the SSV Network,
          including operator performance, cluster statistics, and network
          activity.
        </Text>
      </React.Suspense>
    </Shell>
  )
}
