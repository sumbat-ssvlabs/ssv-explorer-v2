import { useQueryStates } from "nuqs"

import { paginationParser } from "@/lib/search-parsers/operator-search"

export const usePaginationQuery = () => {
  return useQueryStates(paginationParser)
}
