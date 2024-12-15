import { useQueryState } from "nuqs"

import { networkParser } from "@/lib/search-parsers"

export const useNetworkQuery = () => {
  return useQueryState("network", networkParser.network)
}
