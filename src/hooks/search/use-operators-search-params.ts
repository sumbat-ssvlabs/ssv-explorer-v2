import { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { parseSearchParams } from "@/lib/search-parsers"
import { operatorSearchParsers } from "@/lib/search-parsers/operator-search"

export const useOperatorsSearchParams = () => {
  const searchParams = useSearchParams()
  return useMemo(
    () => parseSearchParams(searchParams, operatorSearchParsers),
    [searchParams]
  )
}
