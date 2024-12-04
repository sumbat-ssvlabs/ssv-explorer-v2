"use client"

import { stringifyBigints } from "@/lib/utils/bigint"
import { useOperatorSearch } from "@/hooks/operators/search-filters/use-operator-search"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Input } from "@/components/ui/input"

export const Cmp = () => {
  const [search, setSearch] = useOperatorSearch()
  const operatorsSearchParams = useOperatorsSearchParams()
  console.log(
    "operatorsSearchParams:",
    JSON.stringify(stringifyBigints(operatorsSearchParams), null, 2)
  )

  return (
    <div>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}
