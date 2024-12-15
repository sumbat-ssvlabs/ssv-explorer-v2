import type { Prettify } from "@/types/ts-utils"

import type { Operator } from "./operator"
import type { WithPagination } from "./paginations"

export type SolidityCluster = {
  active: boolean
  balance: bigint
  index: bigint
  networkFeeIndex: bigint
  validatorCount: number
}

export type Cluster<
  T extends { operators: (Operator | number)[] } = { operators: Operator[] },
> = Prettify<
  {
    id: number
    clusterId: string
    network: string
    version: string
    ownerAddress: string
    validatorCount: number
    networkFeeIndex: string
    index: string
    balance: string
    active: boolean
    isLiquidated: boolean
    blockNumber: number
    createdAt: string
    updatedAt: string
  } & T
>

export type GetPaginatedClustersResponse = WithPagination<{
  type: string
  clusters: Cluster[]
}>

export interface GetClusterResponse {
  type: string
  cluster: Cluster<{ operators: number[] }> | null
}
