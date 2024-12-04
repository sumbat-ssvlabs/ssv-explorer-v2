import { parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import { isAddress } from "viem"
import { z } from "zod"

import { parseAsNumberEnum, parseAsTuple } from "../utils/parsers"
import { networks } from "../utils/ssv-network-details"

console.log("networks:", networks)

export const operatorSearchParsers = {
  chain: parseAsNumberEnum(networks.map((n) => n.networkId)).withDefault(
    networks[0]!.networkId
  ),
  search: parseAsString.withDefault(""),
  id: parseAsArrayOf(z.number({ coerce: true })).withDefault([]),
  name: parseAsArrayOf(z.string()).withDefault([]),
  owner: parseAsArrayOf(z.string().refine(isAddress)).withDefault([]),
  location: parseAsArrayOf(z.string()).withDefault([]),
  eth1: parseAsArrayOf(z.string()).withDefault([]),
  eth2: parseAsArrayOf(z.string()).withDefault([]),
  mev: parseAsArrayOf(z.string()).withDefault([]),
  fee: parseAsTuple(
    [z.bigint({ coerce: true }), z.bigint({ coerce: true })],
    (values) => values.sort((a, b) => +a - +b)
  ).withDefault([-1n, -1n]),
  validators: parseAsArrayOf(z.tuple([z.string(), z.string()])).withDefault([]),
  performance_24h: parseAsArrayOf(
    z.tuple([z.string(), z.string()])
  ).withDefault([]),
  performance_30d: parseAsArrayOf(
    z.tuple([z.string(), z.string()])
  ).withDefault([]),
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
}
