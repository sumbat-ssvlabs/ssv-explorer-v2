"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Input } from "@/components/ui/input"
import { RangeSlider } from "@/components/ui/slider"
import { FilterButton } from "@/components/filter/filter-button"

export function Performance24hFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.performance24h,
    operatorSearchFilters.performance24h.defaultValue
  )

  return (
    <FilterButton
      name="Performance 24h"
      isActive={hasSelectedItems}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          performance24h: operatorSearchFilters.performance24h.defaultValue,
        }))
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-4">
          <Input
            type="number"
            value={filters.performance24h[0]}
            step={0.01}
            onChange={(e) =>
              setFilters({
                ...filters,
                performance24h: [+e.target.value, filters.performance24h[1]],
              })
            }
          />
          <Input
            type="number"
            step={0.01}
            value={filters.performance24h[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                performance24h: [filters.performance24h[0], +e.target.value],
              })
            }
          />
        </div>
        <RangeSlider
          value={filters.performance24h}
          max={operatorSearchFilters.performance24h.defaultValue[1]}
          step={0.01}
          onValueChange={(values) =>
            setFilters({
              ...filters,
              performance24h: values as [number, number],
            })
          }
        />
      </div>
    </FilterButton>
  )
}
