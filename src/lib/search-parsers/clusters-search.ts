import {
  createSearchParamsCache,
  parseAsString,
  type Options,
} from "nuqs/server"

import { networkParser, paginationParser } from "@/lib/search-parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const clustersSearchFilters = {
  search: parseAsString.withOptions({
    ...searchOptions,
    throttleMs: 500,
  }),
}

export const clustersSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...clustersSearchFilters,
})

export type ClustersSearchSchema = Awaited<
  ReturnType<typeof clustersSearchParamsCache.parse>
>
