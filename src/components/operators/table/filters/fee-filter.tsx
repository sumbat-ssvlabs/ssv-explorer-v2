"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Input } from "@/components/ui/input"
import { RangeSlider } from "@/components/ui/slider"
import { FilterButton } from "@/components/filter/filter-button"

export function FeeFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.fee,
    operatorSearchFilters.fee.defaultValue
  )

  return (
    <FilterButton
      name="Fee"
      isActive={hasSelectedItems}
      onClear={() =>
        setFilters((prev) => ({
          ...prev,
          fee: operatorSearchFilters.fee.defaultValue,
        }))
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-4">
          <Input
            type="number"
            value={filters.fee[0]}
            step={0.01}
            onChange={(e) =>
              setFilters({
                ...filters,
                fee: [+e.target.value, filters.fee[1]],
              })
            }
          />
          <Input
            type="number"
            step={0.01}
            value={filters.fee[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                fee: [filters.fee[0], +e.target.value],
              })
            }
          />
        </div>
        <RangeSlider
          value={filters.fee}
          max={operatorSearchFilters.fee.defaultValue[1]}
          step={0.01}
          onValueChange={(values) =>
            setFilters({ ...filters, fee: values as [number, number] })
          }
        />
      </div>
    </FilterButton>
  )
}
