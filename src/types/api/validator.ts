import type { Operator } from "./operator"
import { type WithInfinitePagination } from "./paginations"

export interface Validator {
  public_key: string
  cluster: string
  owner_address: string
  status: string
  is_valid: boolean
  is_deleted: boolean
  is_public_key_valid: boolean
  is_shares_valid: boolean
  is_operators_valid: boolean
  operators: Operator[]
  version: string
  network: string
  updated_at?: string
}

export interface SearchValidator {
  id: number
  public_key: string
  cluster: string
  owner_address: string
  status: string
  is_valid: boolean
  is_deleted: boolean
  is_public_key_valid: boolean
  is_shares_valid: boolean
  is_operators_valid: boolean
  operators: Operator[]
  validator_info: {
    index: number
    status: string
    activation_epoch: number
  }
  version: string
  network: string
}

export type PaginatedValidatorsResponse = WithInfinitePagination<{
  validators: SearchValidator[]
}>
