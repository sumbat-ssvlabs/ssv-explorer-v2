"use client"

import { useOperatorSearch } from "@/hooks/operators/search-filters/use-operator-search"
import { Input } from "@/components/ui/input"

export const Cmp = () => {
  const [search, setSearch] = useOperatorSearch()

  return (
    <div>
      <Input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  )
}
