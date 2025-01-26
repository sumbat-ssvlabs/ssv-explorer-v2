"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { merge, omitBy } from "lodash-es"

import type { PaginatedValidatorsResponse, Validator } from "@/types/api"
import { type ValidatorsSearchSchema } from "@/lib/search-parsers/validators-search-parsers"
import { stringifyBigints } from "@/lib/utils/bigint"
import { serializeSortingState } from "@/lib/utils/parsers"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchValidators = async (
  params: Partial<ValidatorsSearchSchema> &
    Pick<ValidatorsSearchSchema, "network">
) =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        merge({
          ...params,
          ordering: params.ordering
            ? serializeSortingState(params.ordering)
            : undefined,
        }),
        (value) => value === undefined || value === null
      )

      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )
      const url = endpoint(
        params.network,
        "validators/explorer",
        `?${searchParams}`
      )
      const response = await api.get<PaginatedValidatorsResponse>(url)
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
      const rest = endpoint(params.network, `validators/${params.publicKey}`)
      console.log("rest:", rest)
      return api.get<Validator>(rest)
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["validator"],
    }
  )()
