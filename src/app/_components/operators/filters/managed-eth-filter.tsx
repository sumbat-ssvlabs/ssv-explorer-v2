"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Input } from "@/components/ui/input"
import { RangeSlider } from "@/components/ui/slider"
import { FilterButton } from "@/components/filter/filter-button"

export function ManagedEthFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.managedEth,
    operatorSearchFilters.managedEth.defaultValue
  )

  return (
    <FilterButton
      name="Managed ETH"
      isActive={hasSelectedItems}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          managedEth: operatorSearchFilters.managedEth.defaultValue,
        }))
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-4">
          <Input
            type="number"
            value={filters.managedEth?.[0]}
            step={0.01}
            onChange={(e) =>
              setFilters({
                ...filters,
                managedEth: [
                  +e.target.value,
                  filters.managedEth?.[1] ?? +e.target.value,
                ],
              })
            }
          />
          <Input
            type="number"
            step={0.01}
            value={filters.managedEth?.[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                managedEth: [filters.managedEth?.[0], +e.target.value],
              })
            }
          />
        </div>
        <RangeSlider
          value={filters.managedEth}
          onValueChange={(values) =>
            setFilters({
              ...filters,
              managedEth: values as [number, number],
            })
          }
          max={operatorSearchFilters.managedEth.defaultValue[1]}
        />
      </div>
    </FilterButton>
  )
}
