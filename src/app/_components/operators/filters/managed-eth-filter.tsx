"use client"

import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { FilterButton } from "@/components/filter/filter-button"
import { RangeFilter } from "@/components/filter/range-filter"

const defaultRange: [number, number] = [0, 25000]
export function ManagedEthFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = Boolean(filters.managedEth)

  return (
    <FilterButton
      isActive={hasSelectedItems}
      name="Managed ETH"
      popover={{
        content: {
          className: "w-[400px] max-w-full",
        },
      }}
      onClear={() =>
        setFilters({
          ...filters,
          managedEth: null,
        })
      }
    >
      <RangeFilter
        name="Managed ETH"
        searchRange={filters.managedEth}
        apply={(range) =>
          setFilters({
            ...filters,
            managedEth: range,
          })
        }
        remove={() =>
          setFilters({
            ...filters,
            managedEth: null,
          })
        }
        defaultRange={defaultRange}
      />
    </FilterButton>
  )
}
