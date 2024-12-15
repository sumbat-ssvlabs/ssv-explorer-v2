"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { isUndefined, omitBy } from "lodash-es"

import type { PaginatedValidatorsResponse } from "@/types/api"
import { type ValidatorsSearchSchema } from "@/lib/search-parsers/validators-search"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const getValidators = async (
  params: Partial<ValidatorsSearchSchema> &
    Pick<ValidatorsSearchSchema, "network">
) =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(params, isUndefined)
      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )
      return api.get<PaginatedValidatorsResponse>(
        endpoint(params.network, "validators", `?${searchParams}`)
      )
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["validators"],
    }
  )()
