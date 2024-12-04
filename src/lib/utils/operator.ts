import { formatUnits } from "viem"

import { globals } from "@/config/globals"
import { ethFormatter, sortNumbers } from "@/lib/utils/number"
import type { Operator } from "@/types/api"

type GetYearlyFeeOpts = {
  format?: boolean
}

export function getYearlyFee(fee: bigint, opts: { format: true }): string
export function getYearlyFee(fee: bigint, opts?: GetYearlyFeeOpts): bigint
export function getYearlyFee(
  fee: bigint,
  opts?: GetYearlyFeeOpts
): string | bigint {
  const yearlyFee = fee * BigInt(globals.BLOCKS_PER_YEAR)
  if (opts?.format)
    return ethFormatter.format(+formatUnits(yearlyFee, 18)) + " SSV"
  return yearlyFee
}

export const getMevRelaysAmount = (mev?: string) =>
  mev ? mev.split(",").filter((item: string) => item).length : 0

export const MEV_RELAYS = {
  AESTUS: "Aestus",
  AGNOSTIC: "Agnostic Gnosis",
  BLOXROUTE_MAX_PROFIT: "bloXroute Max Profit",
  BLOXROUTE_REGULATED: "bloXroute Regulated",
  EDEN: "Eden Network",
  FLASHBOTS: "Flashbots",
  MANIFOLD: "Manifold",
  TITAN: "Titan Relay",
  ULTRA_SOUND: "Ultra Sound",
}

export const MEV_RELAYS_LOGOS = {
  [MEV_RELAYS.AESTUS]: "Aestus",
  [MEV_RELAYS.AGNOSTIC]: "agnostic",
  [MEV_RELAYS.BLOXROUTE_MAX_PROFIT]: "blox-route",
  [MEV_RELAYS.BLOXROUTE_REGULATED]: "blox-route",
  [MEV_RELAYS.EDEN]: "eden",
  [MEV_RELAYS.TITAN]: "titan",
  [MEV_RELAYS.FLASHBOTS]: "Flashbots",
  [MEV_RELAYS.MANIFOLD]: "manifold",
  [MEV_RELAYS.ULTRA_SOUND]: "ultraSound",
}

export const getMevRelaysOptions = (mevRelays: string[]) => {
  return mevRelays.includes(MEV_RELAYS.EDEN)
    ? Object.values(MEV_RELAYS).map((value) => ({ value: value, label: value }))
    : Object.values(MEV_RELAYS)
        .filter((mevRelay: string) => mevRelay !== MEV_RELAYS.EDEN)
        .map((value) => ({ value: value, label: value }))
}

export type OperatorMetadataKeys = Extract<
  keyof Operator,
  | "name"
  | "logo"
  | "description"
  | "setup_provider"
  | "mev_relays"
  | "location"
  | "eth1_node_client"
  | "eth2_node_client"
  | "website_url"
  | "twitter_url"
  | "linkedin_url"
  | "dkg_address"
>

export enum OperatorMetadataFields {
  OperatorName = "name",
  OperatorImage = "logo",
  Description = "description",
  SetupProvider = "setup_provider",
  MevRelays = "mev_relays",
  Location = "location",
  ExecutionClient = "eth1_node_client",
  ConsensusClient = "eth2_node_client",
  WebsiteUrl = "website_url",
  TwitterUrl = "twitter_url",
  LinkedinUrl = "linkedin_url",
  DkgAddress = "dkg_address",
}

export const SORTED_OPERATOR_METADATA_FIELDS: OperatorMetadataKeys[] = [
  OperatorMetadataFields.OperatorName,
  OperatorMetadataFields.Description,
  OperatorMetadataFields.Location,
  OperatorMetadataFields.SetupProvider,
  OperatorMetadataFields.ExecutionClient,
  OperatorMetadataFields.ConsensusClient,
  OperatorMetadataFields.MevRelays,
  OperatorMetadataFields.WebsiteUrl,
  OperatorMetadataFields.TwitterUrl,
  OperatorMetadataFields.LinkedinUrl,
  OperatorMetadataFields.DkgAddress,
  OperatorMetadataFields.OperatorImage,
] as const

export const sortOperators = <T extends { id: number }[]>(operators: T) => {
  return [...operators].sort((a, b) => a.id - b.id)
}
export const sumOperatorsFee = (operators: Pick<Operator, "fee">[]) => {
  return operators.reduce((acc, operator) => acc + BigInt(operator.fee), 0n)
}

export const getOperatorIds = <T extends { id: number }[]>(operators: T) => {
  return sortNumbers(operators.map((operator) => operator.id))
}



export const createDefaultOperator = (
  operator: Partial<Operator> & { id: number }
): Operator => ({
  id_str: operator.id.toString(),
  declared_fee: "0",
  previous_fee: "0",
  fee: "0",
  public_key: "",
  owner_address: "",
  address_whitelist: "",
  is_private: false,
  whitelisting_contract: "",
  location: "",
  setup_provider: "",
  eth1_node_client: "",
  eth2_node_client: "",
  mev_relays: "",
  description: "",
  website_url: "",
  twitter_url: "",
  linkedin_url: "",
  dkg_address: "",
  logo: "",
  type: "operator",
  name: `Operator ${operator.id}`,
  performance: {
    "24h": 0,
    "30d": 0,
  },
  is_valid: true,
  is_deleted: false,
  is_active: 0,
  status: "No validators",
  validators_count: 0,
  version: "v4",
  network: "holesky",
  whitelist_addresses: [],
  updated_at: 0,
  ...operator,
})


export const sumOperatorsFees = (operators: Operator[]) =>
  operators.reduce((acc, operator) => acc + BigInt(operator.fee), 0n)
