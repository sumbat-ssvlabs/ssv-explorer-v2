import { useCallback, useMemo } from "react"
import { isEmpty } from "lodash-es"
import { useQueryStates } from "nuqs"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"

export const useOperatorFiltersQuery = () => {
  const [filters, setFilters] = useQueryStates(operatorSearchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.filter(
      ([, value]) => Boolean(value) && !isEmpty(value)
    )
    return {
      count: enabled.length,
      names: enabled.map(([key]) => key),
    }
  }, [filters])

  const clearFilters = useCallback(() => {
    setFilters((prev) =>
      Object.fromEntries(Object.entries(prev).map(([key]) => [key, null]))
    )
  }, [setFilters])

  return { filters, setFilters, enabledFilters, clearFilters }
}
