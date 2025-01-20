import React from "react"
import { searchOperators } from "@/api/operator"
import { searchValidators } from "@/api/validators"
import { type SearchParams } from "@/types"

import { overviewParserCache } from "@/lib/search-parsers"
import { numberFormatter } from "@/lib/utils/number"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Stat } from "@/components/ui/stat"
import { Span, Text } from "@/components/ui/text"
import { GlobalSearch } from "@/components/global-search/global-search"
import { Shell } from "@/components/shell"
import { OperatorsTablePreview } from "@/app/_components/operators/operators-table-peview"
import { ValidatorsTablePreview } from "@/app/_components/validators/validators-table-preview"

interface IndexPageProps {
  searchParams: Promise<SearchParams>
}

export default async function IndexPage(props: IndexPageProps) {
  const search = await overviewParserCache.parse(props.searchParams)
  const operators = await searchOperators({
    ...search,
    ordering: [{ id: "performance", desc: false }],
  }).catch((error) => {
    console.error("Error fetching operators:", error)
    return null
  })
  const validators = await searchValidators({
    ...search,
    ordering: [{ id: "createdAt", desc: false }],
  }).catch((error) => {
    console.error("Error fetching validators:", error)
    return null
  })

  if (!operators || !validators) {
    return <div>Error fetching operators or validators</div>
  }
  console.log("validators:", validators.pagination)

  return (
    <Shell className="gap-6">
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <Text variant="headline4">Discover the SSV Network</Text>
        <GlobalSearch size="lg" />
        <Card className="flex flex-row">
          <Stat
            className="flex-1"
            title="Validators"
            tooltip="Ravid im sorry bro"
            content={numberFormatter.format(validators.pagination.total)}
            subContent={
              <Span variant="caption-medium" className="text-gray-500">
                $1,234,567
              </Span>
            }
          />
          <Stat
            className="flex-1"
            title="Operators"
            tooltip="They didnt gave me a tooltip content for this one"
            content={numberFormatter.format(operators.pagination.total)}
            subContent={
              <Span variant="caption-medium" className="text-gray-500">
                $1,234,567
              </Span>
            }
          />
          <Stat
            className="flex-1"
            title="ETH Staked"
            tooltip="Tell them to give me a tooltip content for this one"
            content="2,118,656 ETH"
            subContent={
              <Span variant="caption-medium" className="text-gray-500">
                $1,234,567
              </Span>
            }
          />
        </Card>
        <div className="flex max-w-full gap-6 overflow-hidden">
          <OperatorsTablePreview dataPromise={Promise.resolve(operators)} />
          <ValidatorsTablePreview dataPromise={Promise.resolve(validators)} />
        </div>
      </React.Suspense>
    </Shell>
  )
}
