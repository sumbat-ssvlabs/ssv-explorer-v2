import { type ExtendedSortingState } from "@/types"
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
  type Options,
} from "nuqs/server"
import { z } from "zod"

import { type Operator, type SearchValidator } from "@/types/api"
import {
  enhancementParsers,
  networkParser,
  paginationParser,
} from "@/lib/search-parsers"
import { getSortingStateParser } from "@/lib/utils/parsers"

const searchOptions: Options = {
  history: "replace",
  shallow: false,
  clearOnDefault: true,
}

export const validatorsSearchFilters = {
  search: parseAsString.withDefault("").withOptions(searchOptions),
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(searchOptions),
  clusterId: parseAsString.withDefault("").withOptions(searchOptions),
  operators: parseAsArrayOf(z.number({ coerce: true })).withOptions(
    searchOptions
  ),
}

export const defaultValidatorSort: ExtendedSortingState<
  SearchValidator<Operator>
> = [{ id: "createdAt", desc: true }]

export const validatorSearchSort = {
  ordering: getSortingStateParser<SearchValidator<Operator>>()
    .withOptions(searchOptions)
    .withDefault(defaultValidatorSort),
}

export const validatorsSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...validatorsSearchFilters,
  ...enhancementParsers,
  ...validatorSearchSort,
})
export type ValidatorsSearchSchema = Awaited<
  ReturnType<typeof validatorsSearchParamsCache.parse>
>
