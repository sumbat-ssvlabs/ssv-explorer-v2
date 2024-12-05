import { useMemo } from "react"
import { useQueryStates } from "nuqs"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"

export const useOperatorFiltersQuery = () => {
  const [filters, setFilters] = useQueryStates(operatorSearchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.filter(([, value]) => Boolean(value))
    return {
      count: enabled.length,
      names: enabled.map(([key]) => key),
    }
  }, [filters])

  return { filters, setFilters, enabledFilters }
}
