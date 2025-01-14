"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Input } from "@/components/ui/input"
import { RangeSlider } from "@/components/ui/slider"
import { FilterButton } from "@/components/filter/filter-button"

export function ValidatorsFilter() {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.validators,
    operatorSearchFilters.validators.defaultValue
  )

  return (
    <FilterButton
      isActive={hasSelectedItems}
      name="Validators"
      onClear={() =>
        setFilters({
          ...filters,
          validators: operatorSearchFilters.validators.defaultValue,
        })
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-4">
          <Input
            type="number"
            value={filters.validators[0]}
            step={0.01}
            onChange={(e) =>
              setFilters({
                ...filters,
                validators: [+e.target.value, filters.validators[1]],
              })
            }
          />
          <Input
            type="number"
            step={0.01}
            value={filters.validators[1]}
            onChange={(e) =>
              setFilters({
                ...filters,
                validators: [filters.validators[0], +e.target.value],
              })
            }
          />
        </div>
        <RangeSlider
          value={filters.validators}
          max={operatorSearchFilters.validators.defaultValue[1]}
          step={0.01}
          onValueChange={(values) =>
            setFilters({ ...filters, validators: values as [number, number] })
          }
        />
      </div>
    </FilterButton>
  )
}
