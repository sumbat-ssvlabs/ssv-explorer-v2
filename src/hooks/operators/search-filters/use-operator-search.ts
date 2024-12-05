import { useCallback } from "react"
import { useTable } from "@/context/table-context"
import { useQueryState } from "nuqs"

import { type Operator } from "@/types/api"
import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"

export const useOperatorSearch = () => {
  const table = useTable<Operator>()
  const [searchParams, setSearchParams] = useQueryState(
    "search",
    operatorSearchFilters.search.withOptions({
      throttleMs: 500,
    })
  )

  // const [search, _setSearch] = useState(searchParams)

  // const updateSearch = useCallback(
  //   async (value: string) => {
  //     await setSearchParams(value)
  //     return table.resetPageIndex()
  //   },
  //   [setSearchParams, table]
  // )
  // const debouncedUpdateSearch = useDebouncedCallback(updateSearch, 500)

  // const setSearch = useCallback(
  //   (value: string) => {
  //     _setSearch(value)
  //     if (!value) {
  //       updateSearch(value)
  //     } else {
  //       debouncedUpdateSearch(value)
  //     }
  //   },
  //   [debouncedUpdateSearch, updateSearch]
  // )

  const setSearch = useCallback(
    (value: string) => {
      setSearchParams(value)
      table.resetPageIndex()
    },
    [setSearchParams, table.resetPageIndex]
  )

  return [searchParams, setSearch] as const
}
