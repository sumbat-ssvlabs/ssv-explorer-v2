"use client"

import { useState } from "react"
import { searchOperators } from "@/api/operator"
import { useQuery } from "@tanstack/react-query"
import { CommandLoading } from "cmdk"
import { xor } from "lodash-es"
import { Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useOperatorsSearchParams } from "@/hooks/search/use-operators-search-params"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { FilterButton } from "@/components/filter/filter-button"

export function IdFilter() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState<string>("")
  const { network, filters, setFilters } = useOperatorsSearchParams()
  const query = useQuery({
    queryKey: ["operators", "ids", search, network],
    queryFn: async () => {
      return searchOperators({
        network,
        search,
        ordering: "id:asc",
        page: 1,
        perPage: 10,
      })
    },
    enabled: open,
  })

  return (
    <FilterButton
      name="ID"
      activeFiltersCount={filters.id?.length ?? 0}
      onClear={() => setFilters((prev) => ({ ...prev, id: [] }))}
      popoverProps={{
        open,
        onOpenChange: setOpen,
      }}
    >
      <Command>
        <CommandInput
          placeholder="Search Ids"
          value={search}
          onValueChange={(value) => setSearch(value)}
        />
        {Boolean(filters.id?.length) && (
          <div className="flex flex-wrap gap-1 border-b p-1">
            {filters.id?.map((id) => (
              <Button
                size="sm"
                key={id}
                className="h-auto gap-0.5 rounded-full px-2 py-0.5"
                variant="secondary"
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    id: xor(prev.id, [id]),
                  }))
                }
              >
                {id} <X className="size-2" />
              </Button>
            ))}
          </div>
        )}
        <CommandList className="max-h-none overflow-y-auto">
          {query.isLoading ? (
            <CommandLoading className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin" />
            </CommandLoading>
          ) : (
            <CommandEmpty>This list is empty.</CommandEmpty>
          )}
          <CommandGroup>
            {query.data?.operators.map((operator) => (
              <CommandItem
                key={operator.id}
                value={operator.id.toString()}
                className="flex h-10 items-center space-x-2 px-2"
                onSelect={() => {
                  setFilters((prev) => ({
                    ...prev,
                    id: xor(prev.id, [operator.id]),
                  }))
                }}
              >
                <Checkbox
                  id={operator.id.toString()}
                  checked={filters.id?.includes(operator.id)}
                  className="mr-2"
                />
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  )}
                >
                  {operator.id}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </FilterButton>
  )
}
