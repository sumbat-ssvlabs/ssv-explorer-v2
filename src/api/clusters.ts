"use server"

import { endpoint } from "@/api"
import { api } from "@/api/api-client"
import { getOperator } from "@/api/operator"
import { isUndefined, merge, omitBy } from "lodash-es"

import type {
  Cluster,
  FilteredClustersResponse,
  GetClusterResponse,
  PaginatedClustersResponse,
} from "@/types/api"
import { type ClustersSearchSchema } from "@/lib/search-parsers/clusters-search"
import { stringifyBigints } from "@/lib/utils/bigint"
import { unstable_cache } from "@/lib/utils/unstable-cache"

export const getClusters = async (
  params: Partial<ClustersSearchSchema> & Pick<ClustersSearchSchema, "network">
): Promise<PaginatedClustersResponse> =>
  await unstable_cache(
    async () => {
      const filtered = omitBy(
        {
          ...params,
          from: (params.page ?? 0) * (params.perPage ?? 10),
          limit: params.perPage ?? 10,
          operatorDetails: "operatorDetails",
        },
        isUndefined
      )

      const searchParams = new URLSearchParams(
        filtered as unknown as Record<string, string>
      )
      const response = await api.get<FilteredClustersResponse>(
        endpoint(params.network, "clusters", `?${searchParams}`)
      )
      return {
        type: response.type,
        clusters: response.clusters,
        pagination: {
          page: params.page ?? 1,
          per_page: params.perPage ?? 10,
          total: 100 * (params.perPage ?? 10),
          pages: 100,
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
