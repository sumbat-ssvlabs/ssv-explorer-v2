import type { Operator } from "./operator"
import type { WithPagination } from "./paginations"

export type SolidityCluster = {
  active: boolean
  balance: bigint
  index: bigint
  networkFeeIndex: bigint
  validatorCount: number
}

export type Cluster<T extends (Operator | number)[] = Operator[]> = {
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
  operators: T
}

export type PaginatedClustersResponse = WithPagination<{
  type: string
  clusters: Cluster[]
}>
export type FilteredClustersResponse = {
  type: string
  clusters: Cluster[]
  filter: {
    from: number
    limit: number
  }
}

export interface GetClusterResponse {
  type: "cluster"
  cluster: Cluster<number[]> | null
}
export interface GetClusterWithOperatorsDataResponse {
  type: "cluster"
  cluster: Cluster<Operator[]> | null
}
