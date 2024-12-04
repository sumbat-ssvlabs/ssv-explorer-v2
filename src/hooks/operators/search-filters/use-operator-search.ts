import { useCallback, useState } from "react"
import { useTable } from "@/context/table-context"
import { parseAsString, useQueryState } from "nuqs"

import { type Operator } from "@/types/api"
import { useDebouncedCallback } from "@/hooks/use-debounced-callback"

export const useOperatorSearch = () => {
  const table = useTable<Operator>()
  const [searchParams, setSearchParams] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({
      history: "replace",
      shallow: false,
      throttleMs: 10,
    })
  )

  const [search, _setSearch] = useState(searchParams)

  const updateSearch = useCallback(
    async (value: string) => {
      await setSearchParams(value)
      return table.resetPageIndex()
    },
    [setSearchParams, table]
  )
  const debouncedUpdateSearch = useDebouncedCallback(updateSearch, 500)

  const setSearch = useCallback(
    (value: string) => {
      _setSearch(value)
      if (!value) {
        updateSearch(value)
      } else {
        debouncedUpdateSearch(value)
      }
    },
    [debouncedUpdateSearch, updateSearch]
  )

  return [search, setSearch] as const
}
