"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { merge, omitBy } from "lodash-es"

import type { PaginatedValidatorsResponse, SearchValidator } from "@/types/api"
import { type ValidatorsSearchSchema } from "@/lib/search-parsers/validators-search"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchValidators = async (
  params: Partial<ValidatorsSearchSchema> &
    Pick<ValidatorsSearchSchema, "network">
) =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        merge({}, params),
        (value) => value === undefined || value === null
      )
      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )
      const response = await api.get<PaginatedValidatorsResponse>(
        endpoint(params.network, "validators", `?${searchParams}`)
      )
      return response
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["validators"],
    }
  )()

export const getValidator = async (
  params: Pick<ValidatorsSearchSchema, "network"> & {
    publicKey: string
  }
) =>
  await unstable_cache(
    async () => {
      return api.get<SearchValidator>(
        endpoint(params.network, `validators/${params.publicKey}`)
      )
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["validator"],
    }
  )()
