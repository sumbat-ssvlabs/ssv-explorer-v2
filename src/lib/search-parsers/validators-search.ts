import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
  type Options,
} from "nuqs/server"
import { z } from "zod"

import { networkParser, paginationParser } from "@/lib/search-parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const validatorsSearchFilters = {
  search: parseAsString.withDefault("").withOptions(searchOptions),
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(searchOptions),
}

export const validatorsSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...validatorsSearchFilters,
})

export type ValidatorsSearchSchema = Awaited<
  ReturnType<typeof validatorsSearchParamsCache.parse>
>
