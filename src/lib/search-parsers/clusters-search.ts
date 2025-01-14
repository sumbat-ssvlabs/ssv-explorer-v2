import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  type Options,
} from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { networkParser, paginationParser } from "@/lib/search-parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const clustersSearchFilters = {
  clusterId: parseAsArrayOf(z.string()).withOptions(searchOptions),
  ownerAddress: parseAsArrayOf(z.string().refine(isAddress)).withOptions(
    searchOptions
  ),
  status: parseAsBoolean.withOptions(searchOptions),
  isLiquidated: parseAsBoolean.withOptions(searchOptions),
  operators: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    searchOptions
  ),
}

export const clustersSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...clustersSearchFilters,
})

export type ClustersSearchSchema = Awaited<
  ReturnType<typeof clustersSearchParamsCache.parse>
>
