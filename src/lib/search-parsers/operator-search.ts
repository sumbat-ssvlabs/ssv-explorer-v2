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
    [z.number({ coerce: true }), z.number({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 100])
    .withOptions({
      ...searchOptions,
      throttleMs: 500,
    }),
  validators: parseAsTuple(
    [z.number({ coerce: true }), z.number({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 1000])
    .withOptions({
      ...searchOptions,
      throttleMs: 500,
    }),
  managedEth: parseAsTuple(
    [z.number({ coerce: true }), z.number({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 25000])
    .withOptions({
      ...searchOptions,
      throttleMs: 500,
    }),
  status: parseAsArrayOf(
    z.enum(["active", "inactive", "no validators", "invalid"])
  ).withOptions(searchOptions),
  visibility: parseAsStringEnum(["all", "private", "public"]).withOptions(
    searchOptions
  ),
  verified: parseAsStringEnum(["all", "verified", "unverified"]).withOptions(
    searchOptions
  ),
  performance_24h: parseAsTuple(
    [z.number({ coerce: true }), z.number({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 100])
    .withOptions({
      ...searchOptions,
      throttleMs: 500,
    }),
  performance_30d: parseAsTuple(
    [z.number({ coerce: true }), z.number({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  )
    .withDefault([0, 100])
    .withOptions({
      ...searchOptions,
      throttleMs: 500,
    }),
}

export const operatorsSearchParamsCache = createSearchParamsCache({
  ...networkParser,
  ...paginationParser,
  ...operatorSearchFilters,
})

export type OperatorsSearchSchema = Awaited<
  ReturnType<typeof operatorsSearchParamsCache.parse>
>
