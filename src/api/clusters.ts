"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { getOperator } from "@/api/operator"
import { merge, omitBy } from "lodash-es"

import type {
  Cluster,
  GetClusterResponse,
  PaginatedClustersResponse,
} from "@/types/api"
import { type ClustersSearchSchema } from "@/lib/search-parsers/clusters-search"
import { stringifyBigints } from "@/lib/utils/bigint"
import { serializeSortingState } from "@/lib/utils/parsers"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchClusters = async (
  params: Partial<ClustersSearchSchema> & Pick<ClustersSearchSchema, "network">
): Promise<PaginatedClustersResponse> =>
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
      const a = endpoint(
        params.network,
        "clusters/explorer",
        `?${searchParams}`
      )
      console.log("endpoint:", a)

      return await api.get<PaginatedClustersResponse>(a)
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["clusters"],
    }
  )()

export const getCluster = async (
  params: Pick<ClustersSearchSchema, "network"> & { id: string }
): Promise<Cluster> =>
  await unstable_cache(
    async () => {
      const response = await api.get<GetClusterResponse>(
        endpoint(params.network, `clusters/${params.id}`)
      )
      if (!response.cluster) {
        throw new Error("Cluster not found")
      }

      const operators = await Promise.all(
        response.cluster.operators.map(({ id }) =>
          getOperator({ id, network: params.network })
        )
      )

      return merge({}, response.cluster, {
        operators,
      })
    },
    [JSON.stringify(stringifyBigints(params))],
    {
      revalidate: 30,
      tags: ["clusters"],
    }
  )()
