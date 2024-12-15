import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  type Options,
} from "nuqs/server"
import { z } from "zod"

import { networkParser } from "@/lib/search-parsers"

export const paginationParser = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
}

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const validatorsSearchFilters = {
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
