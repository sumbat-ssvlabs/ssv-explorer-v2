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

export function ManagedEthFilter(props: ButtonProps) {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.managedEth,
    operatorSearchFilters.managedEth.defaultValue
  )
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={hasSelectedItems ? "secondary" : "outline"}
          {...props}
        >
          Managed ETH{" "}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] overflow-auto p-0">
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
      </PopoverContent>
    </Popover>
  )
}
