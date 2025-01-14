"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Input } from "@/components/ui/input"
import { RangeSlider } from "@/components/ui/slider"
import { FilterButton } from "@/components/filter/filter-button"

export function Performance30dFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.performance_30d,
    operatorSearchFilters.performance_30d.defaultValue
  )

  return (
    <FilterButton
      name="Performance 30d"
      isActive={hasSelectedItems}
      onClear={() =>
        setFilters({
          ...filters,
          performance_30d: operatorSearchFilters.performance_30d.defaultValue,
        })
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-4">
          <Input
            type="number"
            value={filters.performance_30d[0]}
            step={0.01}
            onChange={(e) =>
              setFilters({
                ...filters,
                performance_30d: [+e.target.value, filters.performance_30d[1]],
              })
            }
          />
          <Input
            type="number"
            step={0.01}
            value={filters.performance_30d[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                performance_30d: [filters.performance_30d[0], +e.target.value],
              })
            }
          />
        </div>
        <RangeSlider
          value={filters.performance_30d}
          max={operatorSearchFilters.performance_30d.defaultValue[1]}
          step={0.01}
          onValueChange={(values) =>
            setFilters({
              ...filters,
              performance_30d: values as [number, number],
            })
          }
        />
      </div>
    </FilterButton>
  )
}
