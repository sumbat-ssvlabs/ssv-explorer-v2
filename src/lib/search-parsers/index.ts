import { createSearchParamsCache, parseAsInteger } from "nuqs/server"

import { parseAsNumberEnum } from "@/lib/utils/parsers"
import { networks } from "@/lib/utils/ssv-network-details"

export const networkParser = {
  network: parseAsNumberEnum(networks.map((n) => n.networkId)).withDefault(
    networks[0]!.networkId
  ),
}

export const networkParserCache = createSearchParamsCache(networkParser)

export const paginationParser = {
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
}
