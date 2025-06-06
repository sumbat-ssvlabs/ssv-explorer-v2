import { isNumber, merge } from "lodash-es"
import type { Address } from "viem"
import { encodePacked, keccak256 } from "viem"

import type {
  Cluster,
  Operator,
  SearchValidator,
  SolidityCluster,
} from "@/types/api"
import { sortNumbers } from "@/lib/utils/number"
import { add0x } from "@/lib/utils/strings"

export const createClusterHash = (
  account: Address,
  operators: readonly (Pick<Operator, "id"> | number)[]
) =>
  keccak256(
    encodePacked(
      ["address", "uint256[]"],
      [
        account,
        sortNumbers(
          operators.map((o) => {
            return BigInt(isNumber(o) ? o : o.id)
          })
        ),
      ]
    )
  )

export const getDefaultClusterData = (
  cluster: Partial<SolidityCluster> = {}
): SolidityCluster =>
  merge(
    {
      validatorCount: 0,
      networkFeeIndex: 0n,
      index: 0n,
      balance: 0n,
      active: true,
    },
    cluster
  )

export const formatClusterData = (cluster?: Partial<Cluster> | null) => ({
  active: cluster?.active ?? true,
  balance: BigInt(cluster?.balance ?? 0),
  index: BigInt(cluster?.index ?? 0),
  networkFeeIndex: BigInt(cluster?.networkFeeIndex ?? 0),
  validatorCount: cluster?.validatorCount ?? 0,
})

export const filterOutRemovedValidators = (
  fetchedValidators: SearchValidator[],
  removedOptimisticValidatorsPKs: string[]
) =>
  fetchedValidators.filter(
    (validator) =>
      !removedOptimisticValidatorsPKs.some(
        (pk) =>
          add0x(pk).toLowerCase() === add0x(validator.public_key).toLowerCase()
      )
  )
