import { useMemo } from "react"
import { useQueryState, useQueryStates } from "nuqs"

import {
  networkParser,
  operatorSearchFilters,
  paginationParser,
} from "@/lib/search-parsers/operator-search"

export const useOperatorsSearchParams = () => {
  const [network] = useQueryState("network", networkParser.chain)
  const [pagination] = useQueryStates(paginationParser)
  const [filters] = useQueryStates(operatorSearchFilters)

  const enabledFilters = useMemo(() => {
    const entries = Object.entries(filters)
    const enabled = entries.filter(([, value]) => Boolean(value))
    return {
      count: enabled.length,
      names: enabled.map(([key]) => key),
    }
  }, [filters])

  return { network, pagination, filters, enabledFilters }
}
