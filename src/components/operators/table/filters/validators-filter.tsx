"use client"

import { isEqual } from "lodash-es"

import { operatorSearchFilters } from "@/lib/search-parsers/operator-search"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RangeSlider } from "@/components/ui/slider"

export function ValidatorsFilter(props: ButtonProps) {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.validators,
    operatorSearchFilters.validators.defaultValue
  )

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={hasSelectedItems ? "secondary" : "outline"}
          {...props}
        >
          Validators
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] overflow-auto p-0">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              type="number"
              value={filters.validators[0]}
              step={0.01}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  fee: [+e.target.value, filters.validators[1]],
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
                  fee: [filters.validators[0], +e.target.value],
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
      </PopoverContent>
    </Popover>
  )
}
