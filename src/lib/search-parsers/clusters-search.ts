import {
  createSearchParamsCache,
  parseAsArrayOf,
  type Options,
} from "nuqs/server"
import { z } from "zod"

import { networkParser, paginationParser } from "@/lib/search-parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const clustersSearchFilters = {
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(searchOptions),
}

export const clustersSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...clustersSearchFilters,
})

export type ClustersSearchSchema = Awaited<
  ReturnType<typeof clustersSearchParamsCache.parse>
>
