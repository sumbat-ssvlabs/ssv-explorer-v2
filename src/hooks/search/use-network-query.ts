import { useQueryState } from "nuqs"

import { networkParser } from "@/lib/search-parsers/operator-search"

export const useNetworkQuery = () => {
  return useQueryState("network", networkParser.network)
}
