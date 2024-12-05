import { parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { parseAsNumberEnum, parseAsTuple } from "../utils/parsers"
import { networks } from "../utils/ssv-network-details"

console.log("networks:", networks)

export const networkParser = {
  chain: parseAsNumberEnum(networks.map((n) => n.networkId)).withDefault(
    networks[0]!.networkId
  ),
}

export const paginationParser = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
}

export const operatorSearchFilters = {
  search: parseAsString.withDefault(""),
  id: parseAsArrayOf(z.number({ coerce: true })),
  name: parseAsArrayOf(z.string()),
  owner: parseAsArrayOf(z.string().refine(isAddress)),
  location: parseAsArrayOf(z.string()),
  eth1: parseAsArrayOf(z.string()),
  eth2: parseAsArrayOf(z.string()),
  mev: parseAsArrayOf(z.string()),
  fee: parseAsTuple(
    [z.bigint({ coerce: true }), z.bigint({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  ),
  validators: parseAsArrayOf(z.tuple([z.string(), z.string()])),
  performance_24h: parseAsArrayOf(z.tuple([z.string(), z.string()])),
  performance_30d: parseAsArrayOf(z.tuple([z.string(), z.string()])),
}
