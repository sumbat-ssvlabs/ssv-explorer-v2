import { useCallback, useMemo } from "react"
import { isEmpty } from "lodash-es"
import { useQueryStates } from "nuqs"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"

export const useOperatorFiltersQuery = () => {
  const [filters, setFilters] = useQueryStates(operatorSearchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.reduce(
      (acc, [key, value]) => {
        if (Boolean(value) && !isEmpty(value)) {
          acc.count++
          acc.names.push(key)
        }
        return acc
      },
      { count: 0, names: [] as string[] }
    )
    return enabled
  }, [filters])

  const clearFilters = useCallback(() => {
    setFilters((prev) =>
      Object.fromEntries(Object.entries(prev).map(([key]) => [key, null]))
    )
  }, [setFilters])

  return { filters, setFilters, enabledFilters, clearFilters }
}
