"use client"

import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { FilterButton } from "@/components/filter/filter-button"
import { RangeFilter } from "@/components/filter/range-filter"

const defaultRange: [number, number] = [0, 20000]

export function ValidatorsFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = Boolean(filters.validatorsCount)

  return (
    <FilterButton
      isActive={hasSelectedItems}
      name="Validators"
      popover={{
        content: {
          className: "w-[400px] max-w-full",
        },
      }}
      onClear={() =>
        setFilters({
          ...filters,
          validatorsCount: null,
        })
      }
    >
      <RangeFilter
        name="Validators"
        searchRange={filters.validatorsCount}
        apply={(range) =>
          setFilters({
            ...filters,
            validatorsCount: range,
          })
        }
        remove={() =>
          setFilters({
            ...filters,
            validatorsCount: null,
          })
        }
        defaultRange={defaultRange}
      />
    </FilterButton>
  )
}
