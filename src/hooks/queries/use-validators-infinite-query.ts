import { getValidators } from "@/api/validators"
import { useInfiniteQuery } from "@tanstack/react-query"

import { type ValidatorsSearchSchema } from "@/lib/search-parsers/validators-search"
import { useNetworkQuery } from "@/hooks/search/use-network-query"

export const useValidatorsInfiniteQuery = (
  params: Pick<ValidatorsSearchSchema, "perPage" | "search">
) => {
  const { chain } = useNetworkQuery()

  return useInfiniteQuery({
    queryKey: ["validators", params.search],
    queryFn: ({ pageParam = 1 }) =>
      getValidators({
        network: chain.chainId,
        page: pageParam ?? 1,
        perPage: params.perPage,
        search: params.search,
      }),
    select: (data) => data.pages.flatMap((page) => page.validators),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination
      return page < pages ? page + 1 : undefined
    },
    enabled: !!params.search,
  })
}
