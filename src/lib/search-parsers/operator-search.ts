import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  type Options,
} from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { parseAsNumberEnum, parseAsTuple } from "../utils/parsers"
import { networks } from "../utils/ssv-network-details"

console.log("networks:", networks)

export const networkParser = {
  network: parseAsNumberEnum(networks.map((n) => n.networkId)).withDefault(
    networks[0]!.networkId
  ),
}

export const paginationParser = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
}

const searchOptions: Options = {
  history: "replace",
  shallow: false,
}

export const operatorSearchFilters = {
  search: parseAsString.withDefault("").withOptions(searchOptions),
  id: parseAsArrayOf(z.number({ coerce: true })).withOptions(searchOptions),
  name: parseAsArrayOf(z.string()).withOptions(searchOptions),
  owner: parseAsArrayOf(z.string().refine(isAddress)).withOptions(
    searchOptions
  ),
  location: parseAsArrayOf(z.string()).withOptions(searchOptions),
  eth1: parseAsArrayOf(z.string()).withOptions(searchOptions),
  eth2: parseAsArrayOf(z.string()).withOptions(searchOptions),
  mev: parseAsArrayOf(z.string()).withOptions(searchOptions),
  fee: parseAsTuple(
    [z.bigint({ coerce: true }), z.bigint({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  ).withOptions(searchOptions),
  validators: parseAsArrayOf(z.tuple([z.string(), z.string()])).withOptions(
    searchOptions
  ),
  status: parseAsStringEnum([
    "active",
    "inactive",
    "no validators",
  ]).withOptions(searchOptions),
  visibility: parseAsStringEnum(["all", "private", "public"]).withOptions(
    searchOptions
  ),
  performance_24h: parseAsArrayOf(
    z.tuple([z.string(), z.string()])
  ).withOptions(searchOptions),
  performance_30d: parseAsArrayOf(
    z.tuple([z.string(), z.string()])
  ).withOptions(searchOptions),
}

export const operatorsSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...operatorSearchFilters,
})

export type OperatorsSearchSchema = Awaited<
  ReturnType<typeof operatorsSearchParamsCache.parse>
>
