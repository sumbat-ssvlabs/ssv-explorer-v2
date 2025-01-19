"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { merge, omitBy } from "lodash-es"

import type { Country, Operator, OperatorsSearchResponse } from "@/types/api"
import { type OperatorsSearchSchema } from "@/lib/search-parsers/operator-search"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export type OrderBy =
  | "name"
  | "id"
  | "validators_count"
  | "performance.30d"
  | "fee"
  | "mev"
export type Sort = "asc" | "desc"

export type SearchOperatorsParams = {
  search?: string
  ordering?: `${OrderBy}:${Sort}`
  type?: "verified_operator"
  has_dkg_address?: boolean
  page?: number
  perPage?: number
}

export const searchOperators = async (
  params: Partial<OperatorsSearchSchema> &
    Pick<OperatorsSearchSchema, "network">
) =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        merge({}, params, {
          sort: /* params.sort ? serializeSortingState(params.sort) : */ null,
        }),
        (value) => value === undefined || value === null
      )
      const searchParams = new URLSearchParams(
        filtered as Record<string, string>
      )
      const search = endpoint(params.network, "operators", `?${searchParams}`)
      console.log("search:", search)
      return api.get<OperatorsSearchResponse>(search)
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["operators"],
    }
  )()

export interface OperatorMetadata {
  operatorName: string
  description: string
  location: string
  setupProvider: string
  eth1NodeClient: string
  eth2NodeClient: string
  mevRelays: string
  websiteUrl: string
  twitterUrl: string
  linkedinUrl: string
  dkgAddress: string
  logo: string
  signature: string
}

export const getOperator = async (
  params: Pick<OperatorsSearchSchema, "network"> & { id: number }
) => {
  return await unstable_cache(
    async () =>
      api.get<Operator>(endpoint(params.network, "operators", params.id)),
    [params.network.toString(), params.id.toString()],
    {
      revalidate: 30,
      tags: ["operators", params.id.toString()],
    }
  )()
}

export const getOperatorLocations = async (chain: number) => {
  return await unstable_cache(
    async () => api.get<Country[]>(endpoint(chain, "operators/locations")),
    [chain.toString()],
    {
      revalidate: 60 * 60 * 24,
      tags: ["operators", "locations"],
    }
  )()
}
