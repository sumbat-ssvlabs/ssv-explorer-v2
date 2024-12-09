import { Eth1ClientFilter } from "./eth1-client-filter"
import { Eth2ClientFilter } from "./eth2-client-filter"
import { FeeFilter } from "./fee-filter"
import { IdFilter } from "./id-filter"
import { LocationFilter } from "./location-filter"
import { ManagedEthFilter } from "./managed-eth-filter"
import { NameFilter } from "./name-filter"
import { OwnerAddressFilter } from "./owner-address-filter"
import { Performance24hFilter } from "./performance-24h-filter"
import { Performance30dFilter } from "./performance-30d-filter"
import { StatusFilter } from "./status-filter"
import { ValidatorsFilter } from "./validators-filter"
import { VerifiedFilter } from "./verified-filter"
import { VisibilityFilter } from "./visibility-filter"

export const Toolbar = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <IdFilter />
      <NameFilter />
      <OwnerAddressFilter />
      <LocationFilter />
      <Eth1ClientFilter />
      <Eth2ClientFilter />
      <FeeFilter />
      <ValidatorsFilter />
      <ManagedEthFilter />
      <Performance24hFilter />
      <Performance30dFilter />
      <StatusFilter />
      <VerifiedFilter />
      <VisibilityFilter />
    </div>
  )
}
