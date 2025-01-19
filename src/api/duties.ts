"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { omitBy } from "lodash-es"

import { type DutiesResponse } from "@/types/api/duties"
import { type DutiesSearchSchema } from "@/lib/search-parsers/duties-search"
import { stringifyBigints } from "@/lib/utils/bigint"
import { serializeSortingState } from "@/lib/utils/parsers"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchDuties = async (
  params: Partial<DutiesSearchSchema> &
    Pick<DutiesSearchSchema, "network" | "validatorPublicKey">
): Promise<DutiesResponse> =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        {
          ...params,
          sort: params.sort ? serializeSortingState(params.sort) : undefined,
        },
        (value) => value === undefined || value === null
      )

      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )

      return await api.get<DutiesResponse>(
        endpoint(
          params.network,
          `duties/${params.validatorPublicKey}`,
          `?${searchParams}`
        )
      )
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["duties"],
    }
  )()
