"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { getOperator } from "@/api/operator"
import { merge, omitBy } from "lodash-es"

import type {
  Cluster,
  GetClusterResponse,
  GetClustersResponse,
  PaginatedClustersResponse,
} from "@/types/api"
import { type ClustersSearchSchema } from "@/lib/search-parsers/clusters-search"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const searchClusters = async (
  params: Partial<ClustersSearchSchema> & Pick<ClustersSearchSchema, "network">
): Promise<PaginatedClustersResponse> =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        params,
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

      const response = await api.get<GetClustersResponse>(a)
      return {
        clusters: response.data,
        pagination: {
          page: response.meta.page,
          per_page: response.meta.perPage,
          total: response.meta.totalItems,
          pages: response.meta.totalPages,
        },
      } satisfies PaginatedClustersResponse
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
      console.log("params.network:", params.network)
      const response = await api.get<GetClusterResponse>(
        endpoint(params.network, `clusters/${params.id}`)
      )
      console.log("response:", response)

      if (!response.cluster) {
        throw new Error("Cluster not found")
      }

      const operators = await Promise.all(
        response.cluster.operators.map((id) =>
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
