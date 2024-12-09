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

export function Performance24hFilter(props: ButtonProps) {
  const { filters, setFilters } = useOperatorsSearchParams()

  const hasSelectedItems = !isEqual(
    filters.performance_24h,
    operatorSearchFilters.performance_24h.defaultValue
  )

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant={hasSelectedItems ? "secondary" : "outline"}
          {...props}
        >
          Performance 24h
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] overflow-auto p-0">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              type="number"
              value={filters.performance_24h[0]}
              step={0.01}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  performance_24h: [
                    +e.target.value,
                    filters.performance_24h[1],
                  ],
                })
              }
            />
            <Input
              type="number"
              step={0.01}
              value={filters.performance_24h[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  performance_24h: [
                    filters.performance_24h[0],
                    +e.target.value,
                  ],
                })
              }
            />
          </div>
          <RangeSlider
            value={filters.performance_24h}
            max={operatorSearchFilters.performance_24h.defaultValue[1]}
            step={0.01}
            onValueChange={(values) =>
              setFilters({
                ...filters,
                performance_24h: values as [number, number],
              })
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
