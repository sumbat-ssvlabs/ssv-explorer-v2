import Link from "next/link"
import { type SearchParams } from "@/types"

import { getValidFilters } from "@/lib/utils/data-table"
import { Button } from "@/components/ui/button"
import { Shell } from "@/components/shell"

import {
  getTaskPriorityCounts,
  getTasks,
  getTaskStatusCounts,
} from "./_lib/queries"
import { searchParamsCache } from "./_lib/validations"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function IndexPage(props: IndexPageProps) {
  const searchParams = await props.searchParams
  const search = searchParamsCache.parse(searchParams)

  const validFilters = getValidFilters(search.filters)
  console.log(validFilters)

  const promises = Promise.all([
    getTasks({
      ...search,
      filters: validFilters,
    }),
    getTaskStatusCounts(),
    getTaskPriorityCounts(),
  ])

  return (
    <Shell className="gap-2">
      <div>
        Nothing to see here <b>Ravid</b>
      </div>
      <Button asChild className="w-fit" variant="secondary">
        <Link href="/operators" className="text-blue-500">
          Go to operators
        </Link>
      </Button>
    </Shell>
  )
}
