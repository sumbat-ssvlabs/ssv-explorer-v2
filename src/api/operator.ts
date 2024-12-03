import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { isUndefined, omitBy } from "lodash-es"

import type {
  Country,
  GetOperatorByPublicKeyResponse,
  Operator,
  OperatorsSearchResponse,
  PaginatedValidatorsResponse,
} from "@/types/api"
import type { OperatorDKGHealthResponse } from "@/types/operators"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"
import { type OperatorsSearchSchema } from "@/app/_lib/validations"

export const getOperator = (id: number | string | bigint) => {
  return api.get<Operator>(endpoint("operators", id.toString()))
}

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

export const searchOperators = async (params: OperatorsSearchSchema) =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(params, isUndefined)
      const searchParams = new URLSearchParams(
        filtered as Record<string, string>
      )
      return api.get<OperatorsSearchResponse>(
        endpoint(params.chain, "operators", `?${searchParams}`)
      )
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["operators"],
    }
  )()

type GetAccountOperatorsParams = {
  address: string
  page?: number
  perPage?: number
}

export const getPaginatedAccountOperators = ({
  address,
  page = 1,
  perPage = 10,
}: GetAccountOperatorsParams) => {
  return api
    .get<OperatorsSearchResponse>(
      endpoint(
        "operators/owned_by",
        address,
        `?${new URLSearchParams({
          page: page.toString(),
          perPage: perPage.toString(),
          withFee: "true",
          ordering: "id:asc",
        })}`
      )
    )
    .then((response) => ({
      ...response,
      pagination: {
        ...response.pagination,
        page: response.pagination.page || 1,
        pages: response.pagination.pages || 1,
      },
    }))
}

type GetOperatorValidators = {
  operatorId: string
  page?: number
  perPage?: number
}

export const getPaginatedOperatorValidators = ({
  operatorId,
  page = 1,
  perPage = 10,
}: GetOperatorValidators) => {
  return api
    .get<PaginatedValidatorsResponse>(
      endpoint(
        "validators/in_operator",
        operatorId,
        `?${new URLSearchParams({
          page: page.toString(),
          perPage: perPage.toString(),
        })}`
      )
    )
    .then((response) => ({
      ...response,
      pagination: {
        ...response.pagination,
        page: response.pagination.page || 1,
        pages: response.pagination.pages || 1,
      },
    }))
}

export const getOperatorLocations = () => {
  return api.get<Country[]>(endpoint("operators/locations"))
}

export const getOperatorNodes = (layer: number) => {
  return api.get<string[]>(endpoint("operators/nodes", layer))
}

export const checkOperatorDKGHealth = (
  dkgAddresses: { id: string; address: string }[]
) => {
  return api.post<OperatorDKGHealthResponse[]>(
    endpoint("operators/dkg_health_check"),
    {
      dkgAddresses,
    }
  )
}

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

export const setOperatorMetadata = (
  operatorId: string,
  metadata: OperatorMetadata
) => {
  return api.put(endpoint("operators", operatorId, "metadata"), metadata)
}

export const getOperatorByPublicKey = (publicKey: string) => {
  return api.get<GetOperatorByPublicKeyResponse>(
    endpoint("operators/public_key", publicKey)
  )
}
