import { useAccountFiltersQuery } from "./use-account-filters-query"
import { useNetworkQuery } from "./use-network-query"
import { usePaginationQuery } from "./use-pagination-query"

export const useAccountsSearchParams = () => {
  const [network, setNetwork] = useNetworkQuery()
  const [pagination, setPagination] = usePaginationQuery()
  const { filters, setFilters, enabledFilters, clearFilters } =
    useAccountFiltersQuery()

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
