import { useNetworkQuery } from "./use-network-query"
import { useOperatorFiltersQuery } from "./use-operator-filters-query"
import { usePaginationQuery } from "./use-pagination-query"

export const useOperatorsSearchParams = () => {
  const [network, setNetwork] = useNetworkQuery()
  const [pagination, setPagination] = usePaginationQuery()
  const { filters, setFilters, enabledFilters, clearFilters } =
    useOperatorFiltersQuery()

  return {
    network,
    setNetwork,
    pagination,
    setPagination,
    filters,
    setFilters,
    enabledFilters,
    clearFilters,
  }
}
