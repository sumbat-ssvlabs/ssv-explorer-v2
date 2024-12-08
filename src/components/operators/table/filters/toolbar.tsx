import { Eth1ClientFilter } from "./eth1-client-filter"
import { Eth2ClientFilter } from "./eth2-client-filter"
import { IdFilter } from "./id-filter"
import { LocationFilter } from "./location-filter"
import { NameFilter } from "./name-filter"
import { VisibilityFilter } from "./visibility-filter"

export const Toolbar = () => {
  return (
    <div className="flex gap-2">
      <IdFilter />
      <NameFilter />
      <LocationFilter />
      <VisibilityFilter />
      <Eth1ClientFilter />
      <Eth2ClientFilter />
    </div>
  )
}
