"use client"

import { useClustersSearchParams } from "@/hooks/search/use-clusters-search-params"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FilterButton } from "@/components/filter/filter-button"

export function CreateAtFilter() {
  const { filters, setFilters } = useClustersSearchParams()

  return (
    <FilterButton
      name="Created At"
      activeFiltersCount={filters.clusterId?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, clusterId: [] }))}
      popover={{
        content: {
          className: "w-fit",
        },
      }}
    >
      <div>
        <Calendar
          initialFocus
          mode="range"
          // selected={filters.createdAt || undefined}
          // onSelect={setFilters}
          numberOfMonths={2}
        />
        <div className="flex justify-end gap-2 border-t border-gray-300 p-4">
          <Button variant="ghost" className="w-32 text-sm">
            Remove
          </Button>
          <Button variant="default" className="w-32 text-sm">
            Apply
          </Button>
        </div>
      </div>
    </FilterButton>
  )
}
