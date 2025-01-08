import React from "react"
import { getValidators } from "@/api/validators"
import { type SearchParams } from "@/types"

import { validatorsSearchParamsCache } from "@/lib/search-parsers/validators-search"
import { Skeleton } from "@/components/ui/skeleton"
import { Shell } from "@/components/shell"
import { ValidatorsTable } from "@/app/_components/validators/validators-table"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function IndexPage(props: IndexPageProps) {
  const search = validatorsSearchParamsCache.parse(await props.searchParams)
  const validators = getValidators(search)

  return (
    <Shell className="gap-2">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        {/* <pre>{JSON.stringify(stringifyBigints(search), null, 2)}</pre> */}
        <ValidatorsTable dataPromise={validators} />
      </React.Suspense>
    </Shell>
  )
}
